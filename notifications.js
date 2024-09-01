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

// Show a browser notification and add it to the record
function showNotification(title, message) {
    if (Notification.permission === 'granted') {
        // Create and display the browser notification
        new Notification(title, {
            body: message,
            icon: 'path/to/icon.png' // Optional: add an icon path
        });

        // Add the notification to the record
        addNotificationToRecord(title, message);
    } else {
        console.warn('Notification permission is not granted');
    }
}

// Add notification to the record in the HTML
function addNotificationToRecord(title, message) {
    const notificationsOutput = document.getElementById('notifications-output');
    const notificationDiv = document.createElement('div');
    notificationDiv.className = 'notification';
    notificationDiv.innerHTML = `
        <strong>${title}</strong>
        <time>${new Date().toLocaleString()}</time>
        <p>${message}</p>
    `;
    // Prepend new notifications to show the latest at the top
    notificationsOutput.prepend(notificationDiv);
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
