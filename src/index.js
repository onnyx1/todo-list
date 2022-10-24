const hamburger = document.querySelector("header button");
const nav = document.querySelector("nav");
const main = document.querySelector("main");
const projectTab = document.querySelector(".project-tab");
const downArrow = document.querySelector("#downArrow");
const projectList = document.querySelector(".projects");
const a = document.querySelector("#a");
const todoItem = document.querySelector(".todo-row");
const checkbox = document.querySelector(".checkbox__input__gray");
const label = document.querySelector(".checkbox");
const addTask = document.querySelector(".add-task-button");
const todoMenu = document.querySelector(".edit-todo-menu-container");
const taskName = document.querySelector(".task-name");
const pencil = document.querySelector("#pencil");
const z = document.querySelector("#z");
const addNewTask = document.querySelector(".add-new-task");
const overlay = document.querySelector(".overlay");
const add = document.querySelector("#add");
const addProject = document.querySelector(".project-modal");
const addTasktest = document.querySelector(".edit-todo-menu-add-task");
const textarea = document.querySelector("textarea");
const date = document.querySelector("#date");

import { ProjectManager } from "./ProjectManager";
import { ProjectModal } from "./ProjectModal";
import { Container } from "./Container";
import { Sidebar } from "./Sidebar";
import { todoProject } from "./todoProject.js";
import { todoItem1 } from "./todoItem";

let d = new ProjectManager();
let x = new Container("Inbox");
let y = new Sidebar();
let l = new ProjectModal();
x.render(main);

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

  if (dropdown.classList.contains("dots")) {
    menu.classList.toggle("menu-open");
  }

  if (!dropdown.classList.contains("dots")) {
    document.addEventListener("click", function (event) {
      if (event.target.matches(".dropdown") || !event.target.closest(".dropdown")) {
        caret.classList.remove("caret-rotate");
        menu.classList.remove("menu-open");
      }
    });
  }

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

function myFunction(x) {
  if (x.matches) {
    // If media query matches
    nav.classList.remove("slideIn");
    main.classList.remove("shiftIn");
    nav.classList.add("slideOut");
    main.classList.add("shiftOut");
  } else {
  }
}

var mediaQuery = window.matchMedia("(max-width: 900px)");
myFunction(mediaQuery); // Call listener function at run time
mediaQuery.addListener(myFunction); // Attach listener function on state changes





function myFunction2(x) {
  if (x.matches) {
    // If media query matches


    document.querySelector(".share-menu").style.opacity = "1";
  } else {
  }
}

var mediaQuery2 = window.matchMedia("(max-width: 500px)");
myFunction2(mediaQuery); // Call listener function at run time
mediaQuery2.addListener(myFunction2); // Attach listener function on state changes
