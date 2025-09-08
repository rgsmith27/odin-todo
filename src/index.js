import "./styles.css";
import TaskListList from "./task-list-list";
import TaskItem from "./task-item";
import Project from "./project";

const createTaskElement = (task) => {
    const taskCard = document.createElement('div');
    taskCard.classList.add("task-card");
    taskCard.setAttribute("data-id", task.id);

    const taskPriority = document.createElement('div');
    taskPriority.classList.add("task-priority");
    taskPriority.textContent = task.priority;

    const taskTitle = document.createElement('div');
    taskTitle.classList.add("task-title");
    taskTitle.textContent = task.title;

    const taskProject = document.createElement('div');
    taskProject.classList.add("task-project");
    taskProject.style.backgroundColor = task.project.color;

    const taskBody = document.createElement('div');
    taskBody.classList.add("task-body");
    taskBody.textContent = task.description; 

    taskCard.append(taskPriority, taskTitle, taskProject, taskBody);
    
    return taskCard;
}

const updateTasks = () => {
    for(let day = 0; day < TaskListList.weekdays; day++){

        const taskArray = TaskListList.list[day].list;
        const taskListElement = document.querySelector(`[data-date="${day}"]`);

        taskArray.forEach( task => {
            taskListElement.append(createTaskElement(task));
        });
    }
}
