import { pubSub } from "./pubSub";

export class Sidebar {
  #currentProjectId = "1";
  #projectContainer;

  #context;

  constructor() {
    this.#projectContainer = document.querySelector(".projects");
    this.createTodoProjectDOM = this.createTodoProjectDOM.bind(this);
    this.testCurrentContainer = this.testCurrentContainer.bind(this);
    this.getCurrentProjectForDropDown = this.getCurrentProjectForDropDown.bind(this);
    this.getCurrentProjectForDropDown2 = this.getCurrentProjectForDropDown2.bind(this);
    this.testCurrentContainerUpdate = this.testCurrentContainerUpdate.bind(this);
    this.editProject = this.editProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.options = this.options.bind(this);
    this.activeProject = this.activeProject.bind(this);
    this.onClick = this.onClick.bind(this);
    pubSub.subscribe("Create Project DOM", this.createTodoProjectDOM);
    pubSub.subscribe("Should I add a todo to the current container?", this.testCurrentContainer);
    pubSub.subscribe("Need Current Project for DropDown", this.getCurrentProjectForDropDown);
    pubSub.subscribe("Need Current Project for DropDown2", this.getCurrentProjectForDropDown2);
    pubSub.subscribe("Is todo in current project?", this.testCurrentContainerUpdate);

    let inbox = document.getElementById("1");
    inbox.onclick = this.onClick.bind(this);

    this.#projectContainer.addEventListener("contextmenu", (e) => {
      e.preventDefault(); // prevent default menu

      this.#context = e.target.dataset.id;
      const menu = document.querySelector(".projectContextMenu");

      document.querySelector(".wrapper").classList.remove("appear");
    
      let x = e.clientX;
      let y = e.clientY;

      const winWidth = window.innerWidth;
      const cmWidth = menu.clientWidth;

      console.log("x " + x);
      console.log("context menu " + cmWidth);

      console.log("y " + y);
      console.log("window " + winWidth);

      const winHeight = window.innerHeight;
      const cmHeight = menu.clientWidth;

      // if x is greater than the window width, we set x
      // to allow it to still appear on the page
      x = x > winWidth - cmWidth ? winWidth - cmWidth : x;
      y = y > winHeight - cmHeight ? winHeight - cmHeight : y;

      menu.style.left = `${x}px`;
      menu.style.top = `${y}px`;

      menu.classList.remove("appear");

      menu.classList.add("appear");

      menu.querySelector(".deleteProject").removeEventListener("click", this.deleteProject);
      menu.querySelector(".deleteProject").addEventListener("click", this.deleteProject);

      menu.querySelector(".editProject").removeEventListener("click", this.editProject);
      menu.querySelector(".editProject").addEventListener("click", this.editProject);
      
    });
  }


  createTodoProjectDOM(newProject) {
  

    const project = `
<li data-id = ${newProject.getID()} id = ${newProject.getID()} class = "todoProject">
    <a href="#" data-id = ${newProject.getID()}>${newProject.getProjectColor()}
        <span data-id = ${newProject.getID()} >${newProject.getProjectName()}</span>
    </a>
     <span class="number" data-id = ${newProject.getID()}> ${newProject.getProjectTodoItems().size}</span>
     <svg  class = "options" data-action = "options" data-id = ${newProject.getID()} style="width:20px;height:20px" viewBox="0 0 20 20">
     <path data-action = "options" data-id = ${newProject.getID()} fill="rgb(146,146,146)" d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z"/>
  </svg>
     
</li>
`;

    this.#projectContainer.appendChild(document.createRange().createContextualFragment(project));

    const createdProject = document.getElementById(`${newProject.getID()}`);

    createdProject.onclick = this.onClick.bind(this);
  }

  onClick(e) {
    if (e.target.dataset.action === "options") {
      this.options(e);
    } else {
      let action = e.target.dataset.id;
      this.#currentProjectId = e.target.dataset.id;
      this.activeProject();
      pubSub.publish("Changing Projects", e.target.dataset.id);
    }
  }

  options(e) {
    this.#context = e.target.dataset.id;
    const menu = document.querySelector(".projectContextMenu");

    document.querySelector(".wrapper").classList.remove("appear");
    
    let x = e.clientX;
    let y = e.clientY;

    const winWidth = window.innerWidth;
    const cmWidth = menu.clientWidth;

    console.log("x " + x);
    console.log("context menu " + cmWidth);

    console.log("y " + y);
    console.log("window " + winWidth);

    const winHeight = window.innerHeight;
    const cmHeight = menu.clientWidth;

    // if x is greater than the window width, we set x
    // to allow it to still appear on the page
    x = x > winWidth - cmWidth ? winWidth - cmWidth : x;
    y = y > winHeight - cmHeight ? winHeight - cmHeight : y;

    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;

    menu.classList.remove("appear");

    menu.classList.add("appear");

    menu.querySelector(".deleteProject").removeEventListener("click", this.deleteProject);
    menu.querySelector(".deleteProject").addEventListener("click", this.deleteProject);

    menu.querySelector(".editProject").removeEventListener("click", this.editProject);
    menu.querySelector(".editProject").addEventListener("click", this.editProject);

  }

  deleteProject(e) {
    pubSub.publish("Delete Project", this.#context);
  }
  editProject(e) {
    pubSub.publish("Update Project", this.#context);
  }

  activeProject() {
    const projects = this.#projectContainer.querySelectorAll("li");

    document.getElementById("1").classList.remove("activeProject");
    for (let i = 0; i < projects.length; i++) {
      projects[i].classList.remove("activeProject");
    }

    document.getElementById(this.#currentProjectId).classList.add("activeProject");
  }

  testCurrentContainer(todo) {

    if (todo.getProjectLocation() === this.#currentProjectId) {
      pubSub.publish("We are in the current project container, add the associated todo", todo.getID());
    } else {
      pubSub.publish("Close Edit Menu", "");
    }
  }

  testCurrentContainerUpdate(todo) {
    if (todo.projectLocation === this.#currentProjectId) {
      pubSub.publish("Update Todo", todo);
    } else {
      pubSub.publish("Add Todo to different project", { todo: todo, currentID: this.#currentProjectId });
    }
  }

  addTodoProjectToSidebar(MapOfProjects) {
    for (let value of mapOfTodos.values()) {
      this.#projectContainer.appendChild(this.createTodoProjectDOM(value.getProjectName(), value.getProjectColor(), value.getProjectTodoItems()));
    }
  }

  getCurrentProjectForDropDown(projects) {
    pubSub.publish("Show Edit Menu", { projects: projects, currentProjectID: this.#currentProjectId });
  }

  getCurrentProjectForDropDown2(projects) {
    pubSub.publish("Show Edit Menu2", { projects: projects, currentProjectID: this.#currentProjectId });
  }
}
