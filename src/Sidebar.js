import { pubSub } from "./pubSub";

export class Sidebar {
  #currentProjectId = "1";
  #projectContainer;

  constructor() {
    this.#projectContainer = document.querySelector(".projects");
    this.createTodoProjectDOM = this.createTodoProjectDOM.bind(this);
    this.testCurrentContainer = this.testCurrentContainer.bind(this);
    this.getCurrentProjectForDropDown = this.getCurrentProjectForDropDown.bind(this);
    this.getCurrentProjectForDropDown2 = this.getCurrentProjectForDropDown2.bind(this);
    this.testCurrentContainerUpdate = this.testCurrentContainerUpdate.bind(this);
    this.onClick = this.onClick.bind(this);
    pubSub.subscribe("Create Project DOM", this.createTodoProjectDOM);
    pubSub.subscribe("Should I add a todo to the current container?", this.testCurrentContainer);
    pubSub.subscribe("Need Current Project for DropDown", this.getCurrentProjectForDropDown);
    pubSub.subscribe("Need Current Project for DropDown2", this.getCurrentProjectForDropDown2);
    pubSub.subscribe("Is todo in current project?", this.testCurrentContainerUpdate);

    let inbox = document.getElementById("1");
    inbox.onclick = this.onClick.bind(this);
  }

  render() {
    //spawn projects from memeory
  }

  createTodoProjectDOM(newProject) {
    console.log(newProject.getProjectName());
    console.log(typeof newProject.getProjectColor());
    console.log(newProject.getProjectTodoItems().size);
    console.log(newProject.getID());

    const project = 
    `
<li data-id = ${newProject.getID()} id = ${newProject.getID()} class = "todoProject">
    <a href="#" data-id = ${newProject.getID()}  >
         ${newProject.getProjectColor()}
        <span data-id = ${newProject.getID()} >
            ${newProject.getProjectName()} 
        </span>
    </a>
     <span class="number" data-id = ${newProject.getID()}>${newProject.getProjectTodoItems().size}</span>
</li>
`;

    this.#projectContainer.appendChild(document.createRange().createContextualFragment(project));

    const createdProject = document.getElementById(`${newProject.getID()}`);


    createdProject.onclick = this.onClick.bind(this);
 

  }

  onClick(e) {

    let action = e.target.dataset.id;
    if(action){
        this.#currentProjectId = e.target.dataset.id;
        pubSub.publish("Changing Projects", e.target.dataset.id);
    }

  }
 


    testCurrentContainer(todo){
      console.log("I was just called!");


        if(todo.getProjectLocation() === this.#currentProjectId){
            pubSub.publish("We are in the current project container, add the associated todo", todo.getID());
        } else {
            pubSub.publish("Close Edit Menu", "");
        }

}



testCurrentContainerUpdate(todo){


    if(todo.projectLocation === this.#currentProjectId){
      pubSub.publish("Update Todo", todo);

    } else {
      pubSub.publish("Add Todo to different project", {todo:todo, currentID: this.#currentProjectId} );
    }

}



  addTodoProjectToSidebar(MapOfProjects) {
    for (let value of mapOfTodos.values()) {
      this.#projectContainer.appendChild(this.createTodoProjectDOM(value.getProjectName(), value.getProjectColor(), value.getProjectTodoItems()));
    }
  }

  getCurrentProjectForDropDown(projects){
    pubSub.publish("Show Edit Menu", {projects:projects, currentProjectID:this.#currentProjectId});
  }

  getCurrentProjectForDropDown2(projects){
    pubSub.publish("Show Edit Menu2", {projects:projects, currentProjectID:this.#currentProjectId});
  }



  


}
