AOS.init({ duration: 1200 });

const words = ["Hi, I'm Trung Pham 👋",
    ".NET Backend Developer with Passion 💡",
    "Tech Enthusiast & Software Engineering Student at CTD - UEH 🎓"];
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
