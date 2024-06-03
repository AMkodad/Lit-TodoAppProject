import { LitElement, css} from 'lit';
import { property  } from 'lit/decorators.js';

// constructor-type.ts
type Constructor<T = {}> = new (...args: any[]) => T;

// Define a mixin function that adds appearance-related properties and methods
export const AppearanceMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class Appearance extends superClass {
    @property({ type: String }) color = 'black';
    @property({ type: String }) backgroundColor = 'black';

    static styles = [
      (superClass as any).styles || css``, // Include superClass styles if any or else keep it empty
      // defining custom property => --appearance-color: black
      // Here --appearance-color is having the default value black
      css`
        :host {
          color: var(--appearance-color, black); 
          background-color: var(--appearance-background-color, black);
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
    }
  }

  return Appearance;
};
