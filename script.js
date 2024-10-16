// Display the modal when the page loads
window.onload = function() {
    const setupModal = document.getElementById('setup-modal');
    const greeting = document.getElementById('greeting'); // Reference to greeting message
    const submitButton = document.getElementById('submit-username');
    const usernameInput = document.getElementById('username');

    setupModal.style.display = 'flex'; // Show the setup modal

    // Function to handle submission
    const handleSubmit = function() {
        const username = usernameInput.value;
        if (username) {
            greeting.innerText = `Hey, ${username}!`; // Update greeting with username
            setupModal.style.display = 'none'; // Close the setup modal
            updateClock(); // Start updating the clock after the setup
        } else {
            alert('Please enter a username.'); // Prompt for input
        }
    };

    submitButton.onclick = handleSubmit;

    // Add event listener for the Enter key
    usernameInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            handleSubmit(); // Call the submission function
        }
    });

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
};
 