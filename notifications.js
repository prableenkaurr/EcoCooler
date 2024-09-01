// Request permission to show notifications
function requestNotificationPermission() {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted');
                setupNotifications(); // Start notifications only after permission is granted
            } else {
                console.error('Notification permission denied');
            }
        }).catch(err => console.error('Permission request error:', err));
    } else {
        console.log('Notification permission already granted');
        setupNotifications(); // Start notifications if already granted
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
    if (Notification.permission === 'granted') {
        // Hydration reminder every 20 seconds
        setInterval(() => {
            showNotification('Hydration Reminder', 'It’s time to drink water. Stay hydrated!');
        }, 20000); // 20 seconds

        // Sunscreen reminder every 30 seconds
        setInterval(() => {
            showNotification('Sunscreen Reminder', 'Remember to reapply your sunscreen to protect your skin!');
        }, 30000); // 30 seconds

        // Sustainable tips every 60 seconds
        const tips = [
            'Wear light-colored clothing to stay cool.',
            'Use a fan or air conditioner wisely to reduce energy consumption.',
            'Opt for eco-friendly cooling products.'
        ];
        setInterval(() => {
            const randomTip = tips[Math.floor(Math.random() * tips.length)];
            showNotification('Sustainable Tip', randomTip);
        }, 60000); // 60 seconds
    }
}

// Call `requestNotificationPermission` on button click
// (The button click should be present in your HTML)
// <button onclick="requestNotificationPermission()">Enable Notifications</button>
