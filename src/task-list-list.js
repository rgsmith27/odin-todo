import TaskList from "./task-list";

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

    return { weekdays, list, changeTaskDate };
})();

export default TaskListList;