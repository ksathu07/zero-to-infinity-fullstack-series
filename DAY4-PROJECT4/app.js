const loadBtn = document.getElementById('loadBtn');
const retryBtn = document.getElementById('retryBtn');
const statusText = document.getElementById('status');
const output = document.getElementById('output');
const errorBox = document.getElementById('errorBox');

const API_URL = 'https://jsonplaceholder.typicode.com/users/1';

function setStatus(mode, message) {
  statusText.textContent = message;
  statusText.className = 'status status-' + mode;
}

function setLoading(isLoading) {
  loadBtn.disabled = isLoading;
  retryBtn.disabled = isLoading;
  loadBtn.textContent = isLoading ? 'Loading...' : 'Load Data';
}

async function loadData() {
  setLoading(true);
  setStatus('loading', 'Loading data...');
  errorBox.classList.add('hidden');
  errorBox.textContent = '';
  output.textContent = '';

  try {
    const response = await fetch(API_URL, { method: 'GET' });

    if (!response.ok) {
      throw new Error('Server error: ' + response.status);
    }

    const data = await response.json();
    output.textContent = JSON.stringify(data, null, 2);
    setStatus('success', 'Data loaded successfully');
    retryBtn.disabled = true;
  } catch (error) {
    setStatus('error', 'Failed to load data');
    errorBox.textContent = error.message || 'Unknown error';
    errorBox.classList.remove('hidden');
    retryBtn.disabled = false;
  } finally {
    setLoading(false);
  }
}

loadBtn.onclick = loadData;
retryBtn.onclick = loadData;

// Initial state
setStatus('idle', 'Idle · Click "Load Data" to fetch from API');
