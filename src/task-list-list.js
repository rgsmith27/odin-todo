import "./task-list";

export default taskListList = (function() {
    const weekdays = 5;
    const taskListList = [weekdays];

    for(let i = 0; i < weekdays; i++){
        taskListList[i] = new taskList(i);
    }

    const changeTaskDate = (taskID, initialDate, newDate) => {
        const initalList = taskListList[initialDate];
        const newList = taskListList[newDate];
        const task = initalList.find(item => item.id == taskID);

        initalList.filter(item => item.id != taskID);
        newList.push(task);
    };

    return { taskListList, changeTaskDate };
})();