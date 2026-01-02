// State management
let state = {
  profile: { name: '', role: '' },
  theme: 'light',
  isLoading: false
};

// DOM elements
const els = {
  name: document.getElementById('name'),
  role: document.getElementById('role'),
  saveBtn: document.getElementById('saveBtn'),
  themeBtn: document.getElementById('themeBtn'),
  output: document.getElementById('output'),
  displayName: document.getElementById('displayName'),
  displayRole: document.getElementById('displayRole'),
  error: document.getElementById('error')
};

// Load from sessionStorage on init
function init() {
  const saved = sessionStorage.getItem('smartProfile');
  if (saved) {
    state = { ...state, ...JSON.parse(saved) };
    applyState();
  }
  
  bindEvents();
  updatePreview();
}

// Apply theme and profile to DOM
function applyState() {
  // Theme
  document.documentElement.className = state.theme;
  document.querySelector('.sun').style.display = state.theme === 'light' ? 'inline' : 'none';
  document.querySelector('.moon').style.display = state.theme === 'dark' ? 'inline' : 'none';
  
  // Profile
  if (state.profile.name && state.profile.role) {
    els.displayName.textContent = state.profile.name;
    els.displayRole.textContent = state.profile.role;
    els.output.classList.remove('hidden');
    els.error.classList.add('hidden');
  }
}

// Real-time preview
function updatePreview() {
  state.profile.name = els.name.value;
  state.profile.role = els.role.value;
  
  if (state.profile.name && state.profile.role) {
    els.displayName.textContent = state.profile.name;
    els.displayRole.textContent = state.profile.role;
    els.output.classList.remove('hidden');
  } else {
    els.output.classList.add('hidden');
  }
  
  saveState();
}

// Save state to sessionStorage
function saveState() {
  sessionStorage.setItem('smartProfile', JSON.stringify(state));
}

// Event bindings
function bindEvents() {
  els.name.addEventListener('input', updatePreview);
  els.role.addEventListener('input', updatePreview);
  
  els.saveBtn.addEventListener('click', handleSave);
  els.themeBtn.addEventListener('click', toggleTheme);
}

// Save profile (with validation + loading)
async function handleSave() {
  if (!state.profile.name.trim() || !state.profile.role.trim()) {
    showError('Name and role are required');
    return;
  }
  
  state.isLoading = true;
  els.saveBtn.classList.add('loading');
  els.saveBtn.textContent = 'Saving...';
  els.error.classList.add('hidden');
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  state.isLoading = false;
  els.saveBtn.classList.remove('loading');
  els.saveBtn.textContent = 'Profile Saved!';
  
  // Success feedback
  els.output.style.background = 'rgba(16, 185, 129, 0.2)';
  setTimeout(() => {
    els.saveBtn.textContent = 'Save Profile';
  }, 1500);
}

// Theme toggle
function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  applyState();
  saveState();
}

// Error handling
function showError(message) {
  els.error.textContent = message;
  els.error.classList.remove('hidden');
  setTimeout(() => els.error.classList.add('hidden'), 3000);
}

// Initialize
init();