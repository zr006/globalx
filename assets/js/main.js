// Globalx Sport Website Main JS
document.addEventListener('DOMContentLoaded', () => {
  // 1. Animated Number Counter: Members & Training Centers
  function animateCounter(elId, targetNum, duration = 2000) {
    const el = document.getElementById(elId);
    let current = 0;
    const increment = targetNum / (duration / 30);
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNum) {
        el.textContent = targetNum.toLocaleString();
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString();
      }
    }, 30);
  }

  // Global Business Data (Edit these values for your real data)
  const TOTAL_MEMBERS = 12680;
  const GLOBAL_CENTERS = 47;
  animateCounter('member-count', TOTAL_MEMBERS);
  animateCounter('center-count', GLOBAL_CENTERS);

  // 2. Draggable Windows (Microsoft Window drag feature)
  const windows = document.querySelectorAll('.win-panel');
  windows.forEach(win => {
    const titleBar = win.querySelector('.win-title-bar');
    let isDrag = false, offsetX, offsetY;

    titleBar.addEventListener('mousedown', (e) => {
      isDrag = true;
      win.style.zIndex = 100;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDrag) return;
      win.style.left = `${e.clientX - offsetX}px`;
      win.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener('mouseup', () => {
      isDrag = false;
      win.style.zIndex = 10;
    });
  });

  // 3. Window Close Button Function
  const closeBtns = document.querySelectorAll('.btn-close');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.closest('.win-panel');
      panel.style.display = 'none';
    });
  });
});