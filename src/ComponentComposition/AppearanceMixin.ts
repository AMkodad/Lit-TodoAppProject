import { LitElement, css, html} from 'lit';
import { property} from 'lit/decorators.js';
// import { styleMap } from 'lit/directives/style-map.js';

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

    renderAppearance(content: unknown) {
        return html`
          <div >
            ${content}
          </div>`;
        }
      
  }

  return Appearance ;
};
