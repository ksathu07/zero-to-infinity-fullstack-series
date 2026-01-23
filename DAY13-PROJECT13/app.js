const systemEl = document.getElementById('system');
const logEl = document.getElementById('log');
const injectBtn = document.getElementById('injectBtn');
const recoverBtn = document.getElementById('recoverBtn');
const rollbackBtn = document.getElementById('rollbackBtn');

// System state
const components = [
  { name: 'Auth Service', status: 'stable' },
  { name: 'API Gateway', status: 'stable' },
  { name: 'Database', status: 'stable' }
];

function renderSystem() {
  systemEl.innerHTML = '';
  components.forEach((comp) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${comp.name}</td>
      <td><span class="status-badge status-${comp.status}">${comp.status.toUpperCase()}</span></td>
    `;
    systemEl.appendChild(row);
  });
}

function logEvent(msg) {
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
  logEl.appendChild(entry);
  logEl.scrollTop = logEl.scrollHeight;
}

function injectFailure() {
  const index = Math.floor(Math.random() * components.length);
  components[index].status = 'failed';
  logEvent(`${components[index].name} failed`);
  renderSystem();
}

function recover() {
  let recovered = false;
  components.forEach((comp) => {
    if (comp.status === 'failed') {
      comp.status = 'recovering';
      recovered = true;
    }
  });
  if (recovered) {
    logEvent('Recovery initiated');
  } else {
    logEvent('No failures to recover');
  }
  renderSystem();
}

function rollback() {
  components.forEach((comp) => {
    comp.status = 'stable';
  });
  logEvent('Rollback complete - system stable');
  renderSystem();
}

// Event listeners
injectBtn.addEventListener('click', injectFailure);
recoverBtn.addEventListener('click', recover);
rollbackBtn.addEventListener('click', rollback);

// Initialize
renderSystem();
logEvent('System initialized - all stable');