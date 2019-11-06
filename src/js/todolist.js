const data = [
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
    this.data = data;
    this.list = list;
    this.todos = list.querySelector('.todos');
    this.currentId = null;

    this.createBtn = list.querySelector('.create-btn');
    this.createBtn.addEventListener('click', () => this.addItem());
    this.filtersBlock = list.querySelector('.filters');
    this.filters = [...this.filtersBlock.querySelectorAll('.select')];
    this.filters.forEach((item) => item.addEventListener('change', (e) => this.filterItems(e)));
    this.search = list.querySelector('.search');
    this.search.addEventListener('change', (e) => this.searchItems(e));
    this.filteredBy = { priority: 'all', status: 'all' };
    this.searchedBy = '';

    this.popup = list.querySelector('.popup');
    this.title = this.popup.querySelector('#form-title');
    this.description = this.popup.querySelector('#form-description');
    this.priority = this.popup.querySelector('#form-priority');

    this.closeBtn = this.popup.querySelector('.popup__close');
    this.closeBtn.addEventListener('click', () => this.closePopup());
    this.cancelBtn = this.popup.querySelector('.cancel-btn');
    this.cancelBtn.addEventListener('click', () => this.closePopup());
    this.okBtn = this.popup.querySelector('.ok-btn');
    this.okBtn.addEventListener('click', () => this.updateItem());

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.todos.innerHTML = '';
    this.filteredArray().forEach((item) => {
      this.renderItem(item);
    });
  }

  renderItem(item = this.data[0]) {
    const block = document.createElement('div');
    this.todos.append(block);

    block.classList.add('todo');
    let statusStr = 'Done';
    if (item.status === 'done') {
      block.classList.add('done');
      statusStr = 'Undone';
    }
    block.dataset.id = item.id;

    block.innerHTML = `
      <div class='todo__title'>${item.title}</div>
      <div class='todo__description'>${item.description}</div>
      <div class='todo__priority'>${item.priority}</div>
      <div class='todo__btn btn'>...</div>
      <ul class="todo__btns">
        <li class='done-btn'>${statusStr}</li>
        <li class='edit-btn'>Edit</li>
        <li class='delete-btn'>Delete</li>
      </ul>`;
    const todoBtn = block.querySelector('.todo__btn');
    todoBtn.addEventListener('click', () => block.querySelector('.todo__btns').classList.toggle('active'));
    const deleteBtn = block.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => this.deleteItem(item.id));
    const doneBtn = block.querySelector('.done-btn');
    doneBtn.addEventListener('click', () => this.changeStatus(item.id));
    const editBtn = block.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => this.editItem(item.id));
  }

  addItem(item = this.data[0]) {
    this.renderItem(item);
    this.data.push(item);
  }

  updateItem() {
    const id = this.currentId;
    this.data.find((item) => item.id === id).title = this.title.value;
    this.data.find((item) => item.id === id).description = this.description.value;
    this.data.find((item) => item.id === id).priority = this.priority.value;
    this.closePopup();
    this.render();
  }

  editItem(id) {
    this.openPopup(id);
    const todoBtn = [...this.list.querySelectorAll('.todo__btns')];
    todoBtn.filter((item) => item.classList.contains('active')).forEach((btn) => btn.classList.remove('active'));
  }

  deleteItem(id) {
    this.data = this.data.filter((item) => item.id !== id);
    const deletedItem = [...this.todos.querySelectorAll('.todo')].find((i) => Number(i.dataset.id) === id);
    deletedItem.remove();
  }

  changeStatus(id) {
    const currentItem = this.data.find((item) => item.id === Number(id));
    const currentStatus = currentItem.status;
    this.data.find((item) => item.id === Number(id)).status = currentStatus === 'done' ? 'open' : 'done';

    const doneItem = [...this.todos.querySelectorAll('.todo')].find((i) => Number(i.dataset.id) === id);
    doneItem.classList.toggle('done');
    const doneBtn = doneItem.querySelector('.done-btn');
    doneBtn.innerHTML = currentItem.status === 'done' ? 'Undone' : 'Done';

    this.render();
  }

  filteredArray() {
    return this.data.filter((item) => {
      let matched = true;
      Object.entries(this.filteredBy).forEach((filter) => {
        if (filter[1] !== 'all' && item[filter[0]] !== filter[1]) {
          matched = false;
        }
      });
      return matched;
    })
      .filter((item) => {
        const title = item.title.toLowerCase();
        const description = item.description.toLowerCase();
        return title.includes(this.searchedBy) || description.includes(this.searchedBy);
      });
  }

  filterItems(e) {
    this.todos.innerHTML = '';
    this.filteredBy[e.target.name] = e.target.value;
    this.filteredArray().forEach((item) => {
      this.renderItem(item);
    });
  }

  searchItems(e) {
    this.searchedBy = e.target.value;
    this.render();
  }

  openPopup(id) {
    if (id) {
      this.currentId = id;
      const title = this.popup.querySelector('#form-title');
      const description = this.popup.querySelector('#form-description');
      const priority = this.popup.querySelector('#form-priority');
      const todo = this.data.find((item) => item.id === id);
      title.value = todo.title;
      description.value = todo.description;
      priority.value = todo.priority;
    }
    this.popup.classList.add('open');
  }

  closePopup() {
    this.popup.classList.remove('open');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const todos = [...document.querySelectorAll('.todo-list')];
  todos.forEach((item) => new ToDoList(item));
});

export default ToDoList;
