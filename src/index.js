import './styles.css';
import TaskListList from './task-list-list';
import TaskItem from './task-item';
import Project from './project';

const numberToWeekday = {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday'

}

const weekdayToNumber = {
    'Monday': 0,
    'Tuesday': 1,
    'Wednesday': 2,
    'Thursday': 3,
    'Friday': 4
}

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

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        const container = document.querySelector('.container');
        const editForm = createTaskFormElement(task);
        container.append(editForm);

        editForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(editForm);
            editTask(formData, task);
            editForm.remove();
        })
    });

    const removeButton = document.createElement('button');
    removeButton.textContent = "Delete";
    removeButton.addEventListener('click', () => {
        TaskListList.removeTask(task.id);
        updateTasks();
    })

    taskCard.append(taskPriority, taskTitle, taskProject, taskBody, removeButton, editButton);
    
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

const createTitleEntryElement = (title) => {
    const titleEntry = document.createElement('input');
    setAttributes(titleEntry, {'type': 'text', 'id': 'title', 'name': 'title'});
    titleEntry.value = title;
    return titleEntry;
}

const createDateEntryElement = (date) => {
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
    dateEntry.value = date;

    return dateEntry;
}

const createPriorityEntryElement = (priority) => {
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
    priorityEntry.value = priority;

    return priorityEntry;
}

const createDescriptionEntryElement = (description) => {
    const descriptionEntry = document.createElement('textarea');
    setAttributes(descriptionEntry, {'id': 'description', 'name': 'description'});
    descriptionEntry.value = description;
    
    return descriptionEntry;
}

//need to add project selection after adding projects
const createTaskFormElement = (task)  => {
    let title;
    let date;
    let priority;
    let description;

    if(!task){
        title = 'Title';
        date = 'Monday';
        priority = '1';
        description = 'Enter description here';
    } 
    else {
        title = task.title;
        date = numberToWeekday[task.date];
        priority = `${task.priority}`;
        description = task.description;
    }

    const taskForm = document.createElement('form');
    taskForm.classList.add('task-create-form');

    const titleEntry = createTitleEntryElement(title);
    const dateEntry = createDateEntryElement(date);
    const priorityEntry = createPriorityEntryElement(priority);
    const descriptionEntry = createDescriptionEntryElement(description);
    
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Submit task';

    taskForm.append(titleEntry, dateEntry, priorityEntry, descriptionEntry, submitButton);

    return taskForm;
}

const newTask = (formData) => {

    const title = formData.get('title');
    const description = formData.get('description');
    const date = formData.get('date');
    //placeholder project until project selection is added to form
    const project = new Project('placeholder', '#ff0000ff')
    const priority = Number(formData.get('priority'));

    const dateNumber = weekdayToNumber[date];
    const priorityNumber = Number(priority);

    const task = new TaskItem(title, description, dateNumber, project, priorityNumber);
    TaskListList.addTask(task);

    updateTasks();

}

const editTask = (formData, task) => {
    task.title = formData.get('title');
    task.description = formData.get('description');
    //no project selection yet
    task.priority = Number(formData.get('priority'));
    task.date = weekdayToNumber[formData.get('date')];
    updateTasks();
}

const initializeButtons = () => {
    const addButton = document.querySelector('.add-button');

    addButton.addEventListener('click', (event) => {
        const container = document.querySelector('.container');
        const taskForm = createTaskFormElement();

        taskForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(taskForm);
            newTask(formData);
            taskForm.remove();
        });
        container.append(taskForm);
    });

    const projectSortButton = document.querySelector('.sort-projects-button');
    
    projectSortButton.addEventListener('click', () => {
        TaskListList.sortByProject();
        updateTasks();
    });

    const prioritySortButton = document.querySelector('.sort-priority-button');

    prioritySortButton.addEventListener('click', () => {
        TaskListList.sortByPriority();
        updateTasks();
    });
}

initializeButtons();



