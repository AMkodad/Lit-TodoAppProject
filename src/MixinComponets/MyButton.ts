import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('my-button')
export class MyButton extends LitElement{

    @property({type: String}) 
    width = '44px';

    @property({type: String}) 
    height = '44px';

    @property({type: String}) 
    fontSize = '18px';

    static styles = css`
       button{
        background-color: var(--button-bg-color);
        color: var(--button-color);
        width: var(--button-width, 44px);
        height: var(--button-height, 44px);
        font-size: var(--button-font-size, 18px);
        border: none;
        border-radius: 4px;
        cursor: pointer;
        
       }

       button:hover {
        background-color: var(--button-hover-color);
      }

    `;

    updated(changedProperties: Map<string , unknown>) {
        super.updated(changedProperties);
        if (changedProperties.has('width')) {
          this.style.setProperty('--button-width', this.width);
        }
        if (changedProperties.has('height')) {
            this.style.setProperty('--button-height', this.height);
        }
        if (changedProperties.has('fontSize')) {
            this.style.setProperty('--button-font-size', this.fontSize);
        }
    }
    

    render(){
        return html`
          <button>
            <slot></slot>
          </button>
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap{
        'my-button': MyButton;
    }
}