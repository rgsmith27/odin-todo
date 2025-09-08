import TaskItem from "./task-item";

class TaskList{
    constructor(date){
        this._date = date;
        this._list = [];
    }

    get date(){
        return this._date;
    }

    set list(value){
        this._list = value;
    }

    get list(){
        return this._list;
    }

    sortByPriority(){
        this._list = this._list.sort( (a,b) => a.priority - b.priority);
    }

    sortByProject(){
        this._list = this._list.sort( (a,b) => a.project.title - b.project.title);
    }
}

export default TaskList;