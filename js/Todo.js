import render from './App.js';

let todos = [];

export function create() {
    const currentUser = location.pathname.slice(1);

    const container = document.createElement('div');
    const header = document.createElement('header');
    const nav = document.createElement('nav');
    const username = document.createElement('p');
    const span = document.createElement('span');
    const changeProfileBtn = document.createElement('button');
    const form = document.createElement('form');
    const inputWrapper = document.createElement('div');
    const input = document.createElement('input');
    const button = document.createElement('button');
    const todoList = document.createElement('ul');

    const savedTodos = JSON.parse(localStorage.getItem(currentUser))
    if (savedTodos) {
        todos = savedTodos
        savedTodos.forEach(itemObj => {
            const savedItem = createItem(itemObj);
            todoList.append(savedItem);
        });
    };

    button.textContent = 'Add';
    input.placeholder = 'What needs to be done?';
    span.textContent = 'To do /';
    username.textContent = currentUser;
    changeProfileBtn.textContent = 'Change profile';

    form.addEventListener('submit', event => {
        event.preventDefault();
        if (!input.value) return;
        const newItem = {
            name: input.value,
            done: false,
        };
        const todoItem = createItem(newItem);
        todos.push(newItem);
        saveTodos(todos)
        todoList.append(todoItem);
        input.value = '';
    });

    changeProfileBtn.addEventListener('click', event => {
        event.preventDefault();
        history.pushState(null, null, `${location.origin}`);
        render('./Users.js');
        todos = [];
    });

    username.classList.add('current-user')
    span.classList.add('current-user-prefix');
    changeProfileBtn.classList.add('change-profile-btn');
    nav.classList.add('header__nav');
    header.classList.add('header');
    container.classList.add('todo-container');
    form.classList.add('form');
    inputWrapper.classList.add('input-wrapper');
    input.classList.add('input');
    button.classList.add('button');
    todoList.classList.add('todo-list')

    username.prepend(span);
    nav.append(username);
    nav.append(changeProfileBtn);
    container.append(header);
    header.append(nav);
    inputWrapper.append(input);
    inputWrapper.append(button);
    form.append(inputWrapper);
    container.append(form);
    container.append(todoList);

    return container;
};


function createItem(itemObj) {
    const item = document.createElement('li');
    const itemText = document.createElement('div');
    const buttonWrapper = document.createElement('div');
    const doneBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    doneBtn.textContent = 'Done';
    deleteBtn.textContent = 'Delete';
    itemText.textContent = itemObj.name;
    if (itemObj.done) item.classList.add('done-state')

    doneBtn.addEventListener('click', () => {
        item.classList.toggle('done-state');
        todos.forEach(itemObj => {
            if (itemObj.name === item.children[0].textContent) {
                itemObj.done = !itemObj.done;
            };
        });
        saveTodos(todos)
    });

    deleteBtn.addEventListener('click', () => {
        setTimeout(() => document.querySelector('.modal').classList.add('modal-transition'), 0);
        confirmDelete(item);
    });

    item.classList.add('todo-item');
    itemText.classList.add('todo-text')
    buttonWrapper.classList.add('button-wrapper');
    doneBtn.classList.add('done-btn');
    deleteBtn.classList.add('delete-btn');

    item.append(itemText);
    item.append(buttonWrapper);
    buttonWrapper.append(doneBtn);
    buttonWrapper.append(deleteBtn);

    return item;
};

function confirmDelete(item) {
    const container = document.querySelector('.todo-container')
    const modal = document.createElement('div');
    const modalWindow = document.createElement('div');
    const modalQuestion = document.createElement('div');
    const modalBtnWrapper = document.createElement('div');
    const modalBtnYes = document.createElement('button');
    const modalBtnNo = document.createElement('button');
    modal.classList.add('modal');
    modalWindow.classList.add('modal-window');
    modalQuestion.classList.add('modal-question');
    modalBtnWrapper.classList.add('modal-btn-wrapper');
    modalBtnYes.classList.add('modal-btn-yes', 'modal-btn');
    modalBtnNo.classList.add('modal-btn-no', 'modal-btn');
    modalQuestion.textContent = 'Are you sure?'
    modalBtnYes.textContent = 'Delete';
    modalBtnNo.textContent = 'Cancel';
    modal.append(modalWindow);
    modalWindow.append(modalQuestion);
    modalWindow.append(modalBtnWrapper);
    modalBtnWrapper.append(modalBtnYes);
    modalBtnWrapper.append(modalBtnNo);
    container.append(modal);

    modal.addEventListener('click', event => {
        if (event.__withinWindow) return;
        modal.classList.remove('modal-transition');
        modal.remove()
    });

    modalWindow.addEventListener('click', event => {
        event.__withinWindow = true;
    });

    modalBtnNo.addEventListener('click', () => {
        modal.classList.remove('modal-transition');
        modal.remove();
    });

    modalBtnYes.addEventListener('click', () => {
        modal.classList.remove('modal-transition')
        item.remove();
        todos.forEach(itemObj => {
            if (itemObj.name === item.children[0].textContent) {
                todos.splice(todos.indexOf(itemObj), 1);
            };
        });
        modal.remove();
        saveTodos(todos)
    });
};

function saveTodos(arr) {
    const currentUser = location.pathname.slice(1);
    localStorage.setItem(currentUser, JSON.stringify(arr));
};