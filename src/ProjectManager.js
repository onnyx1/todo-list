import { pubSub } from "./pubSub";

export class ProjectManager {
  #projects;

  constructor() {

    //this.addProject({getID(){return "1";}, getProjectName(){return "Inbox"}})
    this.addProject = this.addProject.bind(this);
    this.getProject = this.getProject.bind(this);
    this.renderProject = this.renderProject.bind(this);
    this.updateProjectCounter = this.updateProjectCounter.bind(this);
    this.getProjectsForDropdowns = this.getProjectsForDropdowns.bind(this);
    this.getProjectsForDropdowns2 = this.getProjectsForDropdowns2.bind(this);
    this.moveToProject = this.moveToProject.bind(this);
    this.dele
    this.sendProjects = this.sendProjects.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.differentProjectTodo = this.differentProjectTodo.bind(this);
    this.updateAllProjectCounters = this.updateAllProjectCounters.bind(this);

    if(!(localStorage.getItem('projects'))){
      this.#projects = new Map();
    this.addProject({
      id: "1",
      projectName: "Inbox",
      projectColor:  '<svg id="inbox" data-id = "1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="Dd3PmF2g5h93YIf1bCDdiA==">   <g fill="currentColor" fill-rule="nonzero">   <path d="M10 14.5a2 2 0 104 0h5.5V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18v-3.5H10z" opacity="0.1"></path>   <path d="M8.062 4h7.876a2 2 0 011.94 1.515l2.062 8.246a2 2 0 01.06.485V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.754a2 2 0 01.06-.485l2.06-8.246A2 2 0 018.061 4zm0 1a1 1 0 00-.97.757L5.03 14.004a1 1 0 00-.03.242V18a1 1 0 001 1h12a1 1 0 001-1v-3.754a1 1 0 00-.03-.242l-2.06-8.247A1 1 0 0015.94 5H8.061zM12 17.25A2.75 2.75 0 019.295 15H7a.5.5 0 110-1h2.75a.5.5 0 01.5.5 1.75 1.75 0 003.5 0 .5.5 0 01.5-.5H17a.5.5 0 110 1h-2.295A2.75 2.75 0 0112 17.25z"></path>  </g> </svg>',
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
  } else {
    this.#projects = new Map(JSON.parse(localStorage.getItem("projects")));
  }



    pubSub.subscribe("Add Project to Project Manager", this.addProject);
    pubSub.subscribe("Changing Projects", this.renderProject);
    pubSub.subscribe("Add to storage", this.addTodo);
    pubSub.subscribe("Generate Dropdown for Edit Menu", this.getProjectsForDropdowns);
    pubSub.subscribe("Update Project Counter", this.updateProjectCounter);
    pubSub.subscribe("Generate Dropdown for Edit Menu2", this.getProjectsForDropdowns2);
    pubSub.subscribe("Update Todo", this.updateTodo);
    pubSub.subscribe("Add Todo to different project", this.differentProjectTodo);
    pubSub.subscribe("Move todo", this.moveToProject);
    pubSub.subscribe("Get Projects",this.sendProjects);
    pubSub.subscribe("Delete Todo", this.deleteTodo);
    pubSub.subscribe("Delete Project", this.deleteProject);
    pubSub.subscribe("Update Todo With Information", this.updateProject );


    // {currentProject: this.#containerTitle.id, todoID: this.#contextSelection}

  }

  updateProject(project){

    let proj = this.#projects.get(project.id);
    proj.setProjectColor(project.color);
    proj.setProjectName(project.name);


    let projDOM = document.getElementById(`${project.id}`);
    projDOM.querySelector(".dot").replaceWith(document.createRange().createContextualFragment(project.color)); 
    projDOM.querySelector("a span").textContent = project.name;
    console.log(this.#projects);
    localStorage.setItem('projects', this.#projects);
  }

  addProject(project) {
    this.#projects.set(project.getID(), project);
    //pubSub.publish("Show Edit Menu", this.#projects);
    localStorage.setItem('projects', this.#projects);

  }

  addTodo(todo) {
    const project = this.getProject(todo.getProjectLocation());
    project.getProjectTodoItems().set(todo.getID(), todo);
    console.log(this.#projects);
    console.log("iggy");
    localStorage.setItem('projects', this.#projects);

  }

  getTodo(todo) {
    const project = this.getProject(todo.getProjectLocation());
    project.getProjectTodoItems().get(todo.getID());
    localStorage.setItem('projects', this.#projects);

  }

  updateTodo(todo){
    const project = this.getProject(todo.projectLocation);
    const item = project.getProjectTodoItems().get(todo.id);
    item.setTaskName(todo.taskName);
    item.setDescription(todo.description);
    item.setDueDate(todo.date);
    item.setPriority(todo.priority);
    console.log(this.#projects);
    localStorage.setItem('projects', this.#projects);

  }

  deleteTodo(object){

    const project = this.getProject(object.currentProject);
    project.getProjectTodoItems().delete(object.todoID);
    document.getElementById(object.todoID).remove();
    this.updateAllProjectCounters();
    localStorage.setItem('projects', this.#projects);

  }

  moveToProject(object){
    // pubSub.publish("Move todo", {projectID: projectID, todoId: this.#contextSelection, currentProject: this.#containerTitle.id});
    console.log(object.currentProject);
    const project = this.getProject(object.currentProject);
    console.log("current project");
    console.log(this.#projects);
    const item = project.getProjectTodoItems().get(object.todoId);
    console.log("Item"+item);
    item.setProjectLocation(object.projectID);
    this.addTodo(item);
    project.getProjectTodoItems().delete(object.todoId);
    document.getElementById(object.todoId).remove();
    this.updateAllProjectCounters();
    console.log(this.#projects);
    localStorage.setItem('projects', this.#projects);

  }

  deleteProject(id){
    console.log(id);
    console.log(this.#projects);
   this.#projects.delete(`${id}`);
    document.getElementById(id).remove();
    document.getElementById("1").click();
    localStorage.setItem('projects', this.#projects);

  }

  sendProjects(){
    pubSub.publish("Sending projects for context menu", this.#projects);
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
    localStorage.setItem('projects', this.#projects);

}

  removeProject(projectID) {
    this.#projects.delete(projectID);
    localStorage.setItem('projects', this.#projects);

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
    console.log(this.#projects);
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
