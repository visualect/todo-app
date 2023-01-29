export default class App {
    constructor(root, users) {
        this.root = root;
        this.users = users;
        this.loadCSS('./App.css');
    };

    loadCSS(path) {
        const prevLink = document.getElementsByTagName('link')[0];
        if (prevLink) prevLink.remove();
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path;
        document.head.append(link);
    }

    render() {
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
                history.pushState({}, '', userLink.href);
                const todoPage = new TodoPage(this.root, user, this.users);
                todoPage.render();
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

class TodoPage extends App {
    constructor(root, user, users) {
        super();
        this.user = user;
        this.root = root;
        this.users = users;
        super.loadCSS('./MainPage.css');
    }

    render() {
        const root = document.querySelector(`${this.root}`)
        root.innerHTML = '';

        const container = document.createElement('div');
        const header = document.createElement('header');
        const nav = document.createElement('nav');
        const p = document.createElement('p');
        const span = document.createElement('span');
        const changeProfileBtn = document.createElement('button');
        const form = document.createElement('form');
        const inputWrapper = document.createElement('div');
        const input = document.createElement('input');
        const button = document.createElement('button');
        const todoList = document.createElement('ul');

        button.textContent = 'Add';
        input.placeholder = 'Add...';
        span.textContent = 'To do /';
        p.textContent = `${this.user}`;
        changeProfileBtn.textContent = 'Change profile';

        form.addEventListener('submit', event => {
            event.preventDefault();
            if (!input.value) return;
            const item = new TodoItem(input.value);
            const todoItem = item.createItem();
            todoList.append(todoItem);
        });

        changeProfileBtn.addEventListener('click', event => {
            event.preventDefault();
            history.pushState({}, '', '/');
            const app = new App(this.root, this.users);
            app.render();
        })

        p.classList.add('current-user')
        span.classList.add('current-user-prefix');
        changeProfileBtn.classList.add('change-profile-btn');
        nav.classList.add('header__nav');
        header.classList.add('header');
        container.classList.add('container');
        form.classList.add('form');
        inputWrapper.classList.add('input-wrapper');
        input.classList.add('input');
        button.classList.add('button');

        p.prepend(span);
        nav.append(p);
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
    done = false;
    constructor(todo) {
        this.todo = todo;
    };

    createItem() {
        const item = document.createElement('li');
        const itemText = document.createElement('div');
        const buttonWrapper = document.createElement('div');
        const doneBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        item.textContent = this.todo;

        item.classList.add('todo-item');

        item.append(itemText);
        item.append(buttonWrapper);
        buttonWrapper.append(doneBtn);
        buttonWrapper.append(deleteBtn);

        return item;
    }
}