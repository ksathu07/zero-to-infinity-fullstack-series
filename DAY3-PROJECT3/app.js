// DOM references
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const roleInput = document.getElementById('role');

const saveBtn = document.getElementById('saveBtn');
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');
const clearBtn = document.getElementById('clearBtn');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');

const tbody = document.getElementById('profileTbody');
const table = document.getElementById('profileTable');
const emptyState = document.getElementById('emptyState');
const output = document.getElementById('output');
const countBadge = document.getElementById('countBadge');

let activeId = null;

// LocalStorage helpers
function getDB() {
  const raw = localStorage.getItem('profiles');
  return raw ? JSON.parse(raw) : [];
}

function setDB(data) {
  localStorage.setItem('profiles', JSON.stringify(data));
}

// Validation
function validate() {
  let ok = true;
  nameError.textContent = '';
  emailError.textContent = '';

  if (!nameInput.value.trim()) {
    nameError.textContent = 'Name is required';
    ok = false;
  }

  if (!emailInput.value.trim()) {
    emailError.textContent = 'Email is required';
    ok = false;
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailInput.value.trim())) {
    emailError.textContent = 'Enter a valid email';
    ok = false;
  }

  return ok;
}

// CRUD actions
function saveProfile() {
  if (!validate()) return;

  const db = getDB();
  const user = {
    id: Date.now(),
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    role: roleInput.value.trim(),
    lastUpdated: new Date().toLocaleString()
  };

  db.push(user);
  setDB(db);
  activeId = user.id;
  render();
  clearForm();
}

function updateProfile() {
  if (!activeId) {
    alert('Select a profile first');
    return;
  }
  if (!validate()) return;

  const db = getDB();
  const user = db.find(u => u.id === activeId);
  if (!user) return;

  user.name = nameInput.value.trim();
  user.email = emailInput.value.trim();
  user.phone = phoneInput.value.trim();
  user.role = roleInput.value.trim();
  user.lastUpdated = new Date().toLocaleString();

  setDB(db);
  render();
  clearForm();
}

function deleteProfile() {
  if (!activeId) {
    alert('Select a profile first');
    return;
  }
  let db = getDB();
  db = db.filter(u => u.id !== activeId);
  setDB(db);
  activeId = null;
  render();
  clearForm();
}

function loadProfile(id) {
  const db = getDB();
  const user = db.find(u => u.id === id);
  if (!user) return;

  activeId = id;
  nameInput.value = user.name;
  emailInput.value = user.email;
  phoneInput.value = user.phone;
  roleInput.value = user.role;

  output.textContent = JSON.stringify(user, null, 2);
  highlightActiveRow();
}

function clearForm() {
  nameInput.value = '';
  emailInput.value = '';
  phoneInput.value = '';
  roleInput.value = '';
  activeId = null;
  nameError.textContent = '';
  emailError.textContent = '';
  output.textContent = '';
  highlightActiveRow();
}

// UI render
function render() {
  const db = getDB();
  tbody.innerHTML = '';

  if (db.length === 0) {
    table.classList.add('hidden');
    emptyState.classList.remove('hidden');
  } else {
    table.classList.remove('hidden');
    emptyState.classList.add('hidden');
  }

  countBadge.textContent = db.length.toString();

  db.forEach(user => {
    const tr = document.createElement('tr');
    tr.dataset.id = user.id;
    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role || '-'}</td>
      <td>${user.lastUpdated}</td>
    `;
    tr.onclick = () => loadProfile(user.id);
    tbody.appendChild(tr);
  });

  highlightActiveRow();
}

function highlightActiveRow() {
  [...tbody.querySelectorAll('tr')].forEach(tr => {
    if (Number(tr.dataset.id) === activeId) {
      tr.classList.add('active');
    } else {
      tr.classList.remove('active');
    }
  });
}

// Wire events
saveBtn.onclick = saveProfile;
updateBtn.onclick = updateProfile;
deleteBtn.onclick = deleteProfile;
clearBtn.onclick = clearForm;

// Initial render
render();