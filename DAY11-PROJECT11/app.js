const form = document.getElementById('emailForm');
const emailInput = document.getElementById('email');
const statusEl = document.getElementById('status');
const submitBtn = document.getElementById('submitBtn');

function setFeedback(type, icon, message) {
  statusEl.className = `feedback ${type}`;
  statusEl.innerHTML = `
    <span class="feedback-icon">${icon}</span>
    <span>${message}</span>
  `;
}

function validateEmail(email) {
  if (!email || !email.includes('@')) {
    throw new Error('Invalid email format');
  }
  if (!email.includes('.')) {
    throw new Error('Email must contain a domain (e.g. .com)');
  }
}

async function submitForm(e) {
  e.preventDefault();
  
  const email = emailInput.value.trim();
  const inputGroup = emailInput.closest('.input-group');
  
  // Reset state
  inputGroup.classList.remove('error');
  submitBtn.disabled = true;
  
  try {
    validateEmail(email);
    
    // Simulate async submission
    setFeedback('success', '✅', 'Submission successful!');
    
  } catch (error) {
    console.error('Validation error:', error);
    inputGroup.classList.add('error');
    setFeedback('error', '❌', error.message);
    
  } finally {
    submitBtn.disabled = false;
  }
}

form.addEventListener('submit', submitForm);

// Initial state
setFeedback('info', 'ℹ️', 'Enter email and submit to test error handling.');