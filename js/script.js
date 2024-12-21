const snowContainer = document.body; 
const numberOfFlakes = 200;

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    snowflake.style.left = Math.random() * 98 + 'vw';

    const size = Math.random() * 5 + 5; 
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;

    const duration = Math.random() * 3 + 2; 
    snowflake.style.animationDuration = `${duration}s`;
    snowflake.style.animationDelay = `${Math.random() * 5}s`;

    snowContainer.appendChild(snowflake);
    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000);
}

setInterval(createSnowflake, 30); 
