import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import deleteIcon from '../assets/delete_icon.svg';
import { AppearanceMixin } from './AppearanceMixin';

interface TodoItem {
  text: string;
  completed: boolean;
}

@customElement('todo-item')
export class TodoItemElement extends AppearanceMixin(LitElement) {
  @property({ type: Object })
  todo!: TodoItem;

  @property({ type: Number })
  index!: number;

  static styles = [
    ...super.styles,
    css`
    .task {
      height: 45px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      border-radius: 4px;
      margin-bottom: 10px;
      position: relative;
      color: var(--appearance-color, black); 
      background-color: var(--appearance-background-color, red);
    }

    .checkbox {
      width: 28px;
      height: 28px;
    }

    .delete-icon {
      width: 45px;
      height: 100%;
      cursor: pointer;
      background-color: #FF5577;
      border-radius: 0px 4px 4px 0px;
      position: absolute;
      right: 0;
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    img {
      max-width: 60%;
      height: auto;
    }

    .task:hover .delete-icon {
      opacity: 1;
    }

    .completed {
        text-decoration: line-through;
      }
  `
    ]
  ;

  toggleCompletion() {
    this.dispatchEvent(new CustomEvent('toggle-completion', { detail: this.index }));
    this.requestUpdate();
  }

  deleteTodo() {
    this.dispatchEvent(new CustomEvent('delete-todo', { detail: this.index }));
  }

  render() {
    return html`
      <li class="task">
        <input 
          type="checkbox" 
          class="checkbox" 
          @change="${this.toggleCompletion}" 
          .checked="${this.todo.completed}">
        <span class="${this.todo.completed ? 'completed' : ''}">${this.todo.text}</span>
        <div class="delete-icon" @click="${this.deleteTodo}">
          <img src="${deleteIcon}" alt="delete icon">
        </div>
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-item': TodoItemElement;
  }
}
