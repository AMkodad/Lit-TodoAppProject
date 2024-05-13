import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import "./assets/delete_icon.svg"

interface TodoItem {
    text: string;
    completed: boolean;
  }

@customElement('todo-app')
export class TodoApp extends LitElement {
  @property({ type: Array }) todos: TodoItem[] = [];
  @property({ type: String }) newTodo: string = '';
  @property({ type: Number }) deleteIconIndex: number | null = null;
  @property({ type: Number }) pendingTasksCount: number = 0;

  constructor() {
    super();
    this.pendingTasksCount = this.todos.filter(todo => !todo.completed).length; // Initialize with length of todos
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
      justify-content: space-between;
      align-item: stretch;
      background-color: #DCDCDC;
      border-radius: 4px;
      margin-bottom: 0px;
    }

    li {
      width: 88%;
      height: 100%;
      padding-left: 10px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      column-gap: 5px;
    }

    .checkbox{
        width: 28px;
        height: 28px;
    }

    svg{
      height: 20px;
      margin: 12px;
    }
    
    .delete-icon {
      width: 45px;
      cursor: pointer;
      background-color: #FF5577;
      border-radius: 0px 4px 4px 0px;
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

  render() {
    return html`
    <div class="todo-app-container">
      <h1>Todo App</h1>
      <input 
        type="text" 
        placeholder="Add your new todo" 
        .value="${this.newTodo}" 
        @input="${this.updateNewTodo}">
      <button @click="${this.addTodo}">+</button>
      ${this.todos.map((todo, index) => html`
      <ul class="task" @click="${() => this.showDeleteIcon(index)}" @dblclick="${() => this.hideDeleteIcon()}">
        <li>
        <input type="checkbox" class="checkbox" @change="${(event: Event) => this.toggleStrikeout(index, (event.target as HTMLInputElement).checked)}" .checked="${todo.completed}">
        <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.text}</span>
        </li>
        ${this.deleteIconIndex === index ? html`
        <span class="delete-icon" @click="${() => this.deleteTodo(index)}" >
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256" xml:space="preserve">
          <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
          <g><g><path fill="#000000" d="M173.4,255.1H82.6c-25.4,0-45.4-20-45.4-45.4V73.5c0-5.4,3.6-9.1,9.1-9.1s9.1,3.6,9.1,9.1v136.2c0,14.5,12.7,27.2,27.2,27.2h90.8c14.5,0,27.2-12.7,27.2-27.2V73.5c0-5.4,3.6-9.1,9.1-9.1c5.4,0,9.1,3.6,9.1,9.1v136.2C218.8,235.1,198.8,255.1,173.4,255.1z"/><path fill="#000000" d="M100.8,209.7c-5.4,0-9.1-3.6-9.1-9.1V91.7c0-5.4,3.6-9.1,9.1-9.1c5.4,0,9.1,3.6,9.1,9.1v108.9C109.8,206.1,106.2,209.7,100.8,209.7z"/><path fill="#000000" d="M155.2,209.7c-5.4,0-9.1-3.6-9.1-9.1V91.7c0-5.4,3.6-9.1,9.1-9.1c5.4,0,9.1,3.6,9.1,9.1v108.9C164.3,206.1,160.7,209.7,155.2,209.7z"/><path fill="#000000" d="M236.9,55.4h-72.6V28.2c0-5.4-3.6-9.1-9.1-9.1h-54.5c-5.4,0-9.1,3.6-9.1,9.1v27.2H19.1c-5.4,0-9.1-3.6-9.1-9.1c0-5.4,3.6-9.1,9.1-9.1h54.5v-9.1c0-14.5,12.7-27.2,27.2-27.2h54.5c14.5,0,27.2,12.7,27.2,27.2v9.1h54.5c5.4,0,9.1,3.6,9.1,9.1C246,51.8,242.4,55.4,236.9,55.4z"/></g></g>
        </svg>
        </span>`: ''}
      </ul>
      `)}
      <div class="bottom-line">
        <p>You have ${this.pendingTasksCount} pending tasks</p>
        <button class="clear-button" @click="${() => this.clearAll()}">Clear All</button>
      </div>
    </div>  
    `;
  }

  updateNewTodo(event: Event) {
    this.newTodo = (event.target as HTMLInputElement).value;
  }

  addTodo() {
    if (this.newTodo.trim() !== '') {
        this.todos = [...this.todos, { text: this.newTodo.trim(), completed: false }];
        this.pendingTasksCount++;
        this.newTodo = '';
      }
  }

  toggleStrikeout(index: number, checked: boolean) {
    const todo = this.todos[index];
    if (todo.completed !== checked) {
      todo.completed = checked;
      if (checked) {
        // If the task is completed, reduce the pending tasks count
        if (this.pendingTasksCount > 0) {
          this.pendingTasksCount--;
        }
      } else {
        // If the task is marked incomplete, increase the pending tasks count
        this.pendingTasksCount++;
      }
      this.requestUpdate();
    }
  }  

  showDeleteIcon(index: number) {
    this.deleteIconIndex = index;
  }

  hideDeleteIcon() {
    this.deleteIconIndex = null;
  }

  deleteTodo(index: number) {
    if (!this.todos[index].completed) {
        this.pendingTasksCount--; // Reduce pending tasks count only if the task is not completed
      }
      this.todos.splice(index, 1);
      this.requestUpdate();
  }

  clearAll() {
    this.todos = [];
    this.pendingTasksCount = 0; 
    this.requestUpdate();
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'todo-app': TodoApp
  }
}