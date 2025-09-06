export default class taskItem{
    constructor(title, description, date, project, priority){
        this.title = title;
        this.description = description;
        this.date = date;
        this.project = project;
        this.priority = priority;
        this.id = crypto.randomUUID();
    }

    get title(){
        return this.title;
    }

    set title(value){
        this.title = value;
    }

    get description(){
        return this.description;
    }

    set description(value){
        this.description = value;
    }

    get date(){
        return this.date;
    }

    set date(value){
        this.date = value;
    }

    get project(){
        return this.project;
    }

    set project(value){
        this.project = value;
    }

    get priority(){
        return this.priority;
    }
    
    set priority(value){
        this.priority = value;
    }

    get id(){
        return this.id;
    }
}