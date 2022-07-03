
const todoList = document.querySelector('#todo-page__list');
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-form__todo-input')

let countOfTask = count = 0

todoForm.addEventListener('submit', formHandler);

function formHandler(event) {

    countOfTask++;
    count = document.querySelector('.actions__text').getElementsByTagName('span')[0];
    count.innerText = countOfTask;

    event.preventDefault();
    const taskText = todoInput.value;
    todoInput.focus();
    if(taskText == '') return;

    const newTask = document.createElement('li');

    //TODO ненужный тег p(возможно надо будет удалить)
    const wrapper = document.createElement('p');
    
    wrapper.className = 'text-task';
    const completeTaskBtn = document.createElement('input');
    newTask.className = 'task';
    completeTaskBtn.className = 'complete-task-btn';
    completeTaskBtn.type = 'checkbox';
    newTask.append(completeTaskBtn);

    wrapper.innerText = taskText;
    newTask.insertAdjacentElement('beforeend', wrapper);
    
    const deleteButton = document.createElement('img');
    deleteButton.className = 'delete-btn';
    deleteButton.setAttribute('src', './img/krest.png')
    newTask.append(deleteButton);

    deleteButton.addEventListener('click', (event) => {
        event.target.closest('li').remove();
        if (!event.target.closest('li').classList.contains('complete-task-style'))
        countOfTask--;
        count.innerText = countOfTask;
    })

    completeTaskBtn.addEventListener('click', completeTaskBtnHandler)

    todoList.append(newTask);
    todoInput.value = '';
}

function completeTaskBtnHandler() {
    const text = this.closest('li');
        if (text.classList.contains('complete-task-style')) {
            text.classList.remove('complete-task-style');
            count.innerText = ++countOfTask;
        }
        else {
            text.classList.add('complete-task-style');
            count.innerText = --countOfTask;
        }
}

const allTaskListBtn = document.querySelector('.actions__all');
const allTaskList = document.getElementsByTagName('li');

allTaskListBtn.addEventListener('click', () => {
     if(!allTaskList.length) return;

     for(let task of allTaskList) {
        task.classList.remove('invisible-task');
     }
});

const activeTaskBtn = document.querySelector('.actions__active ');

activeTaskBtn.addEventListener('click', () => {
    if(!allTaskList.length) return;

    for(let task of allTaskList) {
        if(task.classList.contains('complete-task-style')) {
            task.classList.add('invisible-task');
        }
        if (!task.classList.contains('complete-task-style') && task.classList.contains('invisible-task')) {
            task.classList.remove('invisible-task');
        }
    }
})

const completedTaskBtn = document.querySelector('.actions__completed');

completedTaskBtn.addEventListener('click', () => {
    if (!allTaskList.length) return;

    for(let task of allTaskList) {
        if (!task.classList.contains('complete-task-style')) {
            task.classList.add('invisible-task');
        }
        if (task.classList.contains('invisible-task') && task.classList.contains('complete-task-style')) {
            task.classList.remove('invisible-task');
        }
    }
})

const clearCompletedTaskBtn = document.querySelector('.actions__clear-completed');

clearCompletedTaskBtn.addEventListener('click', () => {
    for (let task of allTaskList) {
        if (task.classList.contains('complete-task-style')) {
            //TODO пофксить баг с удалением выполненных задач
            task.remove();
        }
    }
})
// function setAttribute(el, attrs) {
//     for(let key in attrs) {
//         el.setAttribute(key, attrs[key]);
//     }
// }

// function style(el, styles) {
//     for(let key in styles) {
//         el.style[key] = styles[key];
//     }
// }
