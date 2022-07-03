
const todoList = document.querySelector('#todo-page__list');
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-form__todo-input')

todoForm.addEventListener('submit', formHandler);

function formHandler(event) {
    event.preventDefault();
    const taskText = todoInput.value;
    
    todoInput.focus();
    if(taskText == '') return;

    const newTask = document.createElement('li');

    //TODO ненужный тег p(возможно)
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
    
    deleteButton.addEventListener('click', (event) => event.target.closest('li').remove());

    completeTaskBtn.addEventListener('click', function() {
        const text = this.closest('li');
        if (text.classList.contains('complete-task-style')) {
            text.classList.remove('complete-task-style');
        }
        else {
            text.classList.add('complete-task-style');
        }
    })

    console.log(completeTaskBtn);
    todoList.append(newTask);
    todoInput.value = '';
}

const allTaskListBtn = document.querySelector('.actions__all');
const allTaskList = document.getElementsByTagName('li');

allTaskListBtn.addEventListener('click', () => {
     if(!allTaskList.length) return;
     for(let task of allTaskList) {
        task.classList.remove('invisible-task');
     }
});

const activeTastList = document.querySelector('.actions__active ');

activeTastList.addEventListener('click', () => {
    if(!allTaskList.length) return;
    for(let task of allTaskList) {
        if(task.classList.contains('complete-task-style')) {
            task.classList.add('invisible-task');
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
