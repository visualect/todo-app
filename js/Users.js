import render from './App.js'

export function create() {
    const users = ['Yan', 'Alex'];
    const container = document.createElement('div');
    const usersList = document.createElement('ul');

    for (const user of users) {
        const userItem = document.createElement('li');
        userItem.classList.add('users__item');
        const userLink = document.createElement('a');
        userLink.classList.add('users__link');
        userLink.textContent = user;
        userLink.href = `?user=${user}`
        userItem.append(userLink);
        usersList.append(userItem)
        userLink.addEventListener('click', event => {
            event.preventDefault();
            history.pushState(null, null, userLink.href);
            render('./Todo.js');
        });
    };
    container.classList.add('users-container');
    usersList.classList.add('users');
    container.append(usersList);
    
    return container;
};