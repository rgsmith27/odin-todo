import TaskList from "./task-list";
import TaskItem from "./task-item";

const TaskListList = (function() {
    const weekdays = 5;
    const list = [weekdays];

    for(let i = 0; i < weekdays; i++){
        const taskList = new TaskList(i);
        list[i] = taskList;
    }

    const changeTaskDate = (taskID, initialDate, newDate) => {
        const initalList = list[initialDate];
        const newList = list[newDate];
        const task = initalList.find(item => item.id == taskID);

        initalList.filter(item => item.id != taskID);
        newList.push(task);
    };

    const addTask = (task) => {
        const date = task.date;
        const taskList = list[date];
        taskList.list.push(task);
    }

    const removeTask = (taskID) => {
        list.forEach( taskList => {
            taskList.list = taskList.list.filter( task => task.id != taskID)
        });
    }

    const sortByPriority = () => {
        list.forEach( taskList => 
            taskList.list = taskList.list.sort( (a,b) => a.priority - b.priority)
        );
    }

    const sortByProject = () => {
        list.forEach( taskList => {
            taskList.list = taskList.list.sort( (a,b) => a.project.title - b.project.title);
        })
    }

    return { weekdays, list, changeTaskDate, addTask, removeTask, sortByPriority, sortByProject};
})();

export default TaskListList;