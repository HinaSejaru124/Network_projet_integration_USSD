/** CONSTANTES & CONFIG */
const CONFIG = { 
  API_URL: 'http://localhost:8080/api/ussd', 
  TIMEOUT: 8000,
  PHONE_NUMBER: '237690123456'
};
const ALLOWED_KEYS = ['0','1','2','3','4','5','6','7','8','9','*','#'];

/** ÉTAT GLOBAL */
let state = { 
  currentDisplay: '', 
  sessionId: null, 
  isWaiting: false, 
  isUssdActive: false,
  ussdCode: ''
};

/** ÉLÉMENTS DOM */
const elements = {
  display: document.getElementById('display-container'),
  overlay: document.getElementById('ussd-overlay'),
  dialog: document.getElementById('ussd-dialog'),
  content: document.getElementById('ussd-content'),
  input: document.getElementById('ussd-input'),
  sendBtn: document.getElementById('send-btn'),
  keypad: document.getElementById('keypad')
};

// --- CLAVIER PHYSIQUE ---
document.addEventListener('keydown', (e) => {
  if (state.isUssdActive && document.activeElement === elements.input) {
    if (e.key === 'Enter') handleResponse();
    return;
  }

  if (ALLOWED_KEYS.includes(e.key)) {
    press(e.key);
    simulateKeyPressHighlight(e.key);
  } else if (e.key === 'Backspace') {
    handleBackspace();
  } else if (e.key === 'Enter') {
    startUssd();
  }
});

function simulateKeyPressHighlight(keyChar) {
  const keyEl = elements.keypad.querySelector(`[data-key="${keyChar}"]`);
  if (!keyEl) return;
  keyEl.classList.add('active-press');
  setTimeout(() => keyEl.classList.remove('active-press'), 150);
}

// --- COMPOSEUR ---
function press(key) {
  if (state.currentDisplay.length >= 20) return;
  state.currentDisplay += key;
  updateDisplay();
}

function handleBackspace() {
  state.currentDisplay = state.currentDisplay.slice(0, -1);
  updateDisplay();
}

function updateDisplay() {
  elements.display.innerText = state.currentDisplay;
}

// --- USSD ---
async function startUssd() {
  if (!state.currentDisplay.includes('*') || !state.currentDisplay.endsWith('#')) return;

  state.sessionId = 'sess_' + Date.now();
  state.ussdCode = state.currentDisplay;
  state.currentDisplay = '';
  updateDisplay();

  state.isUssdActive = true;
  showOverlay(true);
  await sendToBackend('', true);
}

async function handleResponse() {
  const val = elements.input.value.trim();
  elements.input.value = '';
  await sendToBackend(val);
}

async function sendToBackend(userInput, isInitial = false) {
  if (state.isWaiting) return;

  try {
    toggleLoading(true);

    const payload = {
      sessionId: state.sessionId,
      phoneNumber: CONFIG.PHONE_NUMBER,
      ussdCode: state.ussdCode,
      text: userInput
    };

    const response = await fetch(CONFIG.API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    updateUssdUI(data.message);

  } catch (err) {
    console.error(err);
    updateUssdUI("Erreur de connexion.\nRéessayez.");
  } finally {
    toggleLoading(false);
  }
}

// --- UI USSD ---
// IMPORTANT : AUCUN ÉTAT FINAL NE BLOQUE LA SAISIE
function updateUssdUI(message) {
  elements.content.innerText = message;

  // Toujours interactif, même après un état FINAL
  elements.input.style.display = 'block';
  elements.sendBtn.style.display = 'block';

  setTimeout(() => elements.input.focus(), 200);
}

function showOverlay(show) {
  if (show) {
    elements.overlay.style.display = 'flex';
    elements.dialog.getBoundingClientRect();
    elements.dialog.classList.add('show');
    elements.input.focus();
  } else {
    elements.dialog.classList.remove('show');
    setTimeout(() => {
      elements.overlay.style.display = 'none';
      elements.content.innerText = '';
      elements.input.value = '';
    }, 250);
  }
}

// Fermeture MANUELLE uniquement (jamais automatique)
function closeUssd() {
  showOverlay(false);
  state = {
    currentDisplay: '',
    sessionId: null,
    isWaiting: false,
    isUssdActive: false,
    ussdCode: ''
  };
}

function toggleLoading(isLoading) {
  state.isWaiting = isLoading;
  elements.sendBtn.disabled = isLoading;
  elements.content.style.opacity = isLoading ? '0.6' : '1';
}
