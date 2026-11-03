/* MuFase · Redeem Code
 * Sitio estático: los hashes se validan en el navegador.
 * No equivale a un sistema seguro de licencias ni a códigos de un solo uso.
 * Para seguridad real, usar validación del lado del servidor y almacenamiento privado.
 */
'use strict';

// ====================== PERSONALIZACIÓN ======================
// Cambia estas 4 líneas cuando tengas el RAR real.
const DOWNLOAD = Object.freeze({
  path: 'downloads/MuFase-ICONO-DE-PRUEBA.png',
  name: 'MuFase-ICONO-DE-PRUEBA.png',
  displayName: 'MuFase — Archivo de prueba',
  displayType: 'Imagen PNG · temporal'
});
// =============================================================

const form = document.querySelector('#redeem-form');
const input = document.querySelector('#redeem-code');
const inputShell = document.querySelector('#code-input-shell');
const feedback = document.querySelector('#code-feedback');
const submit = document.querySelector('#submit-button');
const submitLabel = document.querySelector('#submit-label');
const formPanel = document.querySelector('#redeem-form-panel');
const successPanel = document.querySelector('#redeem-success-panel');
const downloadButton = document.querySelector('#download-button');
const resetButton = document.querySelector('#reset-button');
const fileDisplayName = document.querySelector('#file-display-name');
const fileDisplayType = document.querySelector('#file-display-type');
const downloadMessage = document.querySelector('#download-message');
let accessGranted = false;

const validHashes = new Set(Array.isArray(window.MUFASE_VALID_CODES) ? window.MUFASE_VALID_CODES : []);

function normalizeCode(raw) {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

function setFeedback(message, success = false) {
  feedback.textContent = message;
  feedback.classList.toggle('success', success);
  inputShell.classList.toggle('is-error', Boolean(message && !success));
  input.setAttribute('aria-invalid', String(Boolean(message && !success)));
}

async function sha256(message) {
  if (!window.crypto || !window.crypto.subtle) {
    throw new Error('secure-context-required');
  }
  const bytes = new TextEncoder().encode(message);
  const buffer = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(buffer), byte => byte.toString(16).padStart(2, '0')).join('');
}

function grantAccess() {
  accessGranted = true;
  formPanel.hidden = true;
  successPanel.hidden = false;
  fileDisplayName.textContent = DOWNLOAD.displayName;
  fileDisplayType.textContent = DOWNLOAD.displayType;
  downloadMessage.textContent = '';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const code = normalizeCode(input.value.trim());
  setFeedback('');
  if (!/^MF[A-HJ-NP-Z2-9]{12}$/.test(code)) {
    setFeedback('Revisa el formato: MF-XXXX-XXXX-XXXX.');
    input.focus();
    return;
  }
  submit.disabled = true;
  submitLabel.textContent = 'Validando acceso…';
  try {
    const digest = await sha256(code);
    if (!validHashes.has(digest)) {
      setFeedback('Este código no es válido. Comprueba que esté bien escrito.');
      return;
    }
    grantAccess();
  } catch (error) {
    setFeedback('Abre la página por HTTPS (GitHub Pages) para validar tu código.');
  } finally {
    submit.disabled = false;
    submitLabel.textContent = 'Validar código';
  }
});

input.addEventListener('input', () => {
  const start = input.selectionStart;
  input.value = input.value.toUpperCase();
  if (start !== null) input.setSelectionRange(start, start);
  if (feedback.textContent) setFeedback('');
});

resetButton.addEventListener('click', () => {
  accessGranted = false;
  successPanel.hidden = true;
  formPanel.hidden = false;
  input.value = '';
  setFeedback('');
  input.focus();
});

downloadButton.addEventListener('click', () => {
  if (!accessGranted) return;
  const anchor = document.createElement('a');
  anchor.href = DOWNLOAD.path;
  anchor.download = DOWNLOAD.name;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  downloadMessage.textContent = 'Descarga iniciada. Si no aparece, revisa las descargas del navegador.';
});

document.querySelector('#copyright-year').textContent = String(new Date().getFullYear());
