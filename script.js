
const todoList = document.querySelector('#todo-page__list');
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-form__todo-input')

todoForm.addEventListener('submit', formHandler);

function formHandler(event) {
    event.preventDefault();
    const taskText = todoInput.value;
    const newTask = document.createElement('li');
    newTask.innerText = taskText;
    newTask.style['list-style-type'] = 'none';
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('role', 'button');
    deleteButton.innerText = 'Удалить';
    deleteButton.style['margin-left'] = '15px';
    deleteButton.style['padding'] = '5px';
    newTask.append(deleteButton);
    
    deleteButton.addEventListener('click', (event) => event.target.closest('li').remove());
    todoList.append(newTask);
    todoInput.value = '';
    todoInput.focus();
}