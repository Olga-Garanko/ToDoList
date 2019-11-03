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
];

class ToDoList {
  constructor(list) {
    this.list = list;
    this.todos = list.querySelector('.todos');
    this.createBtn = list.querySelector('.create-btn');
    this.createBtn.addEventListener('click', () => this.addItem());
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
      <button class='btn delete-btn'>Delete</button>`;
    const deleteBtn = block.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => this.deleteItem(item.id));
  }

  addItem(item = data[0]) {
    this.renderItem(item);
    data.push(item);
    console.log('add', data);
  }

  deleteItem(id) {
    data = data.filter((item) => item.id !== id);
    const deletedItem = [...this.todos.querySelectorAll('.todo')].find((i) => Number(i.dataset.id) === id);
    deletedItem.remove();
    console.log('delete', data);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const todos = [...document.querySelectorAll('.todo-list')];
  if (todos) {
    todos.forEach((item) => new ToDoList(item));
  }
});

export default ToDoList;
