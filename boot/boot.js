window.onload = function() {
    const bootScreen = document.querySelector('.boot-screen');
    
    // Load and play the startup sound
    const audio = new Audio('startup.mp3')
    audio.play();

    // Set a timeout to hide the boot screen after the sound finishes (adjust timing as needed)
    setTimeout(() => {
        bootScreen.style.display = 'none';
        // Redirect to either setup or login depending on user data (this will need to be adjusted)
        window.location.href = '../setup/setup.html'; // Change to login if necessary
    }, 5000); // Adjust timing to match the length of the startup sound (in milliseconds)
};
