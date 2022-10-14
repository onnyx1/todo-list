import { pubSub } from "./pubSub";
import { v4 as uuidv4 } from "uuid";

export class Container {
  #title;

  #mainContainerID;
  #todoItemContainerID;
  #containerTitleID;
  #addTaskID;
  #editMenuID;

  #mainContainer;
  #todoItemContainer;
  #containerTitle;
  #addTask;
  #editMenu;



  constructor(title) {
    this.#title = title;

    this.#mainContainerID = uuidv4();
    this.#todoItemContainerID = uuidv4();
    this.#containerTitleID = uuidv4();
    this.#addTask = uuidv4();
    this.#editMenuID = uuidv4();

    //pubSub.subscribe("Changing Projects", this.clearContainer());
    this.renderProjectContainer = this.renderProjectContainer.bind(this);
    this.clearContainer = this.clearContainer.bind(this);
    this.generateProjectDropdown = this.generateProjectDropdown.bind(this);
    this.addTodoToCurrentContainer = this.addTodoToCurrentContainer.bind(this);
    this.closeTaskMenu = this.closeTaskMenu.bind(this);
    pubSub.subscribe("Project needs rendering", this.renderProjectContainer);
    pubSub.subscribe("Show Edit Menu", this.generateProjectDropdown);
    
    
    
    pubSub.subscribe("We are in the current project container, add the associated todo", this.addTodoToCurrentContainer);
    pubSub.subscribe("Close Edit Menu", this.closeTaskMenu);



  }

  createContainer() {
    let container = `<div class = "main-container" id = ${this.#mainContainerID}>
    <div class="todo-items-container" id = ${this.#todoItemContainerID}>
       <span class = "container-title" id = ${this.#containerTitleID}>${this.#title}</span>
    </div>
    <button class = "add-task-button" data-action = "showTaskMenu" id = ${this.#addTaskID}>
       <div class="add-task-row" data-action = "showTaskMenu">
          <div class="add-icon" data-action = "showTaskMenu"></div>
          <div class = "add-task" data-action = "showTaskMenu">Add task</div>
       </div>
    </button>
</div>
 `;

    return document.createRange().createContextualFragment(container);
  }

  createEditMenu() {
    const menu = `<div class="edit-todo-menu-container" id = ${this.#editMenuID}>
  <div class="edit-todo-menu">
     <div><input class = "task-name" type="text" placeholder="Task Name"></div>
     <div>
        <textarea name="" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' id="" cols="30" rows="2" placeholder="Description"></textarea>
     </div>
     <div class="edit-todo-menu-actions">
        <div class = "edit-todo-menu-date">
           <input type="date" name="" id="date" placeholder="Due Date">
        </div>
        <!-- DropDown -->
        <div class="dropdown editMenu">
           <div class="select">
              <span class="selected">Inbox</span>
              <div class="caret"></div>
           </div>
           <ul class="menu">
              <li class = "active">Inbox</li>
              <li>Personal</li>
              <li>Work</li>
           </ul>
        </div>
        <!-- DropDown End -->
        <div class="dropdown flag">
           <div class="select">
              <span class="selected">
                 <svg xmlns:xlink="http://www.w3.org/1999/xlink" data-flagColor = "gray" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Gw1i-E3" data-icon-name="priority-icon" data-priority="4">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5a.5.5 0 01.223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.822 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0120 4.5V13a.5.5 0 01-.223.416c-1.09.727-2.518 1.084-4.277 1.084-1.113 0-1.92-.197-3.658-.776C10.204 13.178 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777V19.5a.5.5 0 01-1 0V5zm4.5 7c-1.367 0-2.535.216-3.5.654V5.277c.886-.515 2.05-.777 3.5-.777.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.367 0 2.535-.216 3.5-.654v7.377c-.886.515-2.05.777-3.5.777-.97 0-1.704-.178-3.342-.724C10.421 12.196 9.613 12 8.5 12z" fill="#666666"></path>
                 </svg>
                 <span class = "flag-text" style = "display: none;">Priority 4</span>
              </span>
              <div class="caret" style = "display: none;"></div>
           </div>
           <ul class="menu">
              <li>
                 <div class="flag-row">
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" data-flagColor = "red" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Gw1i-E3" data-icon-name="priority-icon" data-priority="1">
                       <path fill-rule="evenodd" clip-rule="evenodd" d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z" fill="#D1453B"></path>
                    </svg>
                    <span class = "flag-text">Priority 1</span>
                 </div>
              </li>
              <li>
                 <div class="flag-row">
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" data-flagColor = "yellow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Gw1i-E3" data-icon-name="priority-icon" data-priority="2">
                       <path fill-rule="evenodd" clip-rule="evenodd" d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z" fill="#EB8909"></path>
                    </svg>
                    <span class = "flag-text">Priority 2</span>
                 </div>
              </li>
              <li>
                 <div class="flag-row">
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" data-flagColor = "blue" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Gw1i-E3" data-icon-name="priority-icon" data-priority="3">
                       <path fill-rule="evenodd" clip-rule="evenodd" d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z" fill="#246FE0"></path>
                    </svg>
                    <span class = "flag-text">Priority 3</span>
                 </div>
              </li>
              <li class = "active">
                 <div class="flag-row">
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" data-flagColor = "gray" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Gw1i-E3" data-icon-name="priority-icon" data-priority="4">
                       <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5a.5.5 0 01.223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.822 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0120 4.5V13a.5.5 0 01-.223.416c-1.09.727-2.518 1.084-4.277 1.084-1.113 0-1.92-.197-3.658-.776C10.204 13.178 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777V19.5a.5.5 0 01-1 0V5zm4.5 7c-1.367 0-2.535.216-3.5.654V5.277c.886-.515 2.05-.777 3.5-.777.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.367 0 2.535-.216 3.5-.654v7.377c-.886.515-2.05.777-3.5.777-.97 0-1.704-.178-3.342-.724C10.421 12.196 9.613 12 8.5 12z" fill="#666666"></path>
                    </svg>
                    <span class = "flag-text">Priority 4</span>
                 </div>
              </li>
           </ul>
        </div>
     </div>
  </div>
  <div class="edit-todo-menu-footer">
     <button class = "cancel-button" data-action = "closeTaskMenu">Cancel</button>
     <button class = "edit-todo-menu-add-task" data-action = "addTodo">Add Task</button>
  </div>
</div>`;

    return document.createRange().createContextualFragment(menu);
  }

  createTodoItemDOM(taskName, description, dueDate, priority, id) {
    const todoItem = `<div class="todo-row id = ${id}">
    <label class = "checkbox__${priority}" for="myCheckboxId__${priority}${id}">
       <input class = "checkbox__input__${priority}" type="checkbox" name="myCheckboxName__${priority}" id="myCheckboxId__${priority}${id}">
       <div class="checkbox__box__${priority}"></div>
    </label>
    <div class="todo-column">
       <div class = "todo-title">${taskName}</div>
       <div class = "todo-description">${description}</div>
       <div class = "todo-date">${dueDate}</div>
    </div>
    <div class="todo-actions">
       <svg data-action = "edit" id = ${id} xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
             <path fill="rgb(136,136,136)" d="M9.5 19h10a.5.5 0 110 1h-10a.5.5 0 110-1z"/>
             <path stroke="rgb(126,126,126)" d="M4.42 16.03a1.5 1.5 0 00-.43.9l-.22 2.02a.5.5 0 00.55.55l2.02-.21a1.5 1.5 0 00.9-.44L18.7 7.4a1.5 1.5 0 000-2.12l-.7-.7a1.5 1.5 0 00-2.13 0L4.42 16.02z"/>
          </g>
       </svg>
       <svg style="width:20px;height:20px" viewBox="0 0 20 20">
          <path fill="rgb(146,146,146)" d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z"/>
       </svg>
    </div>
 </div>`;
    return this.#todoItemContainer.appendChild(document.createRange().createContextualFragment(todoItem));
  }

  generateProjectDropdown(projects) {

    let element = "";
    for (let key of projects.keys()) {
      element += `<li id = ${key}>${projects.get(key).getProjectName()}</li>`;
    }

    const dropdown = this.#editMenu.querySelector(".editMenu .menu");
    dropdown.innerHTML = element;

    const hamburger = document.querySelector("header button");

    const dropdowns = document.querySelectorAll(".dropdown");
    // Loop through dropdowns
    dropdowns.forEach((dropdown) => {
      // Get inner elements

      const select = dropdown.querySelector(".select");
      const selected = dropdown.querySelector(".selected");
      const caret = dropdown.querySelector(".caret");
      const menu = dropdown.querySelector(".menu");
      const options = dropdown.querySelectorAll(".menu li");

      // Add click event for each li

      options.forEach((option) => {
        option.addEventListener("click", () => {
          if (dropdown.classList.contains("flag")) {
            const row = option.querySelector(".flag-row");
            const text = row.querySelector(".flag-text");
            text.style.display = "none";

            selected.innerHTML = row.innerHTML;
            text.style.display = "block";
          } else {
            selected.innerHTML = option.innerHTML;
            selected.id = option.id;
          }
          caret.classList.remove("caret-rotate");
          menu.classList.remove("menu-open");

          // Remove active class from all li elements

          options.forEach((option) => {
            option.classList.remove("active");
          });

          option.classList.add("active");
        });
      });
    });

  }

