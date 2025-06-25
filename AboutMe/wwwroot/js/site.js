AOS.init({ duration: 1200 });

const words = [
    "Hi, I'm Trung Pham 👋",
    ".NET Backend Developer with Passion 💡",
    "Tech Enthusiast & Software Engineering Student at CTD - UEH 🎓"
];
let wordIndex = 0;

function typingEffect() {
    const el = document.getElementById("typewriter");
    let word = words[wordIndex].split("");
    let typing = function () {
        if (word.length > 0) {
            el.innerHTML += word.shift();
            setTimeout(typing, 100);
        } else {
            setTimeout(deletingEffect, 1000);
        }
    };
    typing();
}

function deletingEffect() {
    const el = document.getElementById("typewriter");
    let word = el.innerHTML.split("");
    let deleting = function () {
        if (word.length > 0) {
            word.pop();
            el.innerHTML = word.join("");
            setTimeout(deleting, 50);
        } else {
            wordIndex = (wordIndex + 1) % words.length;
            typingEffect();
        }
    };
    deleting();
}

typingEffect();

document.addEventListener("mousemove", (e) => {
    const cursor = document.createElement("div");
    cursor.className = "cursor-effect";
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
    document.body.appendChild(cursor);
    setTimeout(() => cursor.remove(), 500);
});

function toggleMenu() {
    const nav = document.getElementById("nav-links");
    nav.classList.toggle("nav-expanded");
    nav.classList.toggle("nav-collapsed");
}

function toggleTheme() {
    const isLight = document.body.classList.toggle("light-mode");
    const icon = document.querySelector(".theme-toggle i");
    if (icon) {
        icon.classList.toggle("fa-sun", isLight);
        icon.classList.toggle("fa-moon", !isLight);
    }
    localStorage.setItem("theme", isLight ? "light" : "dark");
}

window.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("theme");
    const isLight = theme === "light";
    if (isLight) {
        document.body.classList.add("light-mode");
        const icon = document.querySelector(".theme-toggle i");
        icon?.classList.replace("fa-moon", "fa-sun");
    }
});

// Tech particle animation
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
window.addEventListener("load", () => {
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function drawWelcomeText() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "bold 36px Outfit, sans-serif";
        ctx.fillStyle = "rgba(88,166,255,0.8)";
        ctx.textAlign = "center";
        ctx.fillText("Welcome to my portfolio", canvas.width / 2, canvas.height / 2);
    }

    drawWelcomeText();
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(88,166,255,0.7)';
        ctx.fill();
    }
}

function initParticles(num) {
    particles = [];
    for (let i = 0; i < num; i++) {
        particles.push(new Particle());
    }
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(88,166,255,${1 - distance / 120})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
        p.move();
        p.draw();
    }
    drawConnections();
    requestAnimationFrame(animate);
}

initParticles(100);
animate();