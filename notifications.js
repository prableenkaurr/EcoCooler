// Request permission to show notifications
function requestNotificationPermission() {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission !== 'granted') {
                console.error('Notification permission denied');
            } else {
                console.log('Notification permission granted');
            }
        }).catch(err => console.error('Permission request error:', err));
    } else {
        console.log('Notification permission already granted');
    }
}

// Show a browser notification
function showNotification(title, message) {
    if (Notification.permission === 'granted') {
        new Notification(title, {
            body: message,
            icon: 'path/to/icon.png' // Optional: add an icon path
        });
    } else {
        console.warn('Notification permission is not granted');
    }
}

// Function to set up notifications
function setupNotifications() {
    // Hydration reminder every 2 seconds
    setInterval(() => {
        showNotification('Hydration Reminder', 'It’s time to drink water. Stay hydrated!');
    }, 2000); // 2 seconds

    // Sunscreen reminder every 5 seconds
    setInterval(() => {
        showNotification('Sunscreen Reminder', 'Remember to reapply your sunscreen to protect your skin!');
    }, 5000); // 5 seconds

    // Sustainable tips every 10 seconds
    const tips = [
        'Wear light-colored clothing to stay cool.',
        'Use a fan or air conditioner wisely to reduce energy consumption.',
        'Opt for eco-friendly cooling products.'
    ];
    setInterval(() => {
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        showNotification('Sustainable Tip', randomTip);
    }, 10000); // 10 seconds
}

// Initialize notifications on page load
window.onload = () => {
    requestNotificationPermission();
    setupNotifications();
};
