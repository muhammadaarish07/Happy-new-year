const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

/* Mouse position */
let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
let lastMouse = { x: mouse.x, y: mouse.y };

/* Gravity (zameen ki taraf kheench) */
const gravity = 0.05;

/* Mouse move */
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  const speedX = mouse.x - lastMouse.x;
  const speedY = mouse.y - lastMouse.y;

  /* Jab mouse move ho, nayi mitti udao */
  for (let i = 0; i < 6; i++) {
    particles.push(new DustParticle(mouse.x, mouse.y, speedX, speedY));
  }

  lastMouse.x = mouse.x;
  lastMouse.y = mouse.y;
});

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

/* Dust particle class */
class DustParticle {
  constructor(x, y, speedX, speedY) {
    this.x = x;
    this.y = y;

    /* hawa me phailna */
    this.vx = speedX * 0.2 + (Math.random() - 0.5) * 2;
    this.vy = speedY * 0.2 + (Math.random() - 0.5) * 2;

    this.size = Math.random() * 3 + 1;
    this.life = 100;

     const hue = Math.random() * 360;
const lightness = 50 + Math.random() * 20;

this.color = `hsla(${hue}, 80%, ${lightness}%, 0.8)`;

  }

  update() {
    /* hawa ka asar */
    this.x += this.vx;
    this.y += this.vy;

    /* gravity (neeche girna) */
    this.vy += gravity;

    /* dheere dheere rukna */
    this.vx *= 0.98;
    this.vy *= 0.98;

    this.life--;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const particles = [];

function animate() {
  ctx.fillStyle = "rgba(5,5,5,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

animate();
