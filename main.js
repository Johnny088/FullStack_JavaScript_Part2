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

const item = document.querySelector('#root');
item.innerHTML = '<h1 class="title">List of books</h1>';

books.forEach(book => {
  //   item.innerHTML += `<div class="item">${book.title} <button>show description</button></div> <div></div>`;
  const wrapper = document.createElement('div');
  const btn = document.createElement('button');
  btn.textContent = 'view details';
  const infoDiv = document.createElement('div');
  wrapper.className = 'item';
  wrapper.innerHTML = `<h3>${book.title}</h3>`;
  btn.addEventListener('click', () => {
    infoDiv.innerHTML = `<p>${book.title} ${book.author}</p> <p>${book.year}</p> <p>${book.description}</p>`;
  });
  wrapper.append(btn);
  item.append(wrapper, infoDiv);
});
