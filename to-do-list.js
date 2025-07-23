// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.

class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (todo instanceof Todo) {
      this.todos.push(todo);
    } else {
      throw new TypeError("Not a to-do object");
    }
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0]
  }

  last() {
    return this.todos[this.size() - 1];
  }


  _validateIndex(idx) {
    if (!(idx in this.todos)) {
      throw new ReferenceError(`Invalid Index: ${idx}`);
    }
  }

  itemAt(idx) {
    this._validateIndex(idx)
    return this.todos[idx];
  }

  markDoneAt(idx) {
    this.itemAt(idx).markDone();
  }

  markUndoneAt(idx) {
    this.itemAt(idx).markUndone();
  }

  isDone() {
    return this.todos.every(todo => {
      return todo.isDone();
    })
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }
  
  removeAt(idx) {
    this._validateIndex(idx);
    return this.todos.splice(idx, 1);
  }

  toString() {
    let title = `---- Today's Todos ----`;
    let list = this.todos.map(todo => todo.toString()).join(`\n`);
    return `${title}\n${list}`;
  }

  forEach(cb) {
    this.todos.forEach(todo => cb(todo));
  }

  filter(cb) {
    // return this.todos.filter(todo => cb(todo)); => suboptimal: introduces additional dependency
    let filteredTodos =  new TodoList(this.title);
    this.forEach(todo => {
      if (cb(todo)) {
        filteredTodos.add(todo);
      }
    })
    return filteredTodos;
  }

  }

let list = new TodoList("Today's Todos");


let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);

list.markDoneAt(1);
list.markDoneAt(3);

console.log(list.toString());
let doneTodos = list.filter(todo => todo.isDone());
console.log(doneTodos);
let filterdFirst = list.filter(todo => todo.isDone()).first();
