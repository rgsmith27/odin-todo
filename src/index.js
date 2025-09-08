import './styles.css';
import TaskListList from './task-list-list';
import TaskItem from './task-item';
import Project from './project';

const setAttributes = (element, attributes) => {
    for(const attribute in attributes){
        const value = attributes[attribute];
        element.setAttribute(attribute, value);
    }
} 

const createTaskElement = (task) => {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.setAttribute('data-id', task.id);

    const taskPriority = document.createElement('div');
    taskPriority.classList.add('task-priority');
    taskPriority.textContent = task.priority;

    const taskTitle = document.createElement('div');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = task.title;

    const taskProject = document.createElement('div');
    taskProject.classList.add('task-project');
    taskProject.style.backgroundColor = task.project.color;

    const taskBody = document.createElement('div');
    taskBody.classList.add('task-body');
    taskBody.textContent = task.description; 

    const removeButton = document.createElement('button');
    removeButton.textContent = "Delete";
    removeButton.addEventListener('click', () => {
        TaskListList.removeTask(task.id);
        updateTasks();
    })

    taskCard.append(taskPriority, taskTitle, taskProject, taskBody, removeButton);
    
    return taskCard;
}

const removeAllTaskElements = () => {
    for(let day = 0; day < TaskListList.weekdays; day++){
        const taskListElement = document.querySelector(`[data-date='${day}']`);
        while (taskListElement.firstChild) {
            taskListElement.removeChild(taskListElement.firstChild);
        }
    }
}

const updateTasks = () => {
    removeAllTaskElements();

    for(let day = 0; day < TaskListList.weekdays; day++){

        const taskArray = TaskListList.list[day].list;
        const taskListElement = document.querySelector(`[data-date='${day}']`);

        taskArray.forEach( task => {
            taskListElement.append(createTaskElement(task));
        });
    }
}

const createTitleEntryElement = () => {
    const titleEntry = document.createElement('input');
    setAttributes(titleEntry, {'type': 'text', 'id': 'title', 'name': 'title', 'placeholder': 'Title'});
    return titleEntry;
}

const createDateEntryElement = () => {
    const dateEntry = document.createElement('select');
    setAttributes(dateEntry, {'id': 'date', 'name': 'date'});

    const monday = document.createElement('option');
    monday.textContent = 'Monday';
    const tuesday = document.createElement('option');
    tuesday.textContent = 'Tuesday';
    const wednesday = document.createElement('option');
    wednesday.textContent = 'Wednesday';
    const thursday = document.createElement('option');
    thursday.textContent = 'Thursday';
    const friday = document.createElement('option');
    friday.textContent = 'Friday';

    dateEntry.append(monday, tuesday, wednesday, thursday, friday);

    return dateEntry;
}

const createPriorityEntryElement = () => {
    const priorityEntry = document.createElement('select');
    setAttributes(priorityEntry, {'id': 'priority', 'name': 'priority'});
    
    const one = document.createElement('option');
    one.textContent = '1';
    const two = document.createElement('option');
    two.textContent = '2';
    const three = document.createElement('option');
    three.textContent = '3';
    const four = document.createElement('option');
    four.textContent = '4';
    const five = document.createElement('option');
    five.textContent = '5';

    priorityEntry.append(one, two, three, four, five);

    return priorityEntry;
}

const createDescriptionEntryElement = () => {
    const descriptionEntry = document.createElement('textarea');
    setAttributes(descriptionEntry, {'id': 'description', 'name': 'description', 'placeholder': 'Write a descriptive description'});
    
    return descriptionEntry;
}



//need to add project selection after adding projects
const createTaskFormElement = () => {
    const taskForm = document.createElement('form');
    taskForm.classList.add('task-create-form');

    const titleEntry = createTitleEntryElement();
    const dateEntry = createDateEntryElement();
    const priorityEntry = createPriorityEntryElement();
    const descriptionEntry = createDescriptionEntryElement();
    
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Create task';

    taskForm.append(titleEntry, dateEntry, priorityEntry, descriptionEntry, submitButton);

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(taskForm);
        newTask(formData);
        taskForm.remove();
    });

    return taskForm;
}

const newTask = (formData) => {

    const title = formData.get('title');
    const description = formData.get('description');
    const date = formData.get('date');
    //placeholder project until project selection is added to form
    const project = new Project('placeholder', '#ff0000ff')
    const priority = formData.get('priority');

    const weekdayToNumber = {
        'Monday': 0,
        'Tuesday': 1,
        'Wednesday': 2,
        'Thursday': 3,
        'Friday': 4
    }

    const dateNumber = weekdayToNumber[date];
    const priorityNumber = Number(priority);

    const task = new TaskItem(title, description, dateNumber, project, priorityNumber);
    TaskListList.addTask(task);

    updateTasks();

}

const initializeButtons = () => {
    const addButton = document.querySelector('.add-button');
    const taskForm = createTaskFormElement();
    addButton.addEventListener('click', (event) => {
        const container = document.querySelector('.container');
        container.append(taskForm);
    })
}

initializeButtons();



