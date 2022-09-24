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

checkbox.addEventListener(("click"), ()=>{
  if(checkbox.checked){
  setTimeout(() => {
todoItem.style.display = "none";
  
}, 300
)
  }
})





