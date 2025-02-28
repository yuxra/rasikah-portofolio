// scroll
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




function toggleMenu() {
    const nav = document.querySelector(".nav-links");
    const toggle = document.querySelector(".menu-toggle");

    if (nav.classList.contains("active")) {
        // Tambahkan efek fade-out sebelum menghilangkan menu
        nav.classList.add("fade-out");
        setTimeout(() => {
            nav.classList.remove("active", "fade-out");
        }, 400); // Sesuai dengan durasi animasi fadeOut di CSS (0.4s)
    } else {
        // Tampilkan menu dan animasi fade-in
        nav.classList.add("active");
    }

    // Animasi tombol toggle
    toggle.classList.toggle("active");
}

window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) { // Jika scroll lebih dari 50px
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const body = document.querySelector("body");

    let navbarHeight = navbar.offsetHeight; // Ambil tinggi navbar
    body.style.paddingTop = navbarHeight + "px"; // Tambahkan padding setinggi navbar
});



const textSlide = document.querySelector('.text-slide');
const texts = document.querySelectorAll('.text-slide p');
const textHeight = 50; // Sesuaikan dengan tinggi teks
let index = 0;

function scrollText() {
    index++;
    textSlide.style.transition = 'transform 1s ease-in-out';
    textSlide.style.transform = `translateY(-${index * 81}px)`;

    // Jika sampai teks duplikasi, reset posisinya diam-diam
    if (index === texts.length - 1) {
        setTimeout(() => {
            textSlide.style.transition = 'none'; // Matikan transisi
            textSlide.style.transform = `translateY(0)`; // Kembali ke awal
            index = 0;
        }, 1000); // Tunggu 1 detik sebelum reset agar tak terlihat
    }

    setTimeout(scrollText, 2000); // Jeda sebelum teks berikutnya muncul
}

// Jalankan animasi pertama kali
setTimeout(scrollText, 2000);



document.addEventListener("DOMContentLoaded", function () {
    const sections = [document.body, ...document.querySelectorAll("div[id]")]; // Tambah body sebagai 'home'
    const navLinks = document.querySelectorAll("nav ul li a");
    const navUnderline = document.querySelector(".nav-underline");

    let lastActiveLink = document.querySelector('nav ul li a[href="#home"]'); // Default di Home

    function updateUnderline(link) {
        if (!link) return;

        const linkRect = link.getBoundingClientRect();
        const parentRect = link.closest("nav").getBoundingClientRect();

        navUnderline.style.width = `${linkRect.width}px`;
        navUnderline.style.left = `${linkRect.left - parentRect.left}px`;
    }

    function highlightCurrentSection() {
        let currentActive = lastActiveLink; // Default tetap pakai yang terakhir aktif
        let windowHeight = window.innerHeight;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const threshold = windowHeight * 0.3; // Harus lebih dari 30% terlihat

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

    // Pas awal, underline langsung di Home
    lastActiveLink.classList.add("active");
    updateUnderline(lastActiveLink);

    // Update underline saat klik menu
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
            lastActiveLink = this;
            updateUnderline(this);
        });
    });

    // Update underline saat scroll
    window.addEventListener("scroll", highlightCurrentSection);

    // Update posisi underline saat resize
    window.addEventListener("resize", () => updateUnderline(lastActiveLink));
});




document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("div[id]");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show"); // Biar efeknya bisa muncul lagi kalau discroll
            }
        });
    }, { threshold: 0.2 }); // 0.2 artinya efek muncul saat 20% dari elemen terlihat

    sections.forEach(section => observer.observe(section));
});





document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a");

    links.forEach(link => {
        if (link.hostname !== window.location.hostname) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer"); // Biar lebih aman
        }
    });
});










