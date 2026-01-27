const BASE_URL = `https://6971cf4a32c6bacb12c49096.mockapi.io/books`;
// -------------------------------render html-----------------------------------------
const root = document.querySelector('#root');
const list = document.createElement('ul');
list.classList.add('list');
const container = document.createElement('div');
container.classList.add('container');
const infoDiv = document.createElement('div');
infoDiv.classList.add('info');
root.innerHTML = '<h1 class="title">List of books</h1>';
