function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    button=document.getElementById('dark-mode-button');
    if (button.innerHTML=="Toggle Dark Mode") {
        button.innerHTML="Toggle Light Mode";
    } else {
        button.innerHTML="Toggle Dark Mode";
    }
}