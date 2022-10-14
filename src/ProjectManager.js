import { pubSub } from "./pubSub";

export class ProjectManager {

#projects;

constructor(){
    this.#projects = new Map();
    //this.addProject({getID(){return "1";}, getProjectName(){return "Inbox"}})
    this.addProject = this.addProject.bind(this);
    this.getProject = this.getProject.bind(this);
    this.renderProject = this.renderProject.bind(this);
    this.addTodo = this.addTodo.bind(this);

    pubSub.subscribe("Add Project to Project Manager",this.addProject);
    pubSub.subscribe("Changing Projects", this.renderProject);
    pubSub.subscribe("Add to storage", this.addTodo);

}


addProject(project){
    this.#projects.set(project.getID(), project);
    pubSub.publish("Show Edit Menu", this.#projects);
}

addTodo(todo){
    const project = this.getProject(todo.getProjectLocation());
    project.getProjectTodoItems().set(todo.getID(), todo);
    console.log(this.#projects);
}

getTodo(todo){
    const project = this.getProject(todo.getProjectLocation());
    project.getProjectTodoItems().get(todo.getID());
}

removeProject(projectID){
    this.#projects.delete(projectID);
}


getProject(projectID){
    return this.#projects.get(projectID);
}


renderProject(projectID){
    pubSub.publish("Project needs rendering",this.#projects.get(projectID));
    return this.#projects.get(projectID);
}



}