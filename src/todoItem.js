import { v4 as uuidv4 } from "uuid";
import { pubSub } from "./pubSub";

export class todoItem {
  #taskName;
  #description;
  #dueDate;
  #projectLocation;
  #priority;
  #id;

  constructor(taskName, description, dueDate, projectLocation, priority) {
    this.#taskName = taskName;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#projectLocation = projectLocation;
    this.#priority = priority;
    this.#id = uuidv4();
  }

  getTaskName() {
    return this.#taskName;
  }
  setTaskName(value) {
    this.#taskName = value;
  }

  getDescription() {
    return this.#description;
  }
  setDescription(value) {
    this.#description = value;
  }

  getDueDate() {
    return this.#dueDate;
  }
  setDueDate(value) {
    this.#dueDate = value;
  }

  getProjectLocation() {
    return this.#projectLocation;
  }
  setProjectLocation(value) {
    this.#projectLocation = value;
  }

  getPriority() {
    return this.#priority;
  }
  setPriority(value) {
    this.#priority = value;
  }

  getID() {
    return this.#id;
  }
}

function createTodo(information) {
  const newTodo = new todoItem(information.taskName, information.description, information.date, information.projectLocation, information.priority);
  pubSub.publish("Add to storage", newTodo);
  pubSub.publish("Should I add a todo to the current container?", newTodo);
  pubSub.publish("Update Project Counter", newTodo);
}

function duplicate(todo) {
  const newTodo = new todoItem(todo.taskName, todo.description, todo.date, todo.projectLocation, todo.priority);
  pubSub.publish("Add to storage", newTodo);
  pubSub.publish("Update Project Counter", newTodo);
  pubSub.publish("Add duplicated todo", newTodo);
}

pubSub.subscribe("Create todo and add to storage", createTodo);

pubSub.subscribe("duplicate todo", duplicate);
