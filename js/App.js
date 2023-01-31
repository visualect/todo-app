const root = document.getElementById('root');
const params = new URLSearchParams(location.search);
const currentUser = params.get('user');

function load(src) {
    if (src.endsWith('.js')) {
        return import(src);
    } else if (src.endsWith('.css')) {
        return new Promise(resolve => {
            const link = document.getElementsByTagName('link')[0];
            if (link) {
                link.href = src;
                resolve();
            } else {
                const link = document.createElement('link');
                document.head.append(link);
                link.rel = 'stylesheet';
                link.href = src;
                link.addEventListener('load', () => {
                    resolve();
                });
            };
        });
    };
};

export default function render(css, js) {
    return Promise.all([
        load(css),
        load(js),
    ]).then(([,jsModule]) => {
        root.innerHTML = '';
        const page = jsModule.create();
        root.append(page);
    });
};

if (currentUser) {
    render('./css/Todo.css', './Todo.js');
} else {
    render('./css/Users.css', './Users.js');
}

window.addEventListener('popstate', () => {
    const params = new URLSearchParams(location.search);
    const currentUser = params.get('user');
    if (currentUser) {
        render('./css/Todo.css', './Todo.js');
    } else {
        render('./css/Users.css', './Users.js');
    }
})