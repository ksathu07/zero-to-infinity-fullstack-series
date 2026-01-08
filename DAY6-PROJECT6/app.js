const VALID_USER = 'admin';
const VALID_PASS = '1234';
const SESSION_KEY = 'session';

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('loginError');

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

const loginView = document.getElementById('loginView');
const dashboardView = document.getElementById('dashboardView');
const userInfo = document.getElementById('userInfo');
const sessionOutput = document.getElementById('sessionOutput');

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
    passwordInput.value = '';
    loginError.textContent = '';
    sessionOutput.textContent = '';
    return;
  }

  loginView.classList.add('hidden');
  dashboardView.classList.remove('hidden');

  userInfo.textContent = `Welcome, ${session.user}`;
  sessionOutput.textContent = JSON.stringify(session, null, 2);
}

function handleLogin() {
  const u = usernameInput.value.trim();
  const p = passwordInput.value.trim();

  loginError.textContent = '';

  if (!u || !p) {
    loginError.textContent = 'Username and password are required';
    return;
  }

  if (u === VALID_USER && p === VALID_PASS) {
    const session = {
      user: u,
      loginAt: new Date().toISOString()
    };
    setSession(session);
    renderFromSession();
  } else {
    loginError.textContent = 'Invalid credentials';
  }
}

function handleLogout() {
  clearSession();
  renderFromSession();
}

loginBtn.addEventListener('click', handleLogin);
logoutBtn.addEventListener('click', handleLogout);

// Enter key support
passwordInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') handleLogin();
});

// Initial load
renderFromSession();