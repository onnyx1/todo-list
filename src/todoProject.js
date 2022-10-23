import { v4 as uuidv4 } from "uuid";
import { pubSub } from "./pubSub";

export class todoProject {

    #id;
    #projectName;
    #projectColor;
    #projectTodoItems;

    constructor(projectName, projectColor){
        this.#id = uuidv4();
        this.#projectName = projectName;
        this.#projectColor = projectColor;
        this.#projectTodoItems = new Map();
    }

    
    findTodo(id){
        return this.#projectTodoItems.get(id);
    }

    addTodo(id, todo){
        this.#projectTodoItems.set(id, todo);
    }

    getID(){
        return this.#id;
    }

    getProjectName(){
        return this.#projectName;
    }

    getProjectColor(){
        return this.#projectColor;
    }

    getProjectTodoItems(){
        return this.#projectTodoItems;
    }

    setProjectName(value){
        this.#projectName = value;
    }

    setProjectColor(value){
        this.#projectColor = value;
    }

}


function createProject(obj){

    const projectName = obj.projectName;
    const projectColor = obj.projectColor;


    const project = new todoProject(projectName, projectColor);
    pubSub.publish("Add Project to Project Manager", project);
    pubSub.publish("Create Project DOM", project);

 }

pubSub.subscribe("Create Project", createProject);


