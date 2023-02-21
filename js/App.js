const root = document.getElementById('root');
const params = new URLSearchParams(location.search);
const currentUser = location.pathname.slice(1);

export default function render(js) {
    return import(js).then(jsModule => {
        root.innerHTML = '';
        const page = jsModule.create();
        root.append(page);
    })
};

if (currentUser) {
    render('./Todo.js');
} else {
    render('./Users.js');
}

window.addEventListener('popstate', () => {
    currentUser = location.pathname.slice(1);
    if (currentUser) {
        render('./Todo.js');
    } else {
        render('./Users.js');
    }
})