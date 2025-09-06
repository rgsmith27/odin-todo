import "./project";
import "./task-item";

export default class taskList{
    constructor(date){
        this.date = date;
        this.list = [];
    }

    get date(){
        return this.date;
    }

    get list(){
        return this.list;
    }

    addTask(task){
        this.list.push(task);
    }

    removeTask(taskID){
        this.list = this.list.filter(item => item.id != taskID);
    }

    sortByPriority(){
        this.list = this.list.sort( (a,b) => a.priority - b.priority);
    }

    sortByProject(){
        this.list = this.list.sort( (a,b) => a.project.title - b.project.title);
    }
}