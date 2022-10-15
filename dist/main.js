(()=>{"use strict";const e={events:{},subscribe:function(e,t){console.log(`PUBSUB: someone just subscribed to the event "${e}"`),this.events[e]=this.events[e]||[],this.events[e].push(t)},unsubscribe:function(e,t){console.log(`PUBSUB: someone just UNsubscribed from ${e}`),this.events[e]&&(this.events[e]=this.events[e].filter((e=>e!==t)))},publish:function(e,t){console.log(`PUBSUB: someone just published the event "${e}" with contents "${t}"`),this.events[e]&&this.events[e].forEach((e=>{e(t)}))}},t={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let o;const n=new Uint8Array(16);function i(){if(!o&&(o="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!o))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return o(n)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));const s=function(e,o,n){if(t.randomUUID&&!o&&!e)return t.randomUUID();const s=(e=e||{}).random||(e.rng||i)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,o){n=n||0;for(let e=0;e<16;++e)o[n+e]=s[e];return o}return function(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}(s)};class a{#e;#t;#o;#n;constructor(e,t){this.#e=s(),this.#t=e,this.#o=t,this.#n=new Map}findTodo(e){return this.#n.get(e)}addTodo(e,t){this.#n.set(e,t)}getID(){return this.#e}getProjectName(){return this.#t}getProjectColor(){return this.#o}getProjectTodoItems(){return this.#n}}e.subscribe("Create Project",(function(t){const o=t.projectName,n=t.projectColor,i=new a(o,n);e.publish("Add Project to Project Manager",i),e.publish("Create Project DOM",i)}));class d{#i;#r;#s;#a;#d;#e;constructor(e,t,o,n,i){this.#i=e,this.#r=t,this.#s=o,this.#a=n,this.#d=i,this.#e=s()}getTaskName(){return this.#i}setTaskName(e){this.#i=e}getDescription(){return this.#r}setDescription(e){this.#r=e}getDueDate(){return this.#s}setDueDate(e){this.#s=e}getProjectLocation(){return this.#a}setProjectLocation(e){this.#a=e}getPriority(){return this.#d}setPriority(e){this.#d=e}getID(){return this.#e}}e.subscribe("Create todo and add to storage",(function(t){const o=new d(t.taskName,t.description,t.date,t.projectLocation,t.priority);console.log("New todo created!!!!!"),console.log(o.getDueDate()),e.publish("Add to storage",o),e.publish("Should I add a todo to the current container?",o),console.log("bitch")}));const c=document.querySelector("header button"),l=document.querySelector("nav"),u=document.querySelector("main"),h=document.querySelector(".project-tab"),p=document.querySelector("#downArrow"),v=(document.querySelector(".projects"),document.querySelector("#a")),m=(document.querySelector(".todo-row"),document.querySelector(".checkbox__input__gray"),document.querySelector(".checkbox"),document.querySelector(".add-task-button"),document.querySelector(".edit-todo-menu-container")),g=(document.querySelector(".main-container"),document.querySelector(".task-name"),document.querySelector("#pencil"),document.querySelector("#z"),document.querySelector(".add-new-task")),y=document.querySelector(".overlay");document.querySelector("#add"),document.querySelector(".project-modal"),document.querySelector(".edit-todo-menu-add-task"),document.querySelector("textarea"),document.querySelector("#date"),new class{#c;constructor(){this.#c=new Map,this.addProject=this.addProject.bind(this),this.getProject=this.getProject.bind(this),this.renderProject=this.renderProject.bind(this),this.getProjectsForDropdowns=this.getProjectsForDropdowns.bind(this),this.addTodo=this.addTodo.bind(this),e.subscribe("Add Project to Project Manager",this.addProject),e.subscribe("Changing Projects",this.renderProject),e.subscribe("Add to storage",this.addTodo),e.subscribe("Generate Dropdown for Edit Menu",this.getProjectsForDropdowns)}addProject(e){this.#c.set(e.getID(),e)}addTodo(e){this.getProject(e.getProjectLocation()).getProjectTodoItems().set(e.getID(),e),console.log(this.#c),console.log("iggy")}getTodo(e){this.getProject(e.getProjectLocation()).getProjectTodoItems().get(e.getID())}removeProject(e){this.#c.delete(e)}getProject(e){return this.#c.get(e)}renderProject(t){return e.publish("Project needs rendering",this.#c.get(t)),this.#c.get(t)}getProjectsForDropdowns(t){e.publish("Need Current Project for DropDown",this.#c)}};let C=new class{#l;#u;#h;#p;#v;#m;#g;#y;#C;#j;#w;constructor(t){this.#l=t,this.#u=s(),this.#h=s(),this.#p=s(),this.#j=s(),this.#m=s(),this.renderProjectContainer=this.renderProjectContainer.bind(this),this.clearContainer=this.clearContainer.bind(this),this.generateProjectDropdown=this.generateProjectDropdown.bind(this),this.addTodoToCurrentContainer=this.addTodoToCurrentContainer.bind(this),this.closeTaskMenu=this.closeTaskMenu.bind(this),e.subscribe("Project needs rendering",this.renderProjectContainer),e.subscribe("Show Edit Menu",this.generateProjectDropdown),e.subscribe("We are in the current project container, add the associated todo",this.addTodoToCurrentContainer),e.subscribe("Close Edit Menu",this.closeTaskMenu)}createContainer(){let e=`<div class = "main-container" id = ${this.#u}>\n    <div class="todo-items-container" id = ${this.#h}>\n       <span class = "container-title" id = ${this.#p}>${this.#l}</span>\n    </div>\n    <button class = "add-task-button" data-action = "showTaskMenu" id = ${this.#v}>\n       <div class="add-task-row" data-action = "showTaskMenu">\n          <div class="add-icon" data-action = "showTaskMenu"></div>\n          <div class = "add-task" data-action = "showTaskMenu">Add task</div>\n       </div>\n    </button>\n</div>\n `;return document.createRange().createContextualFragment(e)}createEditMenu(){const e=`<div class="edit-todo-menu-container" id = ${this.#m}>\n  <div class="edit-todo-menu">\n     <div><input class = "task-name" type="text" placeholder="Task Name"></div>\n     <div>\n        <textarea name="" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' id="" cols="30" rows="2" placeholder="Description"></textarea>\n     </div>\n     <div class="edit-todo-menu-actions">\n        <div class = "edit-todo-menu-date">\n           <input type="date" name="" id="date" placeholder="Due Date">\n        </div>\n        \x3c!-- DropDown --\x3e\n        <div class="dropdown editMenu">\n           <div class="select">\n              <span class="selected">Inbox</span>\n              <div class="caret"></div>\n           </div>\n           <ul class="menu">\n              <li class = "active", id = "1">Inbox</li>\n           </ul>\n        </div>\n        \x3c!-- DropDown End --\x3e\n        <div class="dropdown flag">\n           <div class="select">\n              <span class="selected">\n                 <svg xmlns:xlink="http://www.w3.org/1999/xlink" data-flagColor = "gray" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Gw1i-E3" data-icon-name="priority-icon" data-priority="4">\n                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5a.5.5 0 01.223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.822 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0120 4.5V13a.5.5 0 01-.223.416c-1.09.727-2.518 1.084-4.277 1.084-1.113 0-1.92-.197-3.658-.776C10.204 13.178 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777V19.5a.5.5 0 01-1 0V5zm4.5 7c-1.367 0-2.535.216-3.5.654V5.277c.886-.515 2.05-.777 3.5-.777.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.367 0 2.535-.216 3.5-.654v7.377c-.886.515-2.05.777-3.5.777-.97 0-1.704-.178-3.342-.724C10.421 12.196 9.613 12 8.5 12z" fill="#666666"></path>\n                 </svg>\n                 <span class = "flag-text" style = "display: none;">Priority 4</span>\n              </span>\n              <div class="caret" style = "display: none;"></div>\n           </div>\n           <ul class="menu">\n              <li>\n                 <div class="flag-row">\n                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" data-flagColor = "red" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Gw1i-E3" data-icon-name="priority-icon" data-priority="1">\n                       <path fill-rule="evenodd" clip-rule="evenodd" d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z" fill="#D1453B"></path>\n                    </svg>\n                    <span class = "flag-text">Priority 1</span>\n                 </div>\n              </li>\n              <li>\n                 <div class="flag-row">\n                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" data-flagColor = "yellow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Gw1i-E3" data-icon-name="priority-icon" data-priority="2">\n                       <path fill-rule="evenodd" clip-rule="evenodd" d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z" fill="#EB8909"></path>\n                    </svg>\n                    <span class = "flag-text">Priority 2</span>\n                 </div>\n              </li>\n              <li>\n                 <div class="flag-row">\n                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" data-flagColor = "blue" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Gw1i-E3" data-icon-name="priority-icon" data-priority="3">\n                       <path fill-rule="evenodd" clip-rule="evenodd" d="M4.223 4.584A.5.5 0 004 5v14.5a.5.5 0 001 0v-5.723C5.886 13.262 7.05 13 8.5 13c.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.759 0 3.187-.357 4.277-1.084A.5.5 0 0020 13V4.5a.5.5 0 00-.777-.416C18.313 4.69 17.075 5 15.5 5c-.97 0-1.704-.178-3.342-.724C10.421 3.696 9.613 3.5 8.5 3.5c-1.758 0-3.187.357-4.277 1.084z" fill="#246FE0"></path>\n                    </svg>\n                    <span class = "flag-text">Priority 3</span>\n                 </div>\n              </li>\n              <li class = "active" id = "priority4">\n                 <div class="flag-row">\n                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" data-flagColor = "gray" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Gw1i-E3" data-icon-name="priority-icon" data-priority="4">\n                       <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5a.5.5 0 01.223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.822 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0120 4.5V13a.5.5 0 01-.223.416c-1.09.727-2.518 1.084-4.277 1.084-1.113 0-1.92-.197-3.658-.776C10.204 13.178 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777V19.5a.5.5 0 01-1 0V5zm4.5 7c-1.367 0-2.535.216-3.5.654V5.277c.886-.515 2.05-.777 3.5-.777.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.367 0 2.535-.216 3.5-.654v7.377c-.886.515-2.05.777-3.5.777-.97 0-1.704-.178-3.342-.724C10.421 12.196 9.613 12 8.5 12z" fill="#666666"></path>\n                    </svg>\n                    <span class = "flag-text">Priority 4</span>\n                 </div>\n              </li>\n           </ul>\n        </div>\n     </div>\n  </div>\n  <div class="edit-todo-menu-footer">\n     <button class = "cancel-button" data-action = "closeTaskMenu">Cancel</button>\n     <button class = "edit-todo-menu-add-task" data-action = "addTodo">Add Task</button>\n  </div>\n</div>`;return document.createRange().createContextualFragment(e)}createTodoItemDOM(e,t,o,n,i){const r=`<div class="todo-row id = ${i}">\n    <label class = "checkbox__${n}" for="myCheckboxId__${n}${i}">\n       <input class = "checkbox__input__${n}" type="checkbox" name="myCheckboxName__${n}" id="myCheckboxId__${n}${i}">\n       <div class="checkbox__box__${n}"></div>\n    </label>\n    <div class="todo-column">\n       <div class = "todo-title">${e}</div>\n       <div class = "todo-description">${t}</div>\n       <div class = "todo-date">${o}</div>\n    </div>\n    <div class="todo-actions">\n       <svg data-action = "edit" id = ${i} xmlns="http://www.w3.org/2000/svg">\n          <g fill="none" fill-rule="evenodd">\n             <path fill="rgb(136,136,136)" d="M9.5 19h10a.5.5 0 110 1h-10a.5.5 0 110-1z"/>\n             <path stroke="rgb(126,126,126)" d="M4.42 16.03a1.5 1.5 0 00-.43.9l-.22 2.02a.5.5 0 00.55.55l2.02-.21a1.5 1.5 0 00.9-.44L18.7 7.4a1.5 1.5 0 000-2.12l-.7-.7a1.5 1.5 0 00-2.13 0L4.42 16.02z"/>\n          </g>\n       </svg>\n       <svg style="width:20px;height:20px" viewBox="0 0 20 20">\n          <path fill="rgb(146,146,146)" d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z"/>\n       </svg>\n    </div>\n </div>`;return this.#y.appendChild(document.createRange().createContextualFragment(r))}generateProjectDropdown(e){let t=e.projects,o=e.currentProjectID;const n=this.#w.querySelector(".selected");n.textContent=`${t.get(o).getProjectName()}`,n.id=o;let i="";for(let e of t.keys())i+=e===o?`<li class = "active" id = ${e}>${t.get(e).getProjectName()}</li>`:`<li id = ${e}>${t.get(e).getProjectName()}</li>`;this.#w.querySelector(".editMenu .menu").innerHTML=i,this.#w.querySelector(".flag .selected").innerHTML='<svg xmlns:xlink="http://www.w3.org/1999/xlink" data-flagColor = "gray" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Gw1i-E3" data-icon-name="priority-icon" data-priority="4">\n                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5a.5.5 0 01.223-.416C5.313 3.857 6.742 3.5 8.5 3.5c1.113 0 1.92.196 3.658.776C13.796 4.822 14.53 5 15.5 5c1.575 0 2.813-.31 3.723-.916A.5.5 0 0120 4.5V13a.5.5 0 01-.223.416c-1.09.727-2.518 1.084-4.277 1.084-1.113 0-1.92-.197-3.658-.776C10.204 13.178 9.47 13 8.5 13c-1.45 0-2.614.262-3.5.777V19.5a.5.5 0 01-1 0V5zm4.5 7c-1.367 0-2.535.216-3.5.654V5.277c.886-.515 2.05-.777 3.5-.777.97 0 1.704.178 3.342.724 1.737.58 2.545.776 3.658.776 1.367 0 2.535-.216 3.5-.654v7.377c-.886.515-2.05.777-3.5.777-.97 0-1.704-.178-3.342-.724C10.421 12.196 9.613 12 8.5 12z" fill="#666666"></path>\n                 </svg>\n                 <span class = "flag-text" style = "display: none;">Priority 4</span>';const r=this.#w.querySelector(".flag .menu").querySelectorAll("li");for(let e=0;e<r.length;e++)r[e].classList.remove("active");this.#w.querySelector("#priority4").classList.add("active"),document.querySelector("header button"),this.#w.querySelectorAll(".dropdown.editMenu").forEach((e=>{e.querySelector(".select");const t=e.querySelector(".selected"),o=e.querySelector(".caret"),n=e.querySelector(".menu"),i=e.querySelectorAll(".menu li");i.forEach((r=>{r.addEventListener("click",(()=>{if(e.classList.contains("flag")){const e=r.querySelector(".flag-row"),o=e.querySelector(".flag-text");o.style.display="none",t.innerHTML=e.innerHTML,o.style.display="block"}else t.innerHTML=r.innerHTML,t.id=r.id;o.classList.remove("caret-rotate"),n.classList.remove("menu-open"),i.forEach((e=>{e.classList.remove("active")})),r.classList.add("active")}))}))})),this.#w.style.display="block",this.#g.replaceChild(this.#w,this.#j)}render(e){e.appendChild(this.createContainer()),e.appendChild(this.createEditMenu()),this.#g=document.getElementById(`${this.#u}`),this.#g.onclick=this.onClick.bind(this),this.#y=document.getElementById(`${this.#h}`),this.#C=document.getElementById(`${this.#p}`),this.#j=document.getElementById(`${this.#v}`),this.#w=document.getElementById(`${this.#m}`)}onClick(e){let t=e.target.dataset.action;t&&this[t](e)}showTaskMenu(){e.publish("Generate Dropdown for Edit Menu","")}closeTaskMenu(){this.#w.style.display="none",console.log("momma mia");const e=document.querySelector(".task-name"),t=document.querySelector("textarea"),o=document.querySelector("#date");document.querySelectorAll(".dropdown.editMenu");let n=document.querySelector(".flag .selected .flag-text");e.value="",t.value="",o.value="",n.value="Priority 4",this.#g.replaceChild(this.#j,this.#w)}addTodo(){const t=document.querySelector(".task-name"),o=document.querySelector("textarea"),n=document.querySelector("#date"),i=document.querySelector(".dropdown.editMenu .selected"),r=document.querySelector(".flag .selected .flag-text");let s;"Priority 1"===r.textContent&&(s="red"),"Priority 2"===r.textContent&&(s="yellow"),"Priority 3"===r.textContent&&(s="blue"),"Priority 4"===r.textContent&&(s="gray"),e.publish("Create todo and add to storage",{taskName:t.value,description:o.value,date:n.value,projectLocation:i.id,priority:s})}addTodoToCurrentContainer(e){const t=document.querySelector(".task-name"),o=document.querySelector("textarea"),n=document.querySelector("#date");document.querySelectorAll(".dropdown.editMenu .selected");let i=document.querySelector(".flag .selected .flag-text");"Priority 1"===i.textContent&&this.createTodoItemDOM(t.value,o.value,n.value,"red",e),"Priority 2"===i.textContent&&this.createTodoItemDOM(t.value,o.value,n.value,"yellow",e),"Priority 3"===i.textContent&&this.createTodoItemDOM(t.value,o.value,n.value,"blue",e),"Priority 4"===i.textContent&&this.createTodoItemDOM(t.value,o.value,n.value,"gray",e),this.closeTaskMenu()}setTitle(e){this.#C.textContent=e}clearContainer(){this.#y.innerHTML=""}renderProjectContainer(e){this.clearContainer(),this.setTitle(e.getProjectName()),this.generateTodos(e.getProjectTodoItems()),this.#y.prepend(this.#C),"block"===this.#w.style.display&&(this.#w.style.display="none",this.#g.replaceChild(this.#j,this.#w))}generateTodos(e){for(let t of e.values())this.#y.appendChild(this.createTodoItemDOM(t.getTaskName(),t.getDescription(),t.getDueDate(),t.getPriority(),t.getID()))}}("Inbox");new class{#b;#f;constructor(){this.#f=document.querySelector(".projects"),this.createTodoProjectDOM=this.createTodoProjectDOM.bind(this),this.testCurrentContainer=this.testCurrentContainer.bind(this),this.getCurrentProjectForDropDown=this.getCurrentProjectForDropDown.bind(this),this.onClick=this.onClick.bind(this),e.subscribe("Create Project DOM",this.createTodoProjectDOM),e.subscribe("Should I add a todo to the current container?",this.testCurrentContainer),e.subscribe("Need Current Project for DropDown",this.getCurrentProjectForDropDown)}render(){}createTodoProjectDOM(e){console.log(e.getProjectName()),console.log(typeof e.getProjectColor()),console.log(e.getProjectTodoItems().size),console.log(e.getID());const t=`\n<li data-id = ${e.getID()} id = ${e.getID()} class = "todoProject">\n    <a href="#" data-id = ${e.getID()}  >\n         ${e.getProjectColor()}\n        <span data-id = ${e.getID()} >\n            ${e.getProjectName()} \n        </span>\n    </a>\n     <span class="number" data-id = ${e.getID()}>${e.getProjectTodoItems().size}</span>\n</li>\n`;this.#f.appendChild(document.createRange().createContextualFragment(t)),document.getElementById(`${e.getID()}`).onclick=this.onClick.bind(this)}onClick(t){t.target.dataset.id&&(this.#b=t.target.dataset.id,e.publish("Changing Projects",t.target.dataset.id))}testCurrentContainer(t){console.log("I was just called!"),t.getProjectLocation()===this.#b?e.publish("We are in the current project container, add the associated todo",t.getID()):e.publish("Close Edit Menu","")}addTodoProjectToSidebar(e){for(let e of mapOfTodos.values())this.#f.appendChild(this.createTodoProjectDOM(e.getProjectName(),e.getProjectColor(),e.getProjectTodoItems()))}getCurrentProjectForDropDown(t){e.publish("Show Edit Menu",{projects:t,currentProjectID:this.#b})}},new class{#P;#k;#D;#M;constructor(){this.render()}createProjectModal(){return document.createRange().createContextualFragment('   \n    <div class="project-modal">\n       <div class = "add-project">Add Project</div>\n       <div class="project-modal-content">\n          <div>\n             <label for="">Name</label>\n             <input type="text">\n          </div>\n          <div class = "dropdown-container">\n             <label for="">Color</label>\n             <div class="dropdown dots">\n                <div class="select">\n                   <span class="selected">\n                      <div class="charcoal dot"></div>\n                      Charcoal\n                   </span>\n                   <div class="caret"></div>\n                </div>\n                <ul class="menu">\n                   <li>\n                      <div class="berry-red dot"></div>Berry Red\n                   </li>\n                   <li>\n                      <div class="red dot"></div>\n                      Red\n                   </li>\n                   <li>\n                      <div class="orange dot"></div>\n                      Orange\n                   </li>\n                   <li>\n                      <div class="yellow dot"></div>\n                      Yellow\n                   </li>\n                   <li>\n                      <div class="olive-green dot"></div>\n                      Olive Green\n                   </li>\n                   <li>\n                      <div class="lime-green dot"></div>\n                      Lime Green\n                   </li>\n                   <li>\n                      <div class="green dot"></div>\n                      Green\n                   </li>\n                   <li>\n                      <div class="mint-green dot"></div>\n                      Mint Green\n                   </li>\n                   <li>\n                      <div class="teal dot"></div>\n                      Teal\n                   </li>\n                   <li>\n                      <div class="sky-blue dot"></div>\n                      Sky Blue\n                   </li>\n                   <li>\n                      <div class="light-blue dot"></div>\n                      Light Blue\n                   </li>\n                   <li>\n                      <div class="blue dot"></div>\n                      Blue\n                   </li>\n                   <li>\n                      <div class="grape dot"></div>\n                      Grape\n                   </li>\n                   <li>\n                      <div class="violet dot"></div>\n                      Violet\n                   </li>\n                   <li>\n                      <div class="lavender dot"></div>\n                      Lavender\n                   </li>\n                   <li>\n                      <div class="magenta dot"></div>\n                      Magenta\n                   </li>\n                   <li>\n                      <div class="salmon dot"></div>\n                      Salmon\n                   </li>\n                   <li class = "active">\n                      <div class="charcoal dot"></div>\n                      Charcoal\n                   </li>\n                   <li>\n                      <div class="grey dot"></div>\n                      Grey\n                   </li>\n                   <li>\n                      <div class="taupe dot"></div>\n                      Taupe\n                   </li>\n                </ul>\n             </div>\n          </div>\n       </div>\n       <div class = "project-modal-footer"> <button class = "cancel">Cancel</button> <button class = "add" data-action = "addProject">Add</button></div>\n    </div>\n    ')}render(){document.body.appendChild(this.createProjectModal()),this.#P=document.querySelector(".overlay"),this.#P.onclick=this.onClick.bind(this),this.#k=document.querySelector("#addProjectButton"),this.#k.addEventListener("click",(()=>{this.#P.style.backgroundColor="rgb(0,0,0,0.5)",this.#P.style.display="block",this.#P.appendChild(this.#D),this.#D.style.display="flex"})),this.#D=document.querySelector(".project-modal"),this.#M=document.querySelector(".project-modal input")}onClick(e){let t=e.target.dataset.action;t?this[t](e):e.target===this.#P&&this.removeOverlay()}addProject(){const t=document.querySelector(".project-modal .selected .dot");e.publish("Create Project",{projectName:this.#M.value,projectColor:t.outerHTML}),this.#P.removeChild(this.#D),this.#P.style.display="none",this.#P.style.backgroundColor="transparent"}removeOverlay(){this.#P.removeChild(this.#D),this.#P.style.display="none",this.#P.style.backgroundColor="transparent"}},C.render(u),g.addEventListener("click",(()=>{const e=m.cloneNode(!0);e.setAttribute("id","todo-ab"),e.classList.add("absolute");const t=e.querySelector(".edit-todo-menu");e.querySelector(".edit-todo-menu-footer").classList.add("foot-margin"),t.classList.add("no-border"),y.style.display="block",y.appendChild(e),window.addEventListener("click",(function(t){t.target===y&&(y.removeChild(e),y.style.display="none")})),e.querySelectorAll(".dropdown").forEach((e=>{const t=e.querySelector(".select"),o=e.querySelector(".selected"),n=e.querySelector(".caret"),i=e.querySelector(".menu"),r=e.querySelectorAll(".menu li");t.addEventListener("click",(()=>{n.classList.toggle("caret-rotate"),i.classList.toggle("menu-open")})),document.addEventListener("click",(function(e){!e.target.matches(".dropdown")&&e.target.closest(".dropdown")||(n.classList.remove("caret-rotate"),i.classList.remove("menu-open"))})),r.forEach((t=>{t.addEventListener("click",(()=>{if(e.classList.contains("flag")){const e=t.querySelector(".flag-row"),n=e.querySelector(".flag-text");n.style.display="none",o.innerHTML=e.innerHTML,n.style.display="block"}else o.textContent=t.textContent;n.classList.remove("caret-rotate"),i.classList.remove("menu-open"),r.forEach((e=>{e.classList.remove("active")})),t.classList.add("active")}))}))}))})),c.addEventListener("click",(()=>{l.classList.contains("slideOut")?(l.classList.remove("slideOut"),u.classList.remove("shiftOut"),l.classList.add("slideIn"),u.classList.add("shiftIn")):(l.classList.remove("slideIn"),u.classList.remove("shiftIn"),l.classList.add("slideOut"),u.classList.add("shiftOut"))})),h.addEventListener("click",(()=>{p.classList.contains("rotateRight")?(p.classList.remove("rotateRight"),p.classList.add("rotateDown"),v.classList.add("show"),v.classList.remove("hide")):(p.classList.remove("rotateDown"),p.classList.add("rotateRight"),v.classList.add("hide"),v.classList.remove("show"))})),document.querySelectorAll(".dropdown").forEach((e=>{const t=e.querySelector(".select"),o=e.querySelector(".selected"),n=e.querySelector(".caret"),i=e.querySelector(".menu"),r=e.querySelectorAll(".menu li");t.addEventListener("click",(()=>{n.classList.toggle("caret-rotate"),i.classList.toggle("menu-open")})),e.classList.contains("dots")&&i.classList.toggle("menu-open"),e.classList.contains("dots")||document.addEventListener("click",(function(e){!e.target.matches(".dropdown")&&e.target.closest(".dropdown")||(n.classList.remove("caret-rotate"),i.classList.remove("menu-open"))})),r.forEach((t=>{t.addEventListener("click",(()=>{if(e.classList.contains("flag")){const e=t.querySelector(".flag-row"),n=e.querySelector(".flag-text");n.style.display="none",o.innerHTML=e.innerHTML,n.style.display="block"}else o.innerHTML=t.innerHTML,o.id=t.id;n.classList.remove("caret-rotate"),i.classList.remove("menu-open"),r.forEach((e=>{e.classList.remove("active")})),t.classList.add("active")}))}))}))})();