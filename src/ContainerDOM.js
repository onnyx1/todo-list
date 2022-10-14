import {pubSub} from "./pubSub";

// export class ContainerDOM {
  
  // #name;
  // #id;

  // #element;

  // constructor(name, id) {
  //   this.#name = name;
  //   this.#id = id;
  // }

  // render(location) {
  //   this.#element = this.create();
  //   pubSub().publish("Container Created", this);
  //   location.appendChild(this.#element);
  // }


  export function create(object) {
    const container = `
    <div class = "main-container" id = ${object.id}>
       <div class="todo-items-container">
          <span class = "tab-title">${object.name}</span>
       </div>
    </div>
    `;
    return document.createRange().createContextualFragment(container);
  }

  
//   addTodoItem(id){
//     const item = document.getElementById("id");
//     this.#element.appendChild(item);
//   }

//   removeTodoItem(id){
//     const item = document.getElementById("id");
//     this.#element.removeChild(item);
//   }



// }
