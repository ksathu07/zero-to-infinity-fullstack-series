const logEl = document.getElementById('log');
const runBtn = document.getElementById('runBtn');
const clearBtn = document.getElementById('clearBtn');
const statusBadge = document.getElementById('statusBadge');

function setStatus(mode, text) {
  statusBadge.textContent = text;
  statusBadge.className = 'badge status-' + mode;
}

function write(msg) {
  const timestamp = new Date().toLocaleTimeString();
  const current = logEl.textContent === '// Click "Run Workflow" to start the pipeline'
    ? ''
    : logEl.textContent;
  logEl.textContent = `${current}${current ? '\n' : ''}[${timestamp}] ${msg}`;
  logEl.scrollTop = logEl.scrollHeight;
}

function authService(next) {
  write('Auth service running...');
  setTimeout(() => {
    write('Auth service completed.');
    next();
  }, 1000);
}

function profileService(next) {
  write('Profile service running...');
  setTimeout(() => {
    write('Profile service completed.');
    next();
  }, 1000);
}

function notifyService(next) {
  write('Notification service running...');
  setTimeout(() => {
    write('Notification service completed.');
    next();
  }, 1000);
}

function runWorkflow() {
  runBtn.disabled = true;
  setStatus('running', 'Running workflow');

  logEl.textContent = '';
  write('Workflow started.');

  authService(() => {
    profileService(() => {
      notifyService(() => {
        write('Workflow completed successfully.');
        setStatus('success', 'Completed');
        runBtn.disabled = false;
      });
    });
  });
}

function clearLog() {
  logEl.textContent = '// Click "Run Workflow" to start the pipeline';
  setStatus('idle', 'Idle');
}

runBtn.addEventListener('click', runWorkflow);
clearBtn.addEventListener('click', clearLog);

// Initial state
clearLog();