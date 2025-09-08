import TaskItem from "./task-item";

class TaskList{
    constructor(date){
        this._date = date;
        this._list = [];
    }

    get date(){
        return this._date;
    }

    get list(){
        return this._list;
    }

    addTask(task){
        this._list.push(task);
    }

    removeTask(taskID){
        this._list = this._list.filter(item => item.id != taskID);
    }

    sortByPriority(){
        this._list = this._list.sort( (a,b) => a.priority - b.priority);
    }

    sortByProject(){
        this._list = this._list.sort( (a,b) => a.project.title - b.project.title);
    }
}

export default TaskList;