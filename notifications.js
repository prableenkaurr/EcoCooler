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

// Function to check for heat alerts, hydration reminders, and tips
function checkAlertsAndTips() {
    const temperature = 30; // Example temperature (in Celsius)
    const hydrationReminderInterval = 2000; // Every hour

    // Heat alert
    if (temperature > 35) {
        showNotification('Heat Alert', 'The temperature is very high. Stay hydrated and avoid going out during peak hours.');
    }

    // Hydration reminder
    setInterval(() => {
        showNotification('Hydration Reminder', 'It’s time to drink water. Stay hydrated!');
    }, hydrationReminderInterval);
}

// Function to display sustainable tips
function showSustainableTips() {
    const tips = [
        'Wear light-colored clothing to stay cool.',
        'Use a fan or air conditioner wisely to reduce energy consumption.',
        'Opt for eco-friendly cooling products.'
    ];

    const tipsOutput = document.getElementById('tips-output');
    tipsOutput.innerHTML = tips.map(tip => `<p>${tip}</p>`).join('');
}

// Initialize alerts, reminders, and tips on page load
window.onload = () => {
    requestNotificationPermission();
    checkAlertsAndTips();
    showSustainableTips();
};
