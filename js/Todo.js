import render from './App.js';

export function create() {
    const params = new URLSearchParams(location.search);
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
    const modal = document.createElement('div');
    const modalWindow = document.createElement('div');
    const modalQuestion = document.createElement('div');
    const modalBtnWrapper = document.createElement('div');
    const modalBtnYes = document.createElement('button');
    const modalBtnNo = document.createElement('button');

    button.textContent = 'Add';
    input.placeholder = 'What needs to be done?';
    span.textContent = 'To do /';
    username.textContent = params.get('user');
    changeProfileBtn.textContent = 'Change profile';
    modalQuestion.textContent = 'Are you sure?'
    modalBtnYes.textContent = 'Yes';
    modalBtnNo.textContent = 'No';

    modal.addEventListener('click', () => {
        if (event.__withinWindow) return
        modal.classList.remove('show-modal');
    })

    modalWindow.addEventListener('click', event => {
        event.__withinWindow = true;
    });

    modalBtnNo.addEventListener('click', () => {
        modal.classList.remove('show-modal');
    });

    modalBtnYes.addEventListener('click', event => {
        modal.classList.remove('show-modal');
        console.log(event);
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
        if (!input.value) return;
        const todoItem = createItem(input.value);
        input.value = '';
        todoList.append(todoItem);
        setTimeout(() => todoItem.classList.add('show'), 0);
    });

    changeProfileBtn.addEventListener('click', event => {
        event.preventDefault();
        history.pushState(null, null, `${location.pathname}`);
        render('./css/Users.css', './Users.js');
    });

    username.classList.add('current-user')
    span.classList.add('current-user-prefix');
    changeProfileBtn.classList.add('change-profile-btn');
    nav.classList.add('header__nav');
    header.classList.add('header');
    container.classList.add('container');
    form.classList.add('form');
    inputWrapper.classList.add('input-wrapper');
    input.classList.add('input');
    button.classList.add('button');
    todoList.classList.add('todo-list')
    modal.classList.add('modal');
    modalWindow.classList.add('modal-window');
    modalQuestion.classList.add('modal-question');
    modalBtnWrapper.classList.add('modal-btn-wrapper');
    modalBtnYes.classList.add('modal-btn-yes', 'modal-btn');
    modalBtnNo.classList.add('modal-btn-no', 'modal-btn');


    modal.append(modalWindow);
    modalWindow.append(modalQuestion);
    modalWindow.append(modalBtnWrapper);
    modalBtnWrapper.append(modalBtnYes);
    modalBtnWrapper.append(modalBtnNo);
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
    container.append(modal)

    return container;
};


function createItem(todo) {
    const item = document.createElement('li');
    const itemText = document.createElement('div');
    const buttonWrapper = document.createElement('div');
    const doneBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    doneBtn.textContent = 'Done';
    deleteBtn.textContent = 'Delete';
    itemText.textContent = todo;

    doneBtn.addEventListener('click', () => {
        if (!item.classList.contains('done-state')) {
            item.classList.add('done-state');
        } else {
            item.classList.remove('done-state');
        };
    });

    deleteBtn.addEventListener('click', () => {
        const modal = document.querySelector('.modal');
        modal.classList.add('show-modal');
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
}