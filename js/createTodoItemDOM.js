export function createTodoItemDOM() {
  const todoItem = `<div class="todo-row">
      <label class = "checkbox__red" for="myCheckboxId_red">
    
        <input class = "checkbox__input__red" type="checkbox" name="myCheckboxName_red" id="myCheckboxId_red">
        <div class="checkbox__box__red"></div>
      </label>
    <div class="todo-column">
      
        <div class = "todo-title">Participate in Rush Week.</div>
        <div class = "todo-description">I need 85% merit.</div>
        <div class = "todo-date">Jan 19</div>
    </div>

    <div class="todo-actions">
      <svg id = "pencil2" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="rgb(136,136,136)" d="M9.5 19h10a.5.5 0 110 1h-10a.5.5 0 110-1z"/><path stroke="rgb(126,126,126)" d="M4.42 16.03a1.5 1.5 0 00-.43.9l-.22 2.02a.5.5 0 00.55.55l2.02-.21a1.5 1.5 0 00.9-.44L18.7 7.4a1.5 1.5 0 000-2.12l-.7-.7a1.5 1.5 0 00-2.13 0L4.42 16.02z"/></g></svg>
      <svg style="width:20px;height:20px" viewBox="0 0 20 20">
        <path fill="rgb(146,146,146)" d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
    </svg>
    </div>
      
    </div>`;

  return document.createRange().createContextualFragment(todoItem);
}
