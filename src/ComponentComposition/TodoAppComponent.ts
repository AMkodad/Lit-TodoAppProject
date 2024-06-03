import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './TodoInput';
import './TodoList';

interface TodoItem {
  text: string;
  completed: boolean;
}

@customElement('todo-component')
export class TodoComponent extends LitElement {
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

  static styles = css`
    .todo-app-container {
      display: block;
      font-family: Arial, sans-serif;
      max-width: 400px;
      margin: 150px auto;
      padding: 25px;
      border: 1px solid #ccc;
      border-radius: 15px;
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
        color: white;
        background-color: #5D3FD3;
        border: none;
        border-radius: 4px;
    }

    button:hover {
        background-color: #7D65DB;
    } 
  
  `;

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
    return html`
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
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-component': TodoComponent;
  }
}

