const hamburger = document.querySelector("header button");
const nav = document.querySelector("nav");
const main = document.querySelector("main");
const projectTab = document.querySelector(".project-tab");
const downArrow = document.querySelector("#downArrow");
const projectList = document.querySelector(".projects");
const a = document.querySelector("#a");
const todoItem = document.querySelector(".todo-row");
const checkbox = document.querySelector(".checkbox__input");
const label = document.querySelector(".checkbox");
const addTask = document.querySelector(".add-task-button");
const todoMenu = document.querySelector(".edit-todo-menu-container");
const mainContainer = document.querySelector(".main-container");
const taskName = document.querySelector(".task-name");
const pencil = document.querySelector("#pencil");


hamburger.addEventListener("click", () => {
  if (nav.classList.contains("slideOut")) {
    nav.classList.remove("slideOut");
    main.classList.remove("shiftOut");
    nav.classList.add("slideIn");
    main.classList.add("shiftIn");
  } else {
    nav.classList.remove("slideIn");
    main.classList.remove("shiftIn");
    nav.classList.add("slideOut");
    main.classList.add("shiftOut");
  }
});

projectTab.addEventListener("click", () => {
  if (downArrow.classList.contains("rotateRight")) {
    downArrow.classList.remove("rotateRight");
    downArrow.classList.add("rotateDown");
    a.classList.add("show");

    a.classList.remove("hide");
  } else {
    downArrow.classList.remove("rotateDown");
    downArrow.classList.add("rotateRight");
    a.classList.add("hide");
    a.classList.remove("show");
  }
});

checkbox.addEventListener("click", () => {
  if (checkbox.checked) {
    setTimeout(() => {
      todoItem.style.display = "none";
    }, 300);
  }
});

addTask.addEventListener("click", () => {
  mainContainer.replaceChild(todoMenu, addTask);
  todoMenu.style.display = "block";
  taskName.focus();
});





// DropDown
const dropdowns = document.querySelectorAll(".dropdown");

// Loop through dropdowns
dropdowns.forEach((dropdown) => {
  // Get inner elements

  const select = dropdown.querySelector(".select");
  const selected = dropdown.querySelector(".selected");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li");

  // We want all dropdowns on the page to work

  // Add click event for each select

  select.addEventListener("click", () => {
   
      caret.classList.toggle("caret-rotate");
    

    menu.classList.toggle("menu-open");
  });

  // Add click event for each li

  options.forEach((option) => {
    option.addEventListener("click", () => {
     
      if(dropdown.classList.contains("flag")){
        const row = option.querySelector(".flag-row");
        const text = row.querySelector(".flag-text");
        text.style.display = "none";

        selected.innerHTML = row.innerHTML;
        text.style.display = "block";

      } else {
        selected.textContent = option.textContent;
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
