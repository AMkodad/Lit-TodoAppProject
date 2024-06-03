import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AppearanceMixin } from './AppearanceMixin';

@customElement('todo-input')
export class TodoInput extends AppearanceMixin(LitElement) {
  @state()
  protected newTodo: string = '';

  static styles = [
    ...super.styles, 
     css`
    input[type="text"] {
      width: 88%;
      height: 45px;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 16px;
    }
    button {
      background-color: #5D3FD3;
      width: 11%;
      height: 44px;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      float: right;
      font-size: 35px;
    }
    button:hover {
      background-color: #7D65DB;
    }
  `]
  ;

  updateNewTodo(event: Event) {
    this.newTodo = (event.target as HTMLInputElement).value;
  }

  addTodo() {
    const trimmedTodo = this.newTodo.trim();
    if (trimmedTodo) {
      this.dispatchEvent(new CustomEvent('add-todo', { detail: trimmedTodo }));
      this.newTodo = '';
    }
  }

  render() {
    return html`
      <input 
        type="text" 
        placeholder="Add your new todo" 
        .value="${this.newTodo}" 
        @input="${this.updateNewTodo}"
        @keypress="${(e: KeyboardEvent) => e.key === 'Enter' && this.addTodo()}">
      <button @click="${this.addTodo}">+</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-input': TodoInput;
  }
}