  render(location) {
    location.appendChild(this.createContainer());
    location.appendChild(this.createEditMenu());

    this.#mainContainer = document.getElementById(`${this.#mainContainerID}`);
    this.#mainContainer.onclick = this.onClick.bind(this);

    this.#todoItemContainer = document.getElementById(`${this.#todoItemContainerID}`);
    this.#containerTitle = document.getElementById(`${this.#containerTitleID}`);

    this.#addTask = document.getElementById(`${this.#addTaskID}`);
    this.#editMenu = document.getElementById(`${this.#editMenuID}`);
  }

  onClick(e) {
    let action = e.target.dataset.action;
    if (action) {
      this[action](e);
    }
  }

  showTaskMenu() {
    this.#editMenu.style.display = "block";
    this.#mainContainer.replaceChild(this.#editMenu, this.#addTask);
  }

  closeTaskMenu() {
    this.#editMenu.style.display = "none";


    const taskName = document.querySelector(".task-name");
    const description = document.querySelector("textarea");
    const date = document.querySelector("#date");
    const projects = document.querySelectorAll(".dropdown.editMenu");
    let flagText = document.querySelector(".flag .selected .flag-text");

    taskName.value = "";
    description.value = "";
    date.value = "";
    flagText.value = "Priority 4"; 
    this.#mainContainer.replaceChild(this.#addTask, this.#editMenu);

  }

  addTodo() {

    const taskName = document.querySelector(".task-name");
    const description = document.querySelector("textarea");
    const date = document.querySelector("#date");
    const projects = document.querySelector(".dropdown.editMenu .selected");
    const flagText = document.querySelector(".flag .selected .flag-text");


    let priority;
    if (flagText.textContent === "Priority 1") {
       priority = "red";
    }
    if (flagText.textContent === "Priority 2") {
      priority = "yellow";
    }
 
    if (flagText.textContent === "Priority 3") {
      priority = "blue";
    }
 
    if (flagText.textContent === "Priority 4") {
      priority = "gray";
    }

    pubSub.publish("Create todo and add to storage",
     {taskName: taskName.value, description: description.value, date:date.value, projectLocation:projects.id, priority: priority });


  }


  addTodoToCurrentContainer(id){

   const taskName = document.querySelector(".task-name");
   const description = document.querySelector("textarea");
   const date = document.querySelector("#date");
   const projects = document.querySelectorAll(".dropdown.editMenu .selected");
   let flagText = document.querySelector(".flag .selected .flag-text");

   if (flagText.textContent === "Priority 1") {
     this.createTodoItemDOM(taskName.value, description.value, date.value, "red", id);
   }
   if (flagText.textContent === "Priority 2") {
     this.createTodoItemDOM(taskName.value, description.value, date.value, "yellow", id);
   }

   if (flagText.textContent === "Priority 3") {
     this.createTodoItemDOM(taskName.value, description.value, date.value, "blue", id);
   }

   if (flagText.textContent === "Priority 4") {
     this.createTodoItemDOM(taskName.value, description.value, date.value, "gray", id);
   }

   this.closeTaskMenu();
  }

  setTitle(title) {
    this.#containerTitle.textContent = title;
  }

  clearContainer() {
    this.#todoItemContainer.innerHTML = "";
  }

  renderProjectContainer(project) {
    this.clearContainer();
    this.setTitle(project.getProjectName());

    this.generateTodos(project.getProjectTodoItems());

    this.#todoItemContainer.prepend(this.#containerTitle);
  }

  generateTodos(mapOfTodos) {
    for (let value of mapOfTodos.values()) {
      this.#todoItemContainer.appendChild(this.createTodoItemDOM(value.getTaskName(), value.getDescription(), value.getDueDate(), value.getPriority(), value.getID()));
    }
  }
}
