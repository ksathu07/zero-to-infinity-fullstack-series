const nameInput = document.getElementById('name');
const formError = document.getElementById('formError');
const sendBtn = document.getElementById('sendBtn');
const requestOutput = document.getElementById('requestOutput');
const responseOutput = document.getElementById('responseOutput');
const statusBadge = document.getElementById('statusBadge');

function setStatus(mode, text) {
  statusBadge.textContent = text;
  statusBadge.className = 'badge status-' + mode;
}

function showResponse(res) {
  responseOutput.textContent = JSON.stringify(res, null, 2);
  if (res.status >= 200 && res.status < 300) {
    setStatus('success', `Success · ${res.status}`);
  } else {
    setStatus('error', `Error · ${res.status}`);
  }
}

function fakeServer(req) {
  // server(req) in PDF [file:182]
  if (!req.name || !req.name.trim()) {
    return {
      status: 400,
      message: 'Name is required',
      timestamp: new Date().toISOString()
    };
  }

  return {
    status: 200,
    message: `Hello, ${req.name.trim()}`,
    time: new Date().toLocaleString(),
    length: req.name.trim().length
  };
}

function send() {
  const name = nameInput.value;
  formError.textContent = '';

  const requestPayload = {
    name,
    sentAt: new Date().toISOString()
  };

  requestOutput.textContent = JSON.stringify(requestPayload, null, 2);
  setStatus('idle', 'Processing...');

  // In real life this would be fetch; here it is sync
  const response = fakeServer(requestPayload);

  if (response.status === 400) {
    formError.textContent = response.message;
  }

  showResponse(response);
}

sendBtn.addEventListener('click', send);
nameInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') send();
});

// Initial state
setStatus('idle', 'Idle · Waiting for request');
responseOutput.textContent = '// Response JSON will appear here';
requestOutput.textContent = '// Request JSON will appear here';
