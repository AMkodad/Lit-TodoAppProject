import { LitElement } from 'lit';
import { state } from 'lit/decorators.js';

interface TodoItem {
  text: string;
  completed: boolean;
}

type Constructor<T = {}> = new (...args: any[]) => T;

export const TodoMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class TodoMixinClass extends superClass {
    @state()
    protected todos: TodoItem[] = [];

    @state()
    protected newTodo: string = '';

    @state()
    protected pendingTasksCount: number = 0;

    constructor(...args: any[]) {
      super(...args);
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
      }
      this.updatePendingTasksCount();
    }

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
      if (trimmedTodo !== '') {
        if ((event.type === 'click') || (event.type === 'keypress' && (event as KeyboardEvent).key === 'Enter')) {
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
  }
  return TodoMixinClass;
};
