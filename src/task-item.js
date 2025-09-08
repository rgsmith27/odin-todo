import Project from "./project"

class TaskItem{
    constructor(title, description, date, project, priority){
        this._title = title;
        this._description = description;
        this._date = date;
        this._project = project;
        this._priority = priority;
        this._id = crypto.randomUUID();
    }

    get title(){
        return this._title;
    }

    set title(value){
        this._title = value;
    }

    get description(){
        return this._description;
    }

    set description(value){
        this._description = value;
    }

    get date(){
        return this._date;
    }

    set date(value){
        this._date = value;
    }

    get project(){
        return this._project;
    }

    set project(value){
        this._project = value;
    }

    get priority(){
        return this._priority;
    }
    
    set priority(value){
        this._priority = value;
    }

    get id(){
        return this._id;
    }
}

export default TaskItem;