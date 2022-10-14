import { pubSub } from "./pubSub";

export class ProjectModal {
  #overlay;
  #addProjectButton;
  #projectModal;
  #projectNameInput;

  constructor() {
    this.render();
  }

  createProjectModal() {
    const projectModal = `   
    <div class="project-modal">
       <div class = "add-project">Add Project</div>
       <div class="project-modal-content">
          <div>
             <label for="">Name</label>
             <input type="text">
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
                   <li class = "active">
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
       <div class = "project-modal-footer"> <button class = "cancel">Cancel</button> <button class = "add" data-action = "addProject">Add</button></div>
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
      this.#overlay.style.backgroundColor = "rgb(0,0,0,0.5)";
      this.#overlay.style.display = "block";
      this.#overlay.appendChild(this.#projectModal);
      this.#projectModal.style.display = "flex";
    });

    this.#projectModal = document.querySelector(".project-modal");
    this.#projectNameInput = document.querySelector(".project-modal input");
  }



  //   function overlayOnClick(event) {
  //     if (event.target === modal) {
  //         this.#overlay.removeChild(addProject);
  //         this.#overlay.style.display = "none";
  //         this.#overlay.style.backgroundColor = "transparent";
  //     } else if (event.target.dataset.action) {
  //       if (event.target.dataset.action === "add") {
  //         const color = document.querySelector(".project-modal .selected .dot");
  //         pubSub.publish("projectCreated", 5);
  //         this.createTodoProjectDOM(input.value, color.outerHTML, new Map());
  //         this.#overlay.removeChild(this.#projectModal);
  //         this.#overlay.style.display = "none";
  //         this.#overlay.style.backgroundColor = "transparent";
  //       }

  //     }
  //   }

 

  onClick(e) {
    let action = e.target.dataset.action;
    if (action) {
      this[action](e);
    } else if (e.target === this.#overlay){
        this.removeOverlay();
    } 
  }

  addProject() {
    const color = document.querySelector(".project-modal .selected .dot");
    pubSub.publish("Create Project", {projectName: this.#projectNameInput.value, projectColor: color.outerHTML});

    this.#overlay.removeChild(this.#projectModal);
    this.#overlay.style.display = "none";
    this.#overlay.style.backgroundColor = "transparent";
  }

  removeOverlay() {
    this.#overlay.removeChild(this.#projectModal);
    this.#overlay.style.display = "none";
    this.#overlay.style.backgroundColor = "transparent";
  }

 
}