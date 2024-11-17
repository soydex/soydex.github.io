// Configuration
const snowContainer = document.body; // Ajouter les flocons au body
const numberOfFlakes = 50; // Nombre total de flocons à afficher

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    // Position horizontale aléatoire
    snowflake.style.left = Math.random() * 98 + 'vw';

    // Taille aléatoire
    const size = Math.random() * 5 + 5; // Entre 5px et 10px
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;

    // Durée et délai aléatoires
    const duration = Math.random() * 3 + 2; // Entre 2s et 5s
    snowflake.style.animationDuration = `${duration}s`;
    snowflake.style.animationDelay = `${Math.random() * 5}s`;

    // Ajouter au body et supprimer après l'animation
    snowContainer.appendChild(snowflake);
    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000);
}

// Génération continue
setInterval(createSnowflake, 30); // Un flocon toutes les 300ms
