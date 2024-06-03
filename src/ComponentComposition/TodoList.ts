import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './TodoItem';

interface TodoItem {
  text: string;
  completed: boolean;
}

@customElement('todo-list')
export class TodoList extends LitElement {
  @property({ type: Array })
  todos: TodoItem[] = [];

  static styles = css`
    ul {
      list-style-type: none;
      padding: 0;
    }
  `;

  render() {
    return html`
      <ul>
        ${this.todos.map((todo, index) => html`
        <todo-item
        .todo="${todo}"
        .index="${index}"
        @toggle-completion="${(e: CustomEvent) => this.dispatchEvent(new CustomEvent('toggle-completion', { detail: e.detail }))}"
        @delete-todo="${(e: CustomEvent) => this.dispatchEvent(new CustomEvent('delete-todo', { detail: e.detail }))}"
        backgroundColor="red">
      </todo-item>
        `)}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-list': TodoList;
  }
}
