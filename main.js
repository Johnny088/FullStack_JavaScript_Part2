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
  const root = document.querySelector('#root');
  const list = document.createElement('ul');
  list.classList.add('list');
  const container = document.createElement('div');
  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('info');
  container.className = 'container';
  root.innerHTML = '<h1 class="title">List of books</h1>';
  root.append(container);
  // --------------------------------------------------------------------
  const booksTest = books
    .map(({ title, author, year, description, id }) => {
      return `<li><h3>${title}</h3><button id="${id}">view details</button></li>`;
    })
    .join('');
  list.insertAdjacentHTML('afterbegin', booksTest);
  container.append(list, descriptionDiv);
}

startHtml();
const bookList = document.querySelector('.list');
const infoDiv = document.querySelector('.info');
bookList.addEventListener('click', e => {
  if (e.target.nodeName === 'BUTTON') {
    const id = Number(e.target.id);
    const { title, author, year, description } = books.find(
      book => book.id === id
    );
    infoDiv.innerHTML = `<h3>${title}</h3> <p>${author}</p> <p>${year}</p> <p>${description}</p>`;
  }
});
