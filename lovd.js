// ---------- ambient floating hearts on canvas ----------
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let W, H;
function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const particles = [];
const PCOUNT = 26;
function makeParticle(){
  return {
    x: Math.random() * W,
    y: H + Math.random() * 100,
    size: 6 + Math.random() * 14,
    speed: 0.3 + Math.random() * 0.6,
    drift: (Math.random() - 0.5) * 0.6,
    alpha: 0.15 + Math.random() * 0.35,
    wobble: Math.random() * Math.PI * 2
  };
}
for (let i = 0; i < PCOUNT; i++) particles.push(makeParticle());

function drawHeart(x, y, size, alpha){
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  ctx.scale(size / 20, size / 20);
  ctx.beginPath();
  ctx.moveTo(0, 6);
  ctx.bezierCurveTo(0, 3, -6, -4, -12, 0);
  ctx.bezierCurveTo(-18, 4, -12, 12, 0, 20);
  ctx.bezierCurveTo(12, 12, 18, 4, 12, 0);
  ctx.bezierCurveTo(6, -4, 0, 3, 0, 6);
  ctx.closePath();
  ctx.fillStyle = '#e8879a';
  ctx.fill();
  ctx.restore();
}

function animate(){
  ctx.clearRect(0, 0, W, H);
  for (const p of particles){
    p.y -= p.speed;
    p.wobble += 0.02;
    p.x += Math.sin(p.wobble) * p.drift;
    if (p.y < -30){
      Object.assign(p, makeParticle());
      p.y = H + 20;
    }
    drawHeart(p.x, p.y, p.size, p.alpha);
  }
  requestAnimationFrame(animate);
}
animate();

// ---------- reveal reasons on button click ----------
const revealBtn = document.getElementById('revealBtn');
const reasons = document.getElementById('reasons');
let revealed = false;

revealBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (revealed) return;
  revealed = true;
  reasons.classList.add('show');
  const items = reasons.querySelectorAll('.reason-item, .last-line');
  items.forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), i * 350);
  });
  revealBtn.textContent = 'Every word is true';
  revealBtn.disabled = true;
  revealBtn.style.opacity = '0.6';
  revealBtn.style.cursor = 'default';
});

// ---------- click-anywhere heart burst ----------
document.getElementById('clickzone').addEventListener('click', (e) => {
  for (let i = 0; i < 6; i++){
    const heart = document.createElement('div');
    heart.className = 'heart-burst';
    heart.textContent = '♥';
    heart.style.left = (e.clientX + (Math.random() - 0.5) * 40) + 'px';
    heart.style.top = (e.clientY + (Math.random() - 0.5) * 20) + 'px';
    heart.style.fontSize = (14 + Math.random() * 16) + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
  }
});