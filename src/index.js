

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
const mainContainer = document.querySelector(".main-container");
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


import {ProjectManager} from "./ProjectManager";
import {ProjectModal} from "./ProjectModal";
import {Container} from "./Container";
import {Sidebar} from "./Sidebar";
import {todoProject} from "./todoProject.js";
import {todoItem1} from "./todoItem";

let d = new ProjectManager();
let x = new Container("Inbox");

let y = new Sidebar();

let l = new ProjectModal();

 x.render(main);



//let x = new todoItem1("rger","rtghsrgt","rgeg","rtegsrg","setghrstg");
//alert(x.id);



// mainContainer.addEventListener("click", (e) => {
//   let action = e.target.dataset.action;

//   if(action){
//     alert(`Action = ${action}, id = ${e.target.id}`)
//   }

// })



// addTasktest.addEventListener("click", () => {
//   main.appendChild(createMainContainerDOM("Announcements"));
//   let r = document.querySelector("#r");
//   let p = document.querySelector(".flag .selected .flag-text");

//   if(p.textContent === "Priority 1"){
//     console.log(p.dataset.flagColor);
//     r.appendChild(createTodoItemDOM(taskName.value,textarea.value, date.value, "red", 55));
//   }
//   if(p.textContent === "Priority 2"){
//     console.log(p.dataset.flagColor);
//     mainContainer.appendChild(createTodoItemDOM(taskName.value,textarea.value, date.value, "yellow", 55));
//   }

//   if(p.textContent === "Priority 3"){
//     console.log(p.dataset.flagColor);
//     mainContainer.appendChild(createTodoItemDOM(taskName.value,textarea.value, date.value, "blue", 55));
//   }

//   if(p.textContent === "Priority 4"){
//     console.log(p.dataset.flagColor);
//     mainContainer.appendChild(createTodoItemDOM(taskName.value,textarea.value, date.value, "gray", 55));
//   }


// });


// add.addEventListener("click", ()=> {
//   modal.style.backgroundColor = "rgb(0,0,0,0.5)";
//   modal.style.display = "block";
// modal.appendChild(addProject);
// addProject.style.display = "flex";

// function windowOnClick(event) {
//   if (event.target === modal) {
//     modal.removeChild(addProject);
//     modal.style.display = "none";
//     modal.style.backgroundColor = "transparent";

//   }
// }
// window.addEventListener("click", windowOnClick); 

// })



addNewTask.addEventListener("click", ()=>{
  const x = todoMenu.cloneNode(true);
  x.setAttribute("id","todo-ab");
  x.classList.add("absolute");
  const y =x.querySelector(".edit-todo-menu");
 const s = x.querySelector(".edit-todo-menu-footer");
 s.classList.add("foot-margin");
  y.classList.add("no-border");
  overlay.style.display = "block";
  overlay.appendChild(x);

  function windowOnClick(event) {
    if (event.target === overlay) {
      overlay.removeChild(x);
      overlay.style.display = "none";
  
    }
  }
  window.addEventListener("click", windowOnClick); 



  const dropdowns = x.querySelectorAll(".dropdown");

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
  
    document.addEventListener("click", function(event) {
        if (
          event.target.matches(".dropdown") ||
          !event.target.closest(".dropdown")
        ) {
          caret.classList.remove("caret-rotate");
          menu.classList.remove("menu-open");
        }
      }
    )
  
  
  
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
  













  
})




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

// checkbox.addEventListener("click", () => {
//   if (checkbox.checked) {
//     setTimeout(() => {
//       todoItem.style.display = "none";
//     }, 300);
//   }
// });

// addTask.addEventListener("click", () => {

//   mainContainer.replaceChild(todoMenu, addTask);
  
//   todoMenu.style.display = "block";
//   taskName.focus();
// });

// pencil.addEventListener("click", () => {
//   mainContainer.replaceChild(addTask, todoMenu);

//   mainContainer.replaceChild(todoMenu, z);
//   todoMenu.style.display = "block";
//   taskName.focus();
// });





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

  if(dropdown.classList.contains("dots")){
    menu.classList.toggle("menu-open");
  }





  if(!dropdown.classList.contains("dots")){

  document.addEventListener("click", function(event) {
      if (
        event.target.matches(".dropdown") ||
        !event.target.closest(".dropdown")
      ) {
        caret.classList.remove("caret-rotate");
        menu.classList.remove("menu-open");
      }
    }
  )

  } 

  // Add click event for each li

  options.forEach((option) => {
    option.addEventListener("click", () => {
     
      if(dropdown.classList.contains("flag")){
        const row = option.querySelector(".flag-row");
        const text = row.querySelector(".flag-text");
        text.style.display = "none";

        selected.innerHTML = row.innerHTML;
        text.style.display = "block";

      }
       else {
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


