const books = [
  {
    id: 1,

    title: 'JavaScript для початківців',

    author: 'Іван Петренко',

    year: 2021,

    description:
      'Книга знайомить з основами JavaScript та пояснює ключові поняття простою мовою.',
  },

  {
    id: 2,

    title: 'Сучасний JavaScript',

    author: 'Олена Коваль',

    year: 2020,

    description:
      'Посібник з сучасних можливостей JavaScript та прикладів їх використання.',
  },

  {
    id: 3,

    title: 'Веб-розробка з нуля',

    author: 'Андрій Мельник',

    year: 2019,

    description:
      'Книга про створення веб-застосунків з використанням HTML, CSS та JavaScript.',
  },
];

function startHtml() {
  const item = document.querySelector('#root');
  const container = document.createElement('div');
  container.className = 'container';
  item.innerHTML = '<h1 class="title">List of books</h1>';
  item.append(container);
  books.forEach(book => {
    const wrapper = document.createElement('div');
    const btn = document.createElement('button');
    btn.textContent = 'view details';
    const infoDiv = document.createElement('div');
    wrapper.className = 'item';
    wrapper.innerHTML = `<h3>${book.title}</h3>`;
    btn.addEventListener('click', () => {
      if (!infoDiv.innerHTML) {
        infoDiv.innerHTML = `<p>${book.title}</p> <p>${book.author}</p> <p>${book.year}</p> <p>${book.description}</p>`;
        return;
      }
      infoDiv.innerHTML = '';
    });
    wrapper.append(btn);
    container.append(wrapper, infoDiv);
    item.append(container);
  });

  // --------------adding a new book -----------------
  const formBtn = document.createElement('button');
  formBtn.textContent = 'add new book';

  formBtn.addEventListener('click', () => {
    addBook(item);
  });
  item.append(formBtn);
}

// --------------------------------form ----------------------------------
const addBook = box => {
  if (box.querySelector('.submitForm')) {
    return;
  }
  const form = document.createElement('form');
  form.className = 'submitForm';
  form.innerHTML = `<input type="text" required placeholder="Title"  name="bookTitle"/>
      <input type="text" required placeholder="Author" name="author"/>
      <input type="number" required placeholder="Year" name="year"/>
      <input type="text" required placeholder="Description" name="description"/>
      <button>save</button>`;
  box.append(form);
  form.addEventListener('submit', e => {
    e.preventDefault();
    const title = form.bookTitle.value;
    const author = form.author.value;
    const year = form.year.value;
    const description = form.description.value;
    const id = books.length + 1;
    books.push({
      id: id,
      title: title,
      author: author,
      year: year,
      description: description,
    });
    form.remove();
    startHtml();
  });
};

startHtml();
