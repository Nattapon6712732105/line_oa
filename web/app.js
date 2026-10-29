// ==========================================================================
// NaEak food - Interactive Logic for Promotions & Stamp Card
// ==========================================================================

let currentStamps = 3;
const maxStamps = 10;

// Switch Tab function
function switchTab(tab) {
  const promoBtn = document.getElementById('tab-btn-promo');
  const rewardsBtn = document.getElementById('tab-btn-rewards');
  const promoSection = document.getElementById('section-promo');
  const rewardsSection = document.getElementById('section-rewards');

  if (tab === 'rewards') {
    promoBtn.classList.remove('active');
    rewardsBtn.classList.add('active');
    promoSection.classList.remove('active');
    rewardsSection.classList.add('active');
    window.location.hash = 'rewards';
  } else {
    rewardsBtn.classList.remove('active');
    promoBtn.classList.add('active');
    rewardsSection.classList.remove('active');
    promoSection.classList.add('active');
    window.location.hash = 'promo';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Copy Code to Clipboard with Toast
function copyCode(code) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(showToast).catch(() => fallbackCopy(code));
  } else {
    fallbackCopy(code);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast();
  } catch (err) {
    console.error('Copy failed:', err);
  }
  document.body.removeChild(textArea);
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// Render 10 Stamp Card Slots
function renderStamps(count) {
  const grid = document.getElementById('stamps-grid');
  grid.innerHTML = '';

  for (let i = 1; i <= maxStamps; i++) {
    const slot = document.createElement('div');
    slot.className = 'stamp-slot';

    if (i === 5 || i === 10) {
      slot.classList.add('reward-slot');
    }

    if (i <= count) {
      slot.classList.add('stamped');
      if (i === 10) {
        slot.innerHTML = '<span class="stamp-icon">🏆</span>';
      } else if (i === 5) {
        slot.innerHTML = '<span class="stamp-icon">🥤</span>';
      } else {
        slot.innerHTML = '<span class="stamp-icon">⭐</span>';
      }
    } else {
      if (i === 10) {
        slot.innerHTML = '<span class="stamp-icon" style="font-size:16px;">🎁</span><span class="stamp-num">ฟรีอาหาร</span>';
      } else if (i === 5) {
        slot.innerHTML = '<span class="stamp-icon" style="font-size:16px;">🥤</span><span class="stamp-num">ฟรีน้ำ</span>';
      } else {
        slot.innerHTML = `<span class="stamp-num">${i}</span>`;
      }
    }

    grid.appendChild(slot);
  }

  // Update counter & progress bar
  document.getElementById('display-stamps').textContent = count;
  const percentage = Math.min(100, Math.round((count / maxStamps) * 100));
  document.getElementById('progress-fill').style.width = `${percentage}%`;
}

// Check Points by Phone Simulation
function checkPoints() {
  const input = document.getElementById('input-phone');
  const result = document.getElementById('check-result');
  const phone = input.value.trim();

  if (phone.length < 9) {
    alert('กรุณากรอกเบอร์โทรศัพท์ 9-10 หลักให้ถูกต้องค่ะ');
    return;
  }

  // Consistent demo point generator based on phone last digit
  const lastDigit = parseInt(phone.slice(-1), 10) || 3;
  const calculatedPoints = Math.min(10, Math.max(1, lastDigit));

  currentStamps = calculatedPoints;
  renderStamps(currentStamps);

  result.className = 'check-result success';
  result.innerHTML = `✅ เบอร์ ${phone.slice(0, 3)}-xxx-${phone.slice(-4)} มีแต้มสะสม: <strong>${currentStamps} แต้ม</strong> (${10 - currentStamps > 0 ? `อีกเพียง ${10 - currentStamps} แต้มจะได้รับอาหารฟรี 1 จาน!` : 'คุณมีสิทธิ์แลกรับอาหารฟรีแล้ว!'})`;
}

// Auto detect Hash on load
window.addEventListener('DOMContentLoaded', () => {
  renderStamps(currentStamps);

  const hash = window.location.hash.toLowerCase();
  if (hash === '#rewards' || hash === '#reward' || hash === '#stamp' || hash === '#points') {
    switchTab('rewards');
  } else {
    switchTab('promo');
  }
});
