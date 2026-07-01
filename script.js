/* =====================================
   ONYX - SCRIPT.JS
===================================== */

// =========================
// Fond animé avec particules
// =========================

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let mouse = {
    x: null,
    y: null,
    radius: 120
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {

    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 3 + 1;

        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width)
            this.speedX *= -1;

        if (this.y < 0 || this.y > canvas.height)
            this.speedY *= -1;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            this.x -= dx / 35;
            this.y -= dy / 35;
        }
    }

    draw() {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "#00d4ff";
        ctx.fill();

    }

}

const particles = [];

for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
}

function connectParticles() {

    for (let a = 0; a < particles.length; a++) {

        for (let b = a + 1; b < particles.length; b++) {

            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {

                ctx.strokeStyle = "rgba(0,212,255,0.12)";
                ctx.lineWidth = 1;

                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();

            }

        }

    }

}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {

        p.update();
        p.draw();

    });

    connectParticles();

    requestAnimationFrame(animate);

}

animate();


// =========================
// Apparition des sections
// =========================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

});

sections.forEach(section => {

    section.classList.add("hidden");
    observer.observe(section);

});


// =========================
// Boutons
// =========================

document.getElementById("discover").addEventListener("click", () => {

    document.getElementById("features").scrollIntoView({

        behavior: "smooth"

    });

});

document.getElementById("learn").addEventListener("click", () => {

    document.getElementById("about").scrollIntoView({

        behavior: "smooth"

    });

});


// =========================
// Contact
// =========================

const form = document.querySelector("form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Merci ! Votre message a été envoyé.");

    form.reset();

});


// =========================
// Menu mobile
// =========================

const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");

menuBtn.addEventListener("click", () => {

    if(menu.style.display === "flex"){

        menu.style.display = "none";

    }else{

        menu.style.display = "flex";
        menu.style.flexDirection = "column";
        menu.style.position = "absolute";
        menu.style.top = "80px";
        menu.style.right = "30px";
        menu.style.background = "#111827";
        menu.style.padding = "20px";
        menu.style.borderRadius = "15px";
        menu.style.gap = "20px";

    }

});
