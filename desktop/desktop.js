// Function to update the clock every second
function updateClock() {
    const clock = document.getElementById('clock');
    setInterval(() => {
        const now = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Europe/London', // Adjusted for Daylight Saving Time
            hour12: false // 24-hour format
        };
        clock.innerText = now.toLocaleTimeString('en-GB', options); // Update clock text
    }, 1000);
}

// Call the function to start updating the clock
updateClock();

// Wait for the DOM to load before adding event listeners
window.onload = function() {
    const startMenu = document.getElementById('start-menu');
    const homeIcon = document.getElementById('home-icon'); // Home icon reference
    const wallpaperWindow = document.getElementById('wallpaper-window');
    const wallpaperBtn = document.getElementById('wallpaper-btn');
    const closeWallpaperWindowBtn = document.getElementById('close-wallpaper-window');
    const wallpaperImages = document.querySelectorAll('.wallpaper-img');
    const colorBoxes = document.querySelectorAll('.color-box');

    // Show/Hide the start menu when the home icon is clicked
    homeIcon.onclick = function() {
        startMenu.classList.toggle('hidden'); // Toggle the visibility of the start menu
    };

    // Show wallpaper window when "Wallpaper" button is clicked
    wallpaperBtn.onclick = function() {
        wallpaperWindow.style.display = 'block'; // Show the wallpaper window
        startMenu.classList.add('hidden'); // Hide the start menu
    };

    // Close the wallpaper window when the close button is clicked
    closeWallpaperWindowBtn.onclick = function() {
        wallpaperWindow.style.display = 'none'; // Hide wallpaper window
    };

// Update background when a wallpaper is clicked
wallpaperImages.forEach(img => {
    img.onclick = function() {
        const wallpaperPath = img.getAttribute('src');
        document.body.style.backgroundImage = `url('${wallpaperPath}')`; // Set selected wallpaper as background
        document.body.style.backgroundColor = ''; // Clear any solid color
        document.body.style.backgroundSize = 'auto'; // Ensures the image covers the entire screen
        document.body.style.backgroundRepeat = 'no-repeat'; // Prevents the image from repeating
        document.body.style.backgroundPosition = 'center'; // Centers the image
    };
});


    // Update background color when a solid color is clicked
    colorBoxes.forEach(box => {
        box.onclick = function() {
            const selectedColor = box.getAttribute('data-color');
            document.body.style.backgroundColor = selectedColor; // Set selected color as background
            document.body.style.backgroundImage = ''; // Clear any wallpaper image
        };
    });

    // Restart and Log Out buttons
    const restartBtn = document.getElementById('restart-button');
    const logoutBtn = document.getElementById('logout-button');

    // Handle the Restart button click
    restartBtn.onclick = function() {
        window.location.href = '../turn_on.html'; // Redirect to turn_on.html
    };

    // Handle the Log Out button click
    logoutBtn.onclick = function() {
        window.location.href = '../login/login.html'; // Adjust path if necessary
    };

    // Optional: Close the start menu if you click outside of it
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = startMenu.contains(event.target);
        const isClickOnHomeIcon = homeIcon.contains(event.target);

        // If the click is outside the menu and not on the home icon, hide the start menu
        if (!isClickInsideMenu && !isClickOnHomeIcon) {
            startMenu.classList.add('hidden');
        }
    });
}