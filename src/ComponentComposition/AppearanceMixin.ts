import { LitElement, css, html } from 'lit';
import { property, state } from 'lit/decorators.js';

// constructor-type.ts
type Constructor<T = {}> = new (...args: any[]) => T;

export declare class AppearanceInterface {
  color: string;
  backgroundColor: string;
  taskItemBGColor: string;
  buttonTextColor: string;
  buttonBGColor: string;
  buttonHoverColor: string;
  renderAppearance(content: unknown): unknown;
}

// Define a mixin function that adds appearance-related properties and methods
export const AppearanceMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class Appearance extends superClass implements AppearanceInterface {
    @property({ type: String }) color = 'black';
    @property({ type: String }) backgroundColor = 'white';
    @property({ type: String }) taskItemBGColor = 'lightgray';
    @property({ type: String }) buttonTextColor = 'white';
    @property({ type: String }) buttonBGColor = '#5D3FD3';
    @property({ type: String }) buttonHoverColor = '#7D65DB';

    @state() private tempColor = this.color;
    @state() private tempBackgroundColor = this.backgroundColor;
    @state() private tempTaskItemBGColor = this.taskItemBGColor;
    @state() private tempButtonTextColor = this.buttonTextColor;
    @state() private tempButtonBGColor = this.buttonBGColor;
    @state() private tempButtonHoverColor = this.buttonHoverColor;

    static styles = [
      (superClass as any).styles || css``, // Include superClass styles if any or else keep it empty
      css`
        :host {
          --appearance-color: black;
          --appearance-background-color: white;
          --appearance-task-bg-color: lightgray;
          --appearance-button-text-color: white;
          --appearance-button-bg-color: #5D3FD3;
          --appearance-button-hover-bg-color: #7D65DB;
        }

        .inputField{
            display: flex;
            padding: 15px;
            background-color: var(--appearance-background-color);
            border-radius: 5px;
        }
      `,
    ];

    updated(changedProperties: Map<string | number | symbol, unknown>) {
      super.updated(changedProperties);
      if (changedProperties.has('color')) {
        this.style.setProperty('--appearance-color', this.color);
      }
      if (changedProperties.has('backgroundColor')) {
        this.style.setProperty('--appearance-background-color', this.backgroundColor);
      }
      if (changedProperties.has('taskItemBGColor')) {
        this.style.setProperty('--appearance-task-bg-color', this.taskItemBGColor);
      }
      if (changedProperties.has('buttonTextColor')) {
        this.style.setProperty('--appearance-button-text-color', this.buttonTextColor);
      }
      if (changedProperties.has('buttonBGColor')) {
        this.style.setProperty('--appearance-button-bg-color', this.buttonBGColor);
      }
      if (changedProperties.has('buttonHoverColor')) {
        this.style.setProperty('--appearance-button-hover-bg-color', this.buttonHoverColor);
      }
    }

    handleInputChange(event: Event) {
      const target = event.target as HTMLInputElement;
      const property = target.name as keyof this;
      (this[property] as unknown as string) = target.value;
    }

    applyChanges() {
      this.color = this.tempColor;
      this.backgroundColor = this.tempBackgroundColor;
      this.taskItemBGColor = this.tempTaskItemBGColor;
      this.buttonTextColor = this.tempButtonTextColor;
      this.buttonBGColor = this.tempButtonBGColor;
      this.buttonHoverColor = this.tempButtonHoverColor;
    }

    renderAppearance(content: unknown) {
      return html`
        <div>
          <div class="inputField">
            <label>
              Text Color:
              <input type="text" name="tempColor" .value="${this.tempColor}" @input="${this.handleInputChange}">
            </label>
            <label>
              Background Color:
              <input type="text" name="tempBackgroundColor" .value="${this.tempBackgroundColor}" @input="${this.handleInputChange}">
            </label>
            <label>
              Task Item Background Color:
              <input type="text" name="tempTaskItemBGColor" .value="${this.tempTaskItemBGColor}" @input="${this.handleInputChange}">
            </label>
            <label>
              Button Text Color:
              <input type="text" name="tempButtonTextColor" .value="${this.tempButtonTextColor}" @input="${this.handleInputChange}">
            </label>
            <label>
              Button Background Color:
              <input type="text" name="tempButtonBGColor" .value="${this.tempButtonBGColor}" @input="${this.handleInputChange}">
            </label>
            <label>
              Button Hover Color:
              <input type="text" name="tempButtonHoverColor" .value="${this.tempButtonHoverColor}" @input="${this.handleInputChange}">
            </label>
            <button @click="${this.applyChanges}">Apply</button>
          </div>
          ${content}
        </div>
      `;
    }
  }

  return Appearance as Constructor<AppearanceInterface> & T;
};
