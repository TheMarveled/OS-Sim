window.onload = function() {
    const greeting = document.getElementById('greeting');
    const clock = document.getElementById('clock');

    // Display greeting message from local storage
    const username = localStorage.getItem('username');
    if (username) {
        greeting.innerText = `Hey, ${username}!`;
    }

    // Function to update the clock every second
    function updateClock() {
        setInterval(() => {
            const now = new Date();
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            clock.innerText = now.toLocaleTimeString('en-GB', options);
        }, 1000);
    }

    updateClock(); // Start updating the clock
};
