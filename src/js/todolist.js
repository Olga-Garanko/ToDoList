let data = [
  {
    id: 1,
    title: 'Learn JS',
    description: 'Learn JS',
    priority: 'high',
    status: 'open',
  },
  {
    id: 2,
    title: 'Improve English',
    description: 'Improve English',
    priority: 'low',
    status: 'done',
  },
  {
    id: 3,
    title: 'Travel a lot',
    description: 'Travel a lot',
    priority: 'normal',
    status: 'open',
  },
  {
    id: 4,
    title: 'Travel a little',
    description: 'Travel a little',
    priority: 'high',
    status: 'done',
  },
];

class ToDoList {
  constructor(list) {
    this.list = list;
    this.todos = list.querySelector('.todos');
    this.createBtn = list.querySelector('.create-btn');
    this.createBtn.addEventListener('click', () => this.addItem());
    this.filter = [...list.querySelectorAll('.select')];
    this.filter.forEach((item) => item.addEventListener('change', (e) => this.filterItems(e)));
    this.search = list.querySelector('.search');
    this.search.addEventListener('change', (e) => this.searchItems(e));
    this.filters = { priority: 'all', status: 'all' };
    this.init();
  }

  init() {
    data.forEach((item) => {
      this.renderItem(item);
    });
  }

  renderItem(item = data[0]) {
    const block = document.createElement('div');
    this.todos.append(block);

    block.classList.add('todo');
    if (item.status === 'done') block.classList.add('done');
    block.dataset.id = item.id;

    block.innerHTML = `
      <div class='todo__title'>${item.title}</div>
      <div class='todo__description'>${item.description}</div>
      <div class='todo__priority'>${item.priority}</div>
      <div class="btns">
        <button class='btn done-btn'>Done</button>
        <button class='btn edit-btn'>Edit</button>
        <button class='btn delete-btn'>Delete</button>
      </div>`;
    const deleteBtn = block.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => this.deleteItem(item.id));
    const doneBtn = block.querySelector('.done-btn');
    doneBtn.addEventListener('click', () => this.changeStatus(item.id));
    const editBtn = block.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => this.editItem(item.id));
  }

  addItem(item = data[0]) {
    this.renderItem(item);
    data.push(item);
  }

  deleteItem(id) {
    data = data.filter((item) => item.id !== id);
    const deletedItem = [...this.todos.querySelectorAll('.todo')].find((i) => Number(i.dataset.id) === id);
    deletedItem.remove();
  }

  changeStatus(id) {
    data.find((item) => item.id === Number(id)).status = 'done';
    const doneItem = [...this.todos.querySelectorAll('.todo')].find((i) => Number(i.dataset.id) === id);
    doneItem.classList.add('done');
  }

  filterItems(e) {
    this.todos.innerHTML = '';
    this.filters[e.target.name] = e.target.value;

    const filteredData = data.filter((item) => {
      let matched = true;
      Object.entries(this.filters).forEach((filter) => {
        if (filter[1] !== 'all' && item[filter[0]] !== filter[1]) {
          matched = false;
        }
      });
      return matched;
    });

    filteredData.forEach((item) => {
      this.renderItem(item);
    });
  }

  searchItems(e) {
    this.todos.innerHTML = '';
    const searchStr = e.target.value;
    const searchedData = data.filter((item) => {
      const title = item.title.toLowerCase();
      const description = item.description.toLowerCase();
      return title.indexOf(searchStr) >= 0 || description.indexOf(searchStr) >= 0;
    });
    searchedData.forEach((item) => {
      this.renderItem(item);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const todos = [...document.querySelectorAll('.todo-list')];
  if (todos) {
    todos.forEach((item) => new ToDoList(item));
  }
});

export default ToDoList;
