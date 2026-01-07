const usernameInput = document.getElementById('username');
const roleSelect = document.getElementById('role');
const usernameError = document.getElementById('usernameError');

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

const loginView = document.getElementById('loginView');
const dashboardView = document.getElementById('dashboardView');

const welcomeEl = document.getElementById('welcome');
const adminPanel = document.getElementById('adminPanel');
const userPanel = document.getElementById('userPanel');
const sessionOutput = document.getElementById('sessionOutput');

const SESSION_KEY = 'session';

function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

function setSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function renderFromSession() {
  const session = getSession();

  if (!session) {
    loginView.classList.remove('hidden');
    dashboardView.classList.add('hidden');
    usernameInput.value = '';
    usernameError.textContent = '';
    sessionOutput.textContent = '';
    return;
  }

  loginView.classList.add('hidden');
  dashboardView.classList.remove('hidden');

  welcomeEl.textContent = `Welcome, ${session.username} (${session.role})`;
  sessionOutput.textContent = JSON.stringify(session, null, 2);

  adminPanel.classList.toggle('hidden', session.role !== 'admin');
  userPanel.classList.toggle('hidden', session.role !== 'user');
}

function handleLogin() {
  const username = usernameInput.value.trim();
  const role = roleSelect.value;

  usernameError.textContent = '';

  if (!username) {
    usernameError.textContent = 'Username is required';
    return;
  }

  const session = {
    username,
    role,
    loggedInAt: new Date().toISOString()
  };

  setSession(session);
  renderFromSession();
}

function handleLogout() {
  clearSession();
  renderFromSession();
}

loginBtn.addEventListener('click', handleLogin);
logoutBtn.addEventListener('click', handleLogout);

// Initial load
renderFromSession();