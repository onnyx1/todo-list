import { pubSub } from "./pubSub";

export class ProjectManager {
  #projects;

  constructor() {
    this.#projects = new Map();

    //this.addProject({getID(){return "1";}, getProjectName(){return "Inbox"}})
    this.addProject = this.addProject.bind(this);
    this.getProject = this.getProject.bind(this);
    this.renderProject = this.renderProject.bind(this);
    this.updateProjectCounter = this.updateProjectCounter.bind(this);
    this.getProjectsForDropdowns = this.getProjectsForDropdowns.bind(this);
    this.getProjectsForDropdowns2 = this.getProjectsForDropdowns2.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.differentProjectTodo = this.differentProjectTodo.bind(this);
    this.updateAllProjectCounters = this.updateAllProjectCounters.bind(this);
    this.addProject({
      id: "1",
      projectName: "Inbox",
      projectColor: "Inbox",
      projectTodoItems: new Map(),
      findTodo(id) {
        return projectTodoItems.get(id);
      },

      addTodo(id, todo) {
        this.projectTodoItems.set(id, todo);
      },

      getID() {
        return this.id;
      },


      getProjectName() {
        return this.projectName;
      },

      getProjectColor() {
        return this.projectColor;
      },

      getProjectTodoItems() {
        return this.projectTodoItems;
      },
    });

    pubSub.subscribe("Add Project to Project Manager", this.addProject);
    pubSub.subscribe("Changing Projects", this.renderProject);
    pubSub.subscribe("Add to storage", this.addTodo);
    pubSub.subscribe("Generate Dropdown for Edit Menu", this.getProjectsForDropdowns);
    pubSub.subscribe("Update Project Counter", this.updateProjectCounter);
    pubSub.subscribe("Generate Dropdown for Edit Menu2", this.getProjectsForDropdowns2);
    pubSub.subscribe("Update Todo", this.updateTodo);
    pubSub.subscribe("Add Todo to different project", this.differentProjectTodo);


  }

  addProject(project) {
    this.#projects.set(project.getID(), project);
    //pubSub.publish("Show Edit Menu", this.#projects);
  }

  addTodo(todo) {
    const project = this.getProject(todo.getProjectLocation());
    project.getProjectTodoItems().set(todo.getID(), todo);
    console.log(this.#projects);
    console.log("iggy");
  }

  getTodo(todo) {
    const project = this.getProject(todo.getProjectLocation());
    project.getProjectTodoItems().get(todo.getID());
  }

  updateTodo(todo){
    const project = this.getProject(todo.projectLocation);
    const item = project.getProjectTodoItems().get(todo.id);
    item.setTaskName(todo.taskName);
    item.setDescription(todo.description);
    item.setDueDate(todo.date);
    item.setPriority(todo.priority);
    console.log(this.#projects);
  }

  differentProjectTodo(object){
    const project = this.getProject(object.currentID);
    const item = project.getProjectTodoItems().get(object.todo.id);
    item.setTaskName(object.todo.taskName);
    item.setDescription(object.todo.description);
    item.setDueDate(object.todo.date);
    item.setPriority(object.todo.priority);
    item.setProjectLocation(object.todo.projectLocation);
    this.addTodo(item);
    project.getProjectTodoItems().delete(object.todo.id);
    document.getElementById(object.todo.id).remove();
    this.updateAllProjectCounters();
    console.log(this.#projects);
}

  removeProject(projectID) {
    this.#projects.delete(projectID);
  }

  getProject(projectID) {
    return this.#projects.get(projectID);
  }

  renderProject(projectID) {
    pubSub.publish("Project needs rendering", this.#projects.get(projectID));
    return this.#projects.get(projectID);
  }

  getProjectsForDropdowns(empty) {
    pubSub.publish("Need Current Project for DropDown", this.#projects);
  }
  getProjectsForDropdowns2(empty) {
    pubSub.publish("Need Current Project for DropDown2", this.#projects);
  }

  updateProjectCounter(todo){
    const project = this.getProject(todo.getProjectLocation());
    const number = document.querySelector(`nav [data-id="${todo.getProjectLocation()}"] .number`);
    number.textContent = project.getProjectTodoItems().size;
  }

  updateAllProjectCounters(){
    for (let key of this.#projects.keys()) {
      const project = this.getProject(key);
      const number = document.querySelector(`nav [data-id="${key}"] .number`);
      console.log(number);
      number.textContent = project.getProjectTodoItems().size;
  }

}
}
