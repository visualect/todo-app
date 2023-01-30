export default class TodoApp {
    constructor(root, users) {
        this.root = root;
        this.users = users;
    };

    loadCSS(path) {
        const prevLink = document.getElementsByTagName('link')[0];
        if (prevLink) prevLink.remove();
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path;
        document.head.append(link);
    }

    renderApp() {
        this.loadCSS('./App.css')
        const root = document.querySelector(`${this.root}`)
        root.innerHTML = '';
        const container = document.createElement('div');
        const users = document.createElement('ul');

        for (const user of this.users) {
            const userItem = document.createElement('li');
            const userLink = document.createElement('a');
            userLink.textContent = user;
            userLink.href = `?user=${user}`
            userItem.append(userLink);
            users.append(userItem)
            userLink.addEventListener('click', event => {
                event.preventDefault();
                history.pushState(null, null, userLink.href);
                const todoPage = new TodoPage(this.root, this.users, user);
                todoPage.renderPage(user);
            });

            container.classList.add('container');
            users.classList.add('users');
            userItem.classList.add('users__item');
            userLink.classList.add('users__link');

            container.append(users);
            root.append(container);
        };
    };
};

class TodoPage extends TodoApp {
    constructor(root, users, user) {
        super(root, users);
        this.root = root;
        this.users = users;
        this.user = user
    }

    renderPage() {
        super.loadCSS('./MainPage.css');
        const root = document.querySelector(`${this.root}`)
        root.innerHTML = '';
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

        button.textContent = 'Add';
        input.placeholder = 'What needs to be done?';
        span.textContent = 'To do /';
        username.textContent = this.user
        changeProfileBtn.textContent = 'Change profile';

        form.addEventListener('submit', event => {
            event.preventDefault();
            if (!input.value) return;
            const todoItem = TodoItem.createItem(input.value);
            input.value = '';
            todoList.append(todoItem);
        });

        changeProfileBtn.addEventListener('click', event => {
            event.preventDefault();
            history.back();
            const app = new TodoApp(this.root, this.users);
            app.renderApp();
        })

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

        root.append(container)
    };
}

class TodoItem extends TodoPage {

    static createItem(todo) {
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

        setTimeout(() => item.classList.add('show'), 0);

        return item;
    }
}