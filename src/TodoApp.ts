import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import deleteIcon from './assets/bin.png';

interface TodoItem {
    text: string;
    completed: boolean;
  }

@customElement('todo-app')
export class TodoApp extends LitElement {
  @state()
  protected todos: TodoItem[] = [];
  @state()
  protected newTodo: string = '';
  @state()
  protected deleteIconIndex: number | null = null;
  @state() 
  protected pendingTasksCount: number = 0;

  constructor() {
    super();
    // Retrieve todos from localStorage on component initialization
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
    this.updatePendingTasksCount();
  
  }

  static styles = css`
    /* Your styles here */
    .todo-app-container {
      display: block;
      font-family: Arial, sans-serif;
      max-width: 400px;
      margin: 150px auto;
      padding: 25px;
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 15px;
    }

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

    ul {
      list-style-type: none;
      padding: 0;
    }

    .task{
      height: 45px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      background-color: #DCDCDC;
      border-radius: 4px;
      margin-bottom: 0px;
      position: relative; 
    }

    .checkbox{
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
      transition: opacity 0.3s ease; /* Smooth transition */ 
      display: flex;
      justify-content: center;
      align-items: center;
    }

    img {
      max-width: 60%;
      height: auto;
    }
    
    .task:hover .delete-icon{
      opacity: 1; /* item visible on hover */
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
    }

  `;
  updatePendingTasksCount() {
    this.pendingTasksCount = this.todos.filter(todo => !todo.completed).length;
  }

  saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  } 
  
  updateNewTodo(event: Event) {
    this.newTodo = (event.target as HTMLInputElement).value;
  }

  addTodo(event: KeyboardEvent | MouseEvent) {
    const trimmedTodo = this.newTodo.trim();
    if(trimmedTodo !== ''){
      if ((event.type === 'click' ) || (event.type === 'keypress' && (event as KeyboardEvent).key === 'Enter' )) {
        this.todos = [...this.todos, { text: trimmedTodo, completed: false }];
        this.updatePendingTasksCount();
        this.saveTodosToLocalStorage();
        this.newTodo = '';
      }
    }
  }

  toggleStrikeout(index: number) {
    const updatedTodos = [...this.todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    this.todos = updatedTodos;
    this.updatePendingTasksCount();
    this.saveTodosToLocalStorage();
  }  

  deleteTodo(index: number) {
    this.todos = this.todos.filter((_, i) => i !== index);
    this.updatePendingTasksCount();
    this.saveTodosToLocalStorage();
  }

  clearAll() {
    this.todos = [];
    this.pendingTasksCount = 0; 
    this.saveTodosToLocalStorage();
  }

  render() {
    return html`
    <div class="todo-app-container">
      <h1>Todo App</h1>
      <input 
        type="text" 
        placeholder="Add your new todo" 
        .value="${this.newTodo}" 
        @input="${this.updateNewTodo}"
        @keypress ="${this.addTodo}">
      <button @click="${this.addTodo}">+</button>
      ${this.todos.map((todo, index) => html`
      <ul>
        <li class="task">
          <input 
            type="checkbox" 
            class="checkbox" 
            @change="${() => this.toggleStrikeout(index)}" 
            .checked="${todo.completed}">
          <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.text}</span>
          <div class="delete-icon" @click="${() => this.deleteTodo(index)}">
          <img src="${deleteIcon}" alt="delete icon">
          </div>
        </li> 
      </ul>
      `)}
      <div class="bottom-line">
        <p>You have ${this.pendingTasksCount} pending tasks</p>
        <button class="clear-button" @click="${() => this.clearAll()}">Clear All</button>
      </div>
    </div>  
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'todo-app': TodoApp
  }
}