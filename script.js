
const todoList = document.querySelector('#todo-page__list');
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-form__todo-input');

let countOfTask = count = 0

todoForm.addEventListener('submit', formHandler);

//Обработчик формы при добавлении задания
function formHandler(event) {

    count = document.querySelector('.actions__text').getElementsByTagName('span')[0];

    event.preventDefault();
    const taskText = todoInput.value;
    todoInput.focus();
    if(taskText == '') return;

    countOfTask++;
    count.innerText = countOfTask;

    //Создание блока с новым заданием
    const newTask = document.createElement('li');

    //TODO ненужный тег p(возможно надо будет удалить)
    //Создание обёртки для текста
    const wrapper = document.createElement('p');
    wrapper.className = 'text-task';

    //Создание поля "Выполнено"
    const completeTaskBtn = document.createElement('span');
    newTask.className = 'task';
    completeTaskBtn.className = 'complete-task-btn';
    newTask.append(completeTaskBtn);

    wrapper.innerText = taskText;
    newTask.insertAdjacentElement('beforeend', wrapper);
    
    //Создание элемента "Удалить задание"
    const deleteButton = document.createElement('img');
    deleteButton.className = 'delete-btn';
    deleteButton.setAttribute('src', './img/krest.png');
    newTask.append(deleteButton);

    //Обработчик кнопки удаления задания
    deleteButton.addEventListener('click', (event) => {
        event.target.closest('li').remove();
        
        if (!event.target.closest('li').classList.contains('complete-task-style')) {
            countOfTask--;
        }
        count.innerText = countOfTask;
    })

    completeTaskBtn.addEventListener('click', completeTaskBtnHandler)

    todoList.append(newTask);
    todoInput.value = '';
}

const allTaskList = document.getElementsByTagName('li');
const clearCompletedTaskBtn = document.querySelector('.actions__clear-completed');


//Обработчик кнопки очистки выполненых заданий, который помечает задание как выполненное и
//отображает/не отображает кнопку очистки выполненных заданий в зависимости от того, имеются ли такие 
//задания или нет

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

    for (let task of allTaskList) {
        if (task.classList.contains('complete-task-style')) {
            clearCompletedTaskBtn.classList.remove('invisible-clear-btn');
            return;
        }
        clearCompletedTaskBtn.classList.add('invisible-clear-btn');
    }

}

const allTaskListBtn = document.querySelector('.actions__all');

//Обработчик кнопки вывода всех заданий
allTaskListBtn.addEventListener('click', () => {
    if(!allTaskList.length) return;

    for(let task of allTaskList) {
        task.classList.remove('invisible-task');
    }
});

const activeTaskBtn = document.querySelector('.actions__active ');

//Обработчик кнопки активных заданий
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

//Обработчик кнопки выполненных заданиий
completedTaskBtn.addEventListener('click', () => {
    
    for(let task of allTaskList) {
        if (!task.classList.contains('complete-task-style')) {
            task.classList.add('invisible-task');
        }
        if (task.classList.contains('invisible-task') && task.classList.contains('complete-task-style')) {
            task.classList.remove('invisible-task');
        }
    }
    
})

//Обработчик кнопки очистки выполненных заданий, по нажатию которой удаляет
clearCompletedTaskBtn.addEventListener('click', () => {
    if (!allTaskList.length) return;

    for (let task = 0; task < allTaskList.length; task++) {
        if (allTaskList[task].classList.contains('complete-task-style')) {
            allTaskList[task].remove();
            task = -1;
        }
    }

    clearCompletedTaskBtn.classList.add('invisible-clear-btn');
})