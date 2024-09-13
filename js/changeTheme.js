///////////////////////////////////////////////
// ALTERAR O TEMA PARA DARK OU LIGHT
///////////////////////////////////////////////
// Alternância de Tema
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const body = document.body;

// Inicializa com o tema escuro
document.body.classList.add('dark-theme');
sunIcon.style.display = 'block';
moonIcon.style.display = 'none';


themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    // Alterna entre ícones
    if (document.body.classList.contains('dark-theme')) {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
});