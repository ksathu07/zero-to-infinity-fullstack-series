const DB_KEY = 'clientDb';

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const formError = document.getElementById('formError');

const addBtn = document.getElementById('addBtn');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const clearSearchBtn = document.getElementById('clearSearchBtn');

const table = document.getElementById('table');
const tableBody = document.getElementById('tableBody');
const emptyState = document.getElementById('emptyState');

function getDB() {
  const raw = localStorage.getItem(DB_KEY);
  return raw ? JSON.parse(raw) : [];
}

function setDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function clearForm() {
  nameInput.value = '';
  emailInput.value = '';
  formError.textContent = '';
}

function validate() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  formError.textContent = '';

  if (!name || !email) {
    formError.textContent = 'Name and Email are required';
    return false;
  }

  return true;
}

function render(filtered = null) {
  const db = filtered ?? getDB();

  tableBody.innerHTML = '';

  if (db.length === 0) {
    table.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }

  table.classList.remove('hidden');
  emptyState.classList.add('hidden');

  db.forEach((record, index) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${record.name}</td>
      <td>${record.email}</td>
      <td>
        <button class="btn danger badge-danger" data-id="${record.id}">Delete</button>
      </td>
    `;

    tableBody.appendChild(tr);
  });
}

function addRecord() {
  if (!validate()) return;

  const db = getDB();
  const record = {
    id: Date.now(),
    name: nameInput.value.trim(),
    email: emailInput.value.trim()
  };

  db.push(record);
  setDB(db);
  clearForm();
  render();
}

function deleteRecord(id) {
  let db = getDB();
  db = db.filter(r => r.id !== id);
  setDB(db);
  render();
}

function handleTableClick(e) {
  const btn = e.target.closest('button[data-id]');
  if (!btn) return;

  const id = Number(btn.dataset.id);
  deleteRecord(id);
}

function searchRecords() {
  const key = searchInput.value.trim().toLowerCase();
  const db = getDB();

  if (!key) {
    render();
    return;
  }

  const filtered = db.filter(r =>
    r.name.toLowerCase().includes(key)
  );
  render(filtered);
}

function clearSearch() {
  searchInput.value = '';
  render();
}

// Wire events
addBtn.addEventListener('click', addRecord);
tableBody.addEventListener('click', handleTableClick);
searchBtn.addEventListener('click', searchRecords);
clearSearchBtn.addEventListener('click', clearSearch);
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') searchRecords();
});

// Initial render
render();
