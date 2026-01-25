const roleEl = document.getElementById('role');
const logEl = document.getElementById('log');

// Role-based policies
const policies = {
  Guest: ['View'],
  User: ['View', 'Create'],
  Manager: ['View', 'Create', 'Edit'],
  Admin: ['View', 'Create', 'Edit', 'Delete', 'Policy']
};

function performAction(action) {
  const role = roleEl.value;
  const allowed = policies[role].includes(action);
  const result = allowed ? 'ALLOWED' : 'BLOCKED';
  
  // Alert
  alert(`${role} tried ${action}: ${result}`);
  
  // Audit log
  logEvent(`${role} attempted "${action}" → ${result}`);
}

function logEvent(text) {
  const entry = document.createElement('div');
  entry.className = 'audit-entry';
  entry.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
  logEl.appendChild(entry);
  logEl.scrollTop = logEl.scrollHeight;
}

// Listen for role changes
roleEl.addEventListener('change', () => {
  logEvent(`Role switched to ${roleEl.value}`);
});
