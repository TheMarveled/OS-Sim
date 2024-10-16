// setup.js

window.onload = function() {
    const submitButton = document.getElementById('submit-username');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    submitButton.onclick = function() {
        // Handle username and password submission without storing
        alert(`Welcome, ${usernameInput.value}! Setup complete.`); // Temporary alert for demonstration

        // Redirect to the desktop page after setup
        window.location.href = '../desktop/desktop.html'; // Adjust path as needed
    };
};

