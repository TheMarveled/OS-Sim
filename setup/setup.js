window.onload = function() {
    const submitButton = document.getElementById('submit-username');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const guestButton = document.getElementById('guest-button');
    const alertModal = document.getElementById('alert-modal');
    const alertMessage = document.getElementById('alert-message');
    const closeAlertButton = document.getElementById('close-alert');
    let proceedToDesktop = false; // Flag to track if we should redirect

    // Function to show the custom alert
    function showAlert(message) {
        alertMessage.innerText = message;
        alertModal.classList.add('show');
    }

    // Hide alert and redirect if necessary
    closeAlertButton.onclick = function() {
        alertModal.classList.remove('show');
        if (proceedToDesktop) {
            window.location.href = '../desktop/desktop.html'; // Redirect to desktop after closing alert
        }
    };

    submitButton.onclick = function() {
        const username = usernameInput.value.trim(); // Trim to remove any unnecessary spaces
        const password = passwordInput.value.trim(); // Trim to remove any unnecessary spaces

        if (username === "") {
            showAlert('Please enter a username to proceed.'); // Alert message if username is missing
            proceedToDesktop = false; // Reset flag
        } else {
            // Allow submission if a username is provided (password is optional)
            showAlert(`Welcome, ${username}! Setup complete.`);
            proceedToDesktop = true; // Set flag to indicate successful setup
        }
    };

    guestButton.onclick = function() {
        // Handle guest registration
        showAlert('Welcome, Guest! Setup complete.');
        proceedToDesktop = true; // Set flag for guest registration
    };
};
