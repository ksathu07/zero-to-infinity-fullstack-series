const dashboardEl = document.getElementById('dashboard');
const alertEl = document.getElementById('alert');

// System components
const components = [
  { name: 'Auth Service', status: 'healthy' },
  { name: 'API Gateway', status: 'healthy' },
  { name: 'Database', status: 'healthy' },
  { name: 'Cache Layer', status: 'healthy' }
];

const statusMap = {
  healthy: { label: 'Healthy', class: 'healthy' },
  degraded: { label: 'Degraded', class: 'degraded' },
  down: { label: 'Down', class: 'down' }
};

function renderDashboard() {
  dashboardEl.innerHTML = '';
  
  components.forEach((component) => {
    const row = document.createElement('tr');
    const statusInfo = statusMap[component.status];
    
    row.innerHTML = `
      <td>${component.name}</td>
      <td><span class="status-badge status-${statusInfo.class}">${statusInfo.label}</span></td>
      <td>${new Date().toLocaleTimeString()}</td>
    `;
    dashboardEl.appendChild(row);
  });
  
  // Update alert
  const hasFailure = components.some(c => c.status === 'down');
  const alertText = hasFailure 
    ? 'System Alert: Critical failure detected!' 
    : 'All systems healthy 🟢';
  const alertClass = hasFailure ? 'warning' : 'healthy';
  
  alertEl.className = `alert ${alertClass}`;
  alertEl.innerHTML = `
    <span class="alert-icon">${hasFailure ? '🚨' : '🟢'}</span>
    <span>${alertText}</span>
  `;
}

function simulateFailures() {
  const index = Math.floor(Math.random() * components.length);
  const states = ['healthy', 'degraded', 'down'];
  const newStatus = states[Math.floor(Math.random() * states.length)];
  
  components[index].status = newStatus;
  renderDashboard();
}

// Initialize
renderDashboard();
setInterval(simulateFailures, 3000); // Every 3 seconds