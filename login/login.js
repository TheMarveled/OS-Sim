// login.js

window.onload = function() {
    const loginButton = document.getElementById('login-button');

    loginButton.onclick = function() {
        // Redirect to the desktop page after login
        window.location.href = '../desktop/desktop.html'; // Adjust path as needed
    };
};
