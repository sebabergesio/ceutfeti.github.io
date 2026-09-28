// ==================================================
// script.js - Funcionalidad global con modo oscuro
// ==================================================

document.addEventListener('DOMContentLoaded', function() {

    // ---------- Menú hamburguesa ----------
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.main-nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('open');
        });
    }

    // Cerrar menú al hacer clic en enlace (mobile)
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 820) {
                nav.classList.remove('open');
            }
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (nav && hamburger) {
            const isClickInside = nav.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInside && window.innerWidth <= 820) {
                nav.classList.remove('open');
            }
        }
    });

    // ---------- Theme Toggle Global ----------
    const themeToggles = document.querySelectorAll('.theme-toggle');
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        themeToggles.forEach(toggle => {
            const icon = toggle.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
            }
        });
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // Cargar tema guardado o preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });
});