
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
    style(newTask, {'position': 'relative', 'list-style': 'none'});
    newTask.innerText = taskText;

    const deleteButton = document.createElement('img');
    setAttribute(deleteButton, {'src': './img/krest.png', 'width': '30px', 'height': '30px'});
    style(deleteButton, {right: '0', 'position': 'absolute'});
    newTask.append(deleteButton);
    
    deleteButton.addEventListener('click', (event) => event.target.closest('li').remove());

    todoList.append(newTask);
    todoInput.value = '';
}

function setAttribute(el, attrs) {
    for(let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function style(el, styles) {
    for(let key in styles) {
        el.style[key] = styles[key];
    }
}
