// Request permission to show notifications
function requestNotificationPermission() {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted');
                initializeLocation(); // Fetch location once permission is granted
            } else {
                console.error('Notification permission denied');
            }
        }).catch(err => console.error('Permission request error:', err));
    } else {
        console.log('Notification permission already granted');
        initializeLocation(); // Fetch location if permission is already granted
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

// Fetch weather data based on location (latitude & longitude or city name)
async function fetchWeatherData(location) {
    const apiKey = '78538db3899e42e29fa190912242508'; // Replace with your actual API key
    let url;

    if (location.latitude && location.longitude) {
        url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location.latitude},${location.longitude}`;
    } else {
        const city = encodeURIComponent(location.city);
        url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Generate tips based on weather data
function generateSustainabilityTip(weatherData) {
    const { temp_c: temp, humidity, condition, alert } = weatherData.current;
    const weatherCondition = condition.text.toLowerCase();
    let tip = '';

    // Weather-based tips
    if (temp > 30) { // Hot weather
        tip = `It's currently very hot. Stay cool by using eco-friendly cooling products and drink plenty of water.`;
    } else if (temp < 0) { // Cold weather
        tip = `It's freezing outside. Conserve energy by wearing warm clothing and using energy-efficient heating solutions.`;
    } else if (humidity > 70) { // High humidity
        tip = `With high humidity today, use dehumidifiers wisely to prevent mold growth and conserve energy.`;
    } else if (weatherCondition.includes('rain')) { // Rainy weather
        tip = `It's raining right now. Use rainwater harvesting systems to reduce water waste.`;
    } else if (weatherCondition.includes('sunny')) { // Sunny weather
        tip = `It's sunny outside. Consider using solar energy solutions for your power needs.`;
    } else if (weatherCondition.includes('wind')) { // Windy weather
        tip = `It's quite windy today. Secure outdoor items and use wind power for energy needs if possible.`;
    } else if (weatherCondition.includes('snow')) { // Snowy weather
        tip = `It's snowing right now. Maintain your heating system to ensure efficient energy use during snowy conditions.`;
    } else if (weatherCondition.includes('fog')) { // Foggy weather
        tip = `It's foggy outside. Ensure your vehicle uses low-energy fog lights and reduce driving to save energy.`;
    } else if (weatherCondition.includes('cloudy')) { // Cloudy weather
        tip = `It's cloudy today. Use daylight to reduce artificial lighting and consider using energy-efficient bulbs.`;
    } else if (weatherCondition.includes('clear')) { // Clear weather
        tip = `It's clear outside. Maximize natural light to reduce electricity usage during clear days.`;
    } else { // Default tip for other conditions
        tip = 'Choose sustainable practices to minimize your environmental impact.';
    }

    // Strong weather alerts
    if (alert && alert.type) {
        switch (alert.type.toLowerCase()) {
            case 'heat':
                tip = 'Heat alert: Stay hydrated, avoid excessive sun exposure, and use cooling systems wisely.';
                break;
            case 'storm':
                tip = 'Storm alert: Secure outdoor items, stay indoors, and follow local safety guidelines.';
                break;
            case 'flood':
                tip = 'Flood alert: Avoid driving through flooded areas, and stay informed about evacuation procedures.';
                break;
            case 'wind':
                tip = 'Wind alert: Secure loose items and avoid outdoor activities that could be hazardous.';
                break;
            default:
                tip = 'Be aware of local weather alerts and take appropriate precautions.';
                break;
        }
    }

    // Additional specific and diverse tips
    const specificTips = [
        // (Your list of specific tips here)
    ];

    // Choose a tip
    const useWeatherBasedTip = Math.random() < 0.5; // 50% chance to use weather-based tip
    if (useWeatherBasedTip) {
        return tip; // Return weather-based tip
    } else {
        const randomTip = specificTips[Math.floor(Math.random() * specificTips.length)];
        return randomTip; // Return specific random tip
    }
}

// Get user's location using the Geolocation API
async function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }),
                (error) => reject(error)
            );
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}

// Fetch and display sustainability tips and weather alerts
async function fetchAndDisplayWeatherData() {
    if (userLocation) {
        try {
            const weatherData = await fetchWeatherData(userLocation);
            const tip = generateSustainabilityTip(weatherData);
            showNotification('Sustainability Tip', tip);

            if (weatherData.alert && weatherData.alert.type) {
                let alertMessage = '';
                switch (weatherData.alert.type.toLowerCase()) {
                    case 'heat':
                        alertMessage = 'Heat alert: Stay hydrated, avoid excessive sun exposure, and use cooling systems wisely.';
                        break;
                    case 'storm':
                        alertMessage = 'Storm alert: Secure outdoor items, stay indoors, and follow local safety guidelines.';
                        break;
                    case 'flood':
                        alertMessage = 'Flood alert: Avoid driving through flooded areas, and stay informed about evacuation procedures.';
                        break;
                    case 'wind':
                        alertMessage = 'Wind alert: Secure loose items and avoid outdoor activities that could be hazardous.';
                        break;
                    default:
                        alertMessage = 'Be aware of local weather alerts and take appropriate precautions.';
                        break;
                }
                showNotification('Weather Alert', alertMessage);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }
}

// Initialize notifications and fetch location
async function initializeLocation() {
    try {
        userLocation = await getUserLocation();

        // Start notifications setup
        setupNotifications();
    } catch (error) {
        console.error('Error initializing location:', error);
    }
}

// Setup notifications and intervals
function setupNotifications() {
    if (Notification.permission === 'granted') {
        // Hydration reminder every 2 seconds
        setInterval(() => {
            showNotification('Hydration Reminder', 'It’s time to drink water. Stay hydrated!');
        }, 2000); // 2 seconds

        // Sunscreen reminder every 5 seconds
        setInterval(() => {
            showNotification('Sunscreen Reminder', 'Remember to reapply your sunscreen to protect your skin!');
        }, 5000); // 5 seconds

        // Sustainability tip every 5 seconds
        setInterval(fetchAndDisplayWeatherData, 5000); // 5 seconds

        // Strong weather alerts check every 10 seconds
        setInterval(fetchAndDisplayWeatherData, 10000); // 10 seconds
    }
}

// Start by requesting notification permission
requestNotificationPermission();
