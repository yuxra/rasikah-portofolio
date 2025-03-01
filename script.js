// Scroll to section on anchor click
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: "smooth"
            });
        }
    });
});

// Toggle menu animation (show/hide)
function toggleMenu() {
    const nav = document.querySelector(".nav-links");
    const toggle = document.querySelector(".menu-toggle");

    if (nav.classList.contains("active")) {
        nav.classList.add("fade-out");
        setTimeout(() => {
            nav.classList.remove("active", "fade-out");
        }, 400);
    } else {
        nav.classList.add("active");
    }

    toggle.classList.toggle("active");
}

// Navbar scroll effect (add/remove class on scroll)
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Adjust body padding for fixed navbar
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const body = document.querySelector("body");

    let navbarHeight = navbar.offsetHeight;
    body.style.paddingTop = navbarHeight + "px";
});

// Text slide animation
const textSlide = document.querySelector('.text-slide');
const texts = document.querySelectorAll('.text-slide p');
const textHeight = 50;
let index = 0;

function scrollText() {
    index++;
    textSlide.style.transition = 'transform 1s ease-in-out';
    textSlide.style.transform = `translateY(-${index * 81}px)`;

    if (index === texts.length - 1) {
        setTimeout(() => {
            textSlide.style.transition = 'none';
            textSlide.style.transform = `translateY(0)`;
            index = 0;
        }, 1000);
    }

    setTimeout(scrollText, 2000);
}

setTimeout(scrollText, 2000);

// Highlight current section in navbar (update active link and underline)
document.addEventListener("DOMContentLoaded", function () {
    const sections = [document.body, ...document.querySelectorAll("div[id]")];
    const navLinks = document.querySelectorAll("nav ul li a");
    const navUnderline = document.querySelector(".nav-underline");

    let lastActiveLink = document.querySelector('nav ul li a[href="#home"]');

    function updateUnderline(link) {
        if (!link) return;

        const linkRect = link.getBoundingClientRect();
        const parentRect = link.closest("nav").getBoundingClientRect();

        navUnderline.style.width = `${linkRect.width}px`;
        navUnderline.style.left = `${linkRect.left - parentRect.left}px`;
    }

    function highlightCurrentSection() {
        let currentActive = lastActiveLink;
        let windowHeight = window.innerHeight;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const threshold = windowHeight * 0.3;

            if (rect.top < threshold && rect.bottom > threshold) {
                const sectionId = section === document.body ? "home" : section.id;
                const activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);

                if (activeLink) {
                    currentActive = activeLink;
                }
            }
        });

        if (currentActive !== lastActiveLink) {
            lastActiveLink.classList.remove("active");
            currentActive.classList.add("active");
            lastActiveLink = currentActive;
            updateUnderline(currentActive);
        }
    }

    lastActiveLink.classList.add("active");
    updateUnderline(lastActiveLink);

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
            lastActiveLink = this;
            updateUnderline(this);
        });
    });

    window.addEventListener("scroll", highlightCurrentSection);
    window.addEventListener("resize", () => updateUnderline(lastActiveLink));
});

// Section visibility animation on scroll
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("div[id]");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));
});

// Open external links in a new tab
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a");

    links.forEach(link => {
        if (link.hostname !== window.location.hostname) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }
    });
});

// Loading screen progress bar and animation
window.addEventListener("load", function () {
    let progressBar = document.getElementById("progress");
    let loadingScreen = document.getElementById("loadingScreen");
    let flower = document.getElementById("flower");
    let mainContent = document.getElementById("mainContent");

    let loadingDuration = 4;
    let progress = 0;

    progressBar.style.width = '0%';

    let loadingInterval = setInterval(() => {
        progress += 100 / (loadingDuration * 10);
        progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(loadingInterval);
            flower.style.animation = "none";

            setTimeout(() => {
                loadingScreen.style.transform = "translateY(-100%)";
                loadingScreen.style.transition = "transform 1s ease-out";
            }, 50);

            setTimeout(() => {
                loadingScreen.style.display = "none";
                mainContent.style.visibility = "visible";
                mainContent.style.opacity = 1;
            }, 1200);
        }
    }, 100);
});
