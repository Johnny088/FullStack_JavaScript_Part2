const BASE_URL = `https://6971cf4a32c6bacb12c49096.mockapi.io/books`;
const markupLi = (id, title) =>
  `<li id="${id}"><h3>${title}</h3><button>view details</button><button class="delete">delete</button></li>`;
// -------------------------------render html-----------------------------------------
const root = document.querySelector('#root');
const list = document.createElement('ul');
list.classList.add('list');
const container = document.createElement('div');
container.classList.add('container');
const infoDiv = document.createElement('div');
infoDiv.classList.add('info');
root.innerHTML = '<h1 class="title">List of books</h1>';
const addBtn = document.createElement('button');
addBtn.textContent = 'add new book';
addBtn.classList.add('form_btn');
root.append(container);
container.append(list, infoDiv, addBtn);
// let copyBooks;
// ---------------------------------- getting books ---------------------------------
function renderBooks() {
  fetch(BASE_URL)
    .then(response => response.json())
    .then(data => {
      const books = data.map(({ id, title }) => markupLi(id, title)).join('');
      // copyBooks = data;
      // console.log(copyBooks);
      list.innerHTML = books;
    })
    .catch(error => console.log(error));
}
renderBooks();
// ------ deleting book -------------------
const deleteBook = id => {
  const options = {
    method: 'DELETE',
  };
  fetch(`${BASE_URL}/${id}`, options).catch(error => console.log(error));
};

// -------------------------- adding listeners for view details and delete buttons --------------------------
list.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.nodeName === 'BUTTON') {
    if (e.target.textContent === 'view details') {
      const id = e.target.parentNode.id;
      const { title, author, year, description } = copyBooks.find(
        book => book.id === id,
      );
      infoDiv.innerHTML = `<h3>${title}</h3> <p>${author}</p> <p>${year}</p> <p>${description}</p>`;
    } else if (e.target.textContent === 'delete') {
      const id = e.target.parentNode.id;
      e.target.parentNode.remove();
      setTimeout(
        () => (infoDiv.innerHTML = `<h2>the book was deleted</h2>`),
        1000,
      );
      setTimeout(() => (infoDiv.innerHTML = ''), 4000);
      copyBooks = copyBooks.filter(book => book.id !== id);
      deleteBook(id);
    }
  }
});
// ----------------- adding a new book --------------------
addBtn.addEventListener('click', () => {
  infoDiv.innerHTML = '';
  if (root.querySelector('form')) {
    return;
  }
  const form = document.createElement('form');
  form.classList.add('submitForm');
  form.innerHTML = `<input type="text" placeholder="Title"  name="bookTitle"/>
    <input type="text" placeholder="Author" name="author"/>
    <input type="text"  placeholder="Year" name="year"/>
    <textarea type="text" placeholder="Description" name="description" rows="5" cols="50"></textarea>
    <button>save</button>`;
  infoDiv.append(form);
  newBookHandler(form);
});

function newBookHandler(form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const title = form.bookTitle.value.trim();
    const author = form.author.value.trim();
    const year = Number(form.year.value);
    const description = form.description.value.trim();
    let error = '';
    let n = 0;
    if (Number.isNaN(year) || year <= 0) {
      error += `${(n += 1)}) - Year must be a number, and >= 0\n`;
    }
    if (!title) {
      error += `${(n += 1)}) - The title is requared\n`;
    }
    if (!author) {
      error += `${(n += 1)}) - The author is requared\n`;
    }
    if (!description) {
      error += `${(n += 1)}) - The description is requared`;
    }
    if (error !== '') {
      alert(error);
      return;
    }
    const id =
      copyBooks.reduce((acc, books) => Math.max(acc, Number(books.id)), 0) + 1;
    const newBook = {
      id: `${id}`,
      title: title,
      author: author,
      year: year,
      description: description,
    };
    addToApi(newBook, form);
  });
}

function addToApi(newBook, form) {
  const options = {
    method: 'POST',
    body: JSON.stringify(newBook),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  fetch(BASE_URL, options)
    .then(() => {
      copyBooks.push(newBook);
      list.insertAdjacentHTML('beforeend', markupLi(newBook.id, newBook.title));
      form.remove();
    })
    .catch(error => console.log(error));
}
