const root = document.getElementById('root');
const params = new URLSearchParams(location.search);
const currentUser = params.get('user');

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
    const params = new URLSearchParams(location.search);
    const currentUser = params.get('user');
    if (currentUser) {
        render('./Todo.js');
    } else {
        render('./Users.js');
    }
})