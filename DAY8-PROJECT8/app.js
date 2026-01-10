const USER = 'admin';
const PASS = '1234';
const SESSION_KEY = 'session';

const userInput = document.getElementById('user');
const passInput = document.getElementById('pass');
const rememberChk = document.getElementById('remember');
const loginError = document.getElementById('loginError');

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

const loginView = document.getElementById('loginView');
const dash = document.getElementById('dash');
const info = document.getElementById('info');
const sessionOutput = document.getElementById('sessionOutput');

function getStoredSession() {
  const fromLocal = localStorage.getItem(SESSION_KEY);
  const fromSession = sessionStorage.getItem(SESSION_KEY);
  const raw = fromLocal || fromSession;
  return raw ? JSON.parse(raw) : null;
}

function storeSession(session, remember) {
  const json = JSON.stringify(session);
  if (remember) {
    localStorage.setItem(SESSION_KEY, json);
    sessionStorage.removeItem(SESSION_KEY);
  } else {
    sessionStorage.setItem(SESSION_KEY, json);
    localStorage.removeItem(SESSION_KEY);
  }
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

function renderFromSession() {
  const session = getStoredSession();

  if (!session) {
    loginView.classList.remove('hidden');
    dash.classList.add('hidden');
    userInput.value = '';
    passInput.value = '';
    loginError.textContent = '';
    sessionOutput.textContent = '';
    return;
  }

  loginView.classList.add('hidden');
  dash.classList.remove('hidden');

  info.textContent = `Welcome, ${session.user}`;
  sessionOutput.textContent = JSON.stringify(session, null, 2);
}

function handleLogin() {
  const u = userInput.value.trim();
  const p = passInput.value.trim();
  const remember = rememberChk.checked;

  loginError.textContent = '';

  if (!u || !p) {
    loginError.textContent = 'Username and password are required';
    return;
  }

  if (u === USER && p === PASS) {
    const session = {
      user: u,
      loginAt: new Date().toISOString(),
      remember
    };
    storeSession(session, remember);
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
passInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') handleLogin();
});

// Initial load
renderFromSession();