import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TodoMixin } from './MethodMixin';
import deleteIcon from '../assets/bin.png';
import { ModeMixin } from './ModeMixin';
import './MyButton';

@customElement('todo-app-mixin')
export class TodoAppMixin extends ModeMixin(TodoMixin(LitElement)) {

  static styles = [
    ...ModeMixin(LitElement).styles || [],
    css`
    /* Your styles here */
    :host {
      display: block;
      font-family: Arial, sans-serif;
      width: 400px;
      padding: 25px;
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

    .input-feild{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    .task {
      height: 45px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      background-color: var(--task-item-bg-color);
      border-radius: 4px;
      margin-bottom: 0px;
      position: relative;
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
      transition: opacity 0.3s ease; /* Smooth transition */
      display: flex;
      justify-content: center;
      align-items: center;
    }

    img {
      max-width: 60%;
      height: auto;
    }

    .task:hover .delete-icon {
      opacity: 1; /* item visible on hover */
    }

    .bottom-line {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 20px;
    }
  `];

  render() {
    return html`
    <div class="todo-app-container">
      <h1>Todo App</h1>
      <div class="input-feild">
        <input 
        type="text" 
        placeholder="Add your new todo" 
        .value="${this.newTodo}" 
        @input="${this.updateNewTodo}"
        @keypress="${this.addTodo}">
        <my-button fontSize="35px" @click="${this.addTodo}">+</my-button>
      </div>
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
        <my-button width="100px" @click="${() => this.clearAll()}">Clear All</my-button>
      </div>
    </div>  
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-app-mixin': TodoAppMixin
  }
}
