import { pubSub } from "./pubSub";

export class ProjectModal {
  #overlay;
  #addProjectButton;
  #projectModal;
  #projectNameInput;
  #editProjectID;

  constructor() {
    this.render();
    this.updateProject = this.updateProject.bind(this);
    this.update = this.update.bind(this);
    pubSub.subscribe("Update Project", this.updateProject);
  }

  createProjectModal() {
    const projectModal = `   
    <div class="project-modal">
       <div class = "add-project">Add Project</div>
       <div class="project-modal-content">
          <div>
             <label for="projectName">Name</label>
             <input required maxlength = 25  type="text" id = "projectName">
          </div>
          <div class = "dropdown-container">
             <label for="">Color</label>
             <div class="dropdown dots">
                <div class="select">
                   <span class="selected">
                      <div class="charcoal dot"></div>
                      Charcoal
                   </span>
                   <div class="caret"></div>
                </div>
                <ul class="menu">
                   <li>
                      <div class="berry-red dot"></div>Berry Red
                   </li>
                   <li>
                      <div class="red dot"></div>
                      Red
                   </li>
                   <li>
                      <div class="orange dot"></div>
                      Orange
                   </li>
                   <li>
                      <div class="yellow dot"></div>
                      Yellow
                   </li>
                   <li>
                      <div class="olive-green dot"></div>
                      Olive Green
                   </li>
                   <li>
                      <div class="lime-green dot"></div>
                      Lime Green
                   </li>
                   <li>
                      <div class="green dot"></div>
                      Green
                   </li>
                   <li>
                      <div class="mint-green dot"></div>
                      Mint Green
                   </li>
                   <li>
                      <div class="teal dot"></div>
                      Teal
                   </li>
                   <li>
                      <div class="sky-blue dot"></div>
                      Sky Blue
                   </li>
                   <li>
                      <div class="light-blue dot"></div>
                      Light Blue
                   </li>
                   <li>
                      <div class="blue dot"></div>
                      Blue
                   </li>
                   <li>
                      <div class="grape dot"></div>
                      Grape
                   </li>
                   <li>
                      <div class="violet dot"></div>
                      Violet
                   </li>
                   <li>
                      <div class="lavender dot"></div>
                      Lavender
                   </li>
                   <li>
                      <div class="magenta dot"></div>
                      Magenta
                   </li>
                   <li>
                      <div class="salmon dot"></div>
                      Salmon
                   </li>
                   <li class = "active" id = "charcoal-dot">
                      <div class="charcoal dot"></div>
                      Charcoal
                   </li>
                   <li>
                      <div class="grey dot"></div>
                      Grey
                   </li>
                   <li>
                      <div class="taupe dot"></div>
                      Taupe
                   </li>
                </ul>
             </div>
          </div>
       </div>
       <div class = "project-modal-footer"> <button class = "cancel" data-action = "cancel">Cancel</button> <button  class = "add" data-action = "addProject">Add</button></div>
    </form>
   </div>
    `;
    return document.createRange().createContextualFragment(projectModal);
  }

  render() {
    document.body.appendChild(this.createProjectModal());

    this.#overlay = document.querySelector(".overlay");
    this.#overlay.onclick = this.onClick.bind(this);

    this.#addProjectButton = document.querySelector("#addProjectButton");

    this.#addProjectButton.addEventListener("click", () => {
      this.#projectModal.querySelector(".add").textContent = "Add";
      this.#projectModal.querySelector(".add").dataset.action = "addProject";

      // add action

      this.#overlay.style.backgroundColor = "rgb(0,0,0,0.5)";
      this.#overlay.style.display = "block";
      this.#overlay.appendChild(this.#projectModal);
      this.#projectModal.style.display = "flex";
      this.resetMenu();
    });

    this.#projectModal = document.querySelector(".project-modal");
    this.#projectNameInput = document.querySelector(".project-modal input");
  }

  onClick(e) {
    let action = e.target.dataset.action;
    if (action) {
      this[action](e);
    } else if (e.target === this.#overlay) {
      this.removeOverlay();
    }
  }

  addProject() {
    const color = document.querySelector(".project-modal .selected .dot");
    pubSub.publish("Create Project", { projectName: this.#projectNameInput.value, projectColor: color.outerHTML });

    this.removeOverlay();
  }

  updateProject(id) {
    this.#editProjectID = id;
    this.#overlay.style.backgroundColor = "rgb(0,0,0,0.5)";
    this.#overlay.style.display = "block";
    this.#overlay.appendChild(this.#projectModal);
    this.#projectModal.style.display = "flex";
    this.resetMenu();

    this.#projectModal.querySelector(".add").textContent = "Update";

    delete this.#projectModal.querySelector(".add").dataset.action;
    this.#projectModal.querySelector(".add").dataset.action = "update";

    const projectDOM = document.getElementById(id);
    let projectColor = projectDOM.querySelector(".dot");
    let projectName = projectDOM.querySelector("a span");
    this.#projectNameInput.value = "";
    this.#projectNameInput.value = projectName.textContent;

    document.querySelector(".dots .menu").classList.remove("menu-open");
    const dots = document.querySelectorAll(".dots .menu li");

    for (let i = 0; i < dots.length; i++) {
      if (dots[i].querySelector(".dot").className === projectColor.className) {
        dots[i].classList.add("active");
        document.querySelector(".dots .selected").innerHTML = dots[i].innerHTML;
      } else {
        dots[i].classList.remove("active");
      }
    }
  }

  update() {
    const color = document.querySelector(".project-modal .selected .dot");

    pubSub.publish("Update Todo With Information", { id: this.#editProjectID, color: color.outerHTML, name: this.#projectNameInput.value });
    this.removeOverlay();
  }

  cancel() {
    this.removeOverlay();
  }

  removeOverlay() {
    this.#overlay.removeChild(this.#projectModal);
    this.#overlay.style.display = "none";
    this.#overlay.style.backgroundColor = "transparent";
  }

  resetMenu() {
    document.querySelector(".dots .menu").classList.remove("menu-open");
    document.querySelector(".dots .selected").innerHTML = "<div class='charcoal dot'></div>Charcoal";
    const dots = document.querySelectorAll(".dots .menu li");

    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
    document.getElementById("charcoal-dot").classList.add("active");
    this.#projectNameInput.value = "";
  }
}
