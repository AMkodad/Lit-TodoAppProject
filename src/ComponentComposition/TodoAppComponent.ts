import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './TodoInput';
import './TodoList';
import { AppearanceMixin } from './AppearanceMixin';

interface TodoItem {
  text: string;
  completed: boolean;
}

const Appearance = AppearanceMixin(LitElement);

@customElement('todo-component')
export class TodoComponent extends Appearance {
  @state()
  protected todos: TodoItem[] = [];
  @state()
  protected pendingTasksCount: number = 0;

  constructor() {
    super();
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
    this.updatePendingTasksCount();
  }

  static styles = [
    Appearance.styles || [],
    css`
    .todo-app-container {
      display: block;
      font-family: Arial, sans-serif;
      width: 400px;
      padding: 25px;
      border: 1px solid #ccc;
      border-radius: 15px;
      background-color: var(--appearance-background-color);
      color: var(--appearance-color);
    }

    .bottom-line{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 20px;
      } 

    .clear-button{
        width: 25%;
        font-size: 18px;
        color: var(--appearance-button-text-color);
        background-color: var(--appearance-button-bg-color);
        border: none;
        border-radius: 4px;
    }

    button:hover {
        background-color: var(--appearance-button-hover-bg-color);
    } 
  
  `]
  ;

  updatePendingTasksCount() {
    this.pendingTasksCount = this.todos.filter(todo => !todo.completed).length;
  }

  saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodoItem(newTodo: string) {
    this.todos = [...this.todos, { text: newTodo, completed: false }];
    this.updatePendingTasksCount();
    this.saveTodosToLocalStorage();
  }

  toggleStrikeout(index: number) {
    const updatedTodos = [...this.todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    this.todos = updatedTodos;
    this.updatePendingTasksCount();
    this.saveTodosToLocalStorage();
  }

  deleteTodoItem(index: number) {
    this.todos = this.todos.filter((_, i) => i !== index);
    this.updatePendingTasksCount();
    this.saveTodosToLocalStorage();
  }

  clearAllTodos() {
    this.todos = [];
    this.pendingTasksCount = 0;
    this.saveTodosToLocalStorage();
  }

  render() {
    return this.renderAppearance(html`
      <div class="todo-app-container">
        <h1>Todo App</h1>
        <todo-input @add-todo="${(e: CustomEvent) => this.addTodoItem(e.detail)}"></todo-input>
        <todo-list
          .todos="${this.todos}"
          @toggle-completion="${(e: CustomEvent) => this.toggleStrikeout(e.detail)}"
          @delete-todo="${(e: CustomEvent) => this.deleteTodoItem(e.detail)}">
        </todo-list>
        <div class="bottom-line">
          <p>You have ${this.pendingTasksCount} pending tasks</p>
          <button class="clear-button" @click="${this.clearAllTodos}">Clear All</button>
        </div>
      </div>
    `);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-component': TodoComponent;
  }
}

