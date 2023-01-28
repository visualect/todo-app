export default class App {
    constructor(root) {
        this.root = root;
    }

    render() {
        const root = document.querySelector(`${this.root}`)
        const div = document.createElement('div');
        div.textContent = 'Hello, world!';
        root.append(div)
    }
}