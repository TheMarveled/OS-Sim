window.onload = function() {
    const submitButton = document.getElementById('submit-username');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const guestButton = document.getElementById('guest-button');

    submitButton.onclick = function() {
        // Handle username and password submission without storing
        alert(`Welcome, ${usernameInput.value}! Setup complete.`); // Temporary alert for demonstration

        // Redirect to the desktop page after setup
        window.location.href = '../desktop/desktop.html'; // Adjust path as needed
    };

    guestButton.onclick = function() {
        // Handle guest registration
        alert(`Welcome, Guest! Setup complete.`); // Temporary alert for demonstration

        // Redirect to the desktop page after guest registration
        window.location.href = '../desktop/desktop.html'; // Adjust path as needed
    };
};
