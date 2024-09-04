// Request permission to show notifications
function requestNotificationPermission() {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted');
                setupNotifications(); // Start notifications only after permission is granted
                initializeLocation(); // Fetch location once permission is granted
            } else {
                console.error('Notification permission denied');
            }
        }).catch(err => console.error('Permission request error:', err));
    } else {
        console.log('Notification permission already granted');
        initializeLocation(); // Fetch location if permission is already granted
        setupNotifications(); // Start notifications if already granted
    }
}

function showNotification(title, message) {
    if (Notification.permission === 'granted') {
        // Create and display the browser notification
        new Notification(title, {
            body: message,
            icon: '/Users/prableenkakar/Downloads/SunShieldLogo'
        });

        // Add the notification to the record in the HTML
        addNotificationToRecord(title, message);
    } else {
        console.warn('Notification permission is not granted');
    }
}


// Add the notification to the record in the HTML
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
    // Simulate a strong weather alert for testing
    data.alert = {
        type: 'storm', // Simulate a storm alert
        description: 'A severe storm is approaching your area. Please take shelter immediately.'
    };

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
        'Opt for programmable thermostats to optimize energy use.',
        'Use energy-efficient appliances to reduce electricity consumption.',
        'Install weather stripping on doors and windows to prevent heat loss.',
        'Consider planting trees around your home to provide natural shade.',
        'Switch to a renewable energy provider if available.',
        'Use low-flow fixtures to reduce water usage.',
        'Support local farmers to reduce the carbon footprint of your food.',
        'Participate in local recycling programs to minimize waste.',
        'Reduce single-use plastics by switching to reusable options.',
        'Opt for organic and sustainable clothing brands.',
        'Implement composting to reduce kitchen waste.',
        'Encourage carpooling to reduce transportation emissions.',
        'Use public transportation whenever possible to reduce your carbon footprint.',
        'Regularly service your car to ensure it runs efficiently and emits less pollution.',
        'Install a rain garden to manage stormwater runoff sustainably.',
        'Choose eco-friendly cleaning products to reduce indoor air pollution.',
        'Educate others about the importance of sustainability.',
        'Buy products with minimal packaging to reduce waste.',
        'Participate in community clean-up events to improve local environments.',
        'Opt for second-hand goods to reduce demand for new products.',
        'Use natural pest control methods to avoid harmful chemicals.',
        'Install solar panels to generate your own clean energy.',
        'Choose energy-efficient windows to improve insulation.',
        'Reduce meat consumption to lower your environmental impact.',
        'Support businesses that practice sustainable sourcing.',
        'Reduce food waste by planning meals and storing food properly.',
        'Use a clothesline instead of a dryer to save energy.',
        'Practice mindful consumption to avoid unnecessary purchases.',
        'Invest in energy-efficient home improvements like insulation and HVAC systems.',
        'Avoid using disposable cutlery and plates by opting for reusable alternatives.',
        'Support renewable energy initiatives in your community.',
        'Reduce water consumption by fixing leaks promptly.',
        'Consider green roofs to improve building insulation and reduce runoff.',
        'Opt for sustainable transportation methods such as biking or walking.',
        'Educate yourself about eco-friendly materials and products.',
        'Choose certified sustainable seafood to protect marine environments.',
        'Participate in tree-planting programs to offset carbon emissions.',
        'Use energy-efficient lighting solutions like LEDs.',
        'Practice zero-waste principles to minimize environmental impact.',
        'Support local artisans and businesses to reduce shipping emissions.',
        'Make use of community gardens to grow your own food sustainably.',
        'Opt for paperless billing and digital documents to reduce paper waste.',
        'Encourage others to reduce, reuse, and recycle.',
        'Select furniture made from sustainable materials.',
        'Use eco-friendly paints and finishes in your home.',
        'Engage in water conservation practices like taking shorter showers.',
        'Participate in local sustainability workshops and events.',
        'Adopt a minimalist lifestyle to reduce resource consumption.',
        'Reduce air conditioning usage by using natural ventilation.',
        'Choose products with eco-labels to ensure they meet sustainability standards.',
        'Promote biodiversity by creating habitats for local wildlife.',
        'Opt for energy-efficient cooking methods like pressure cooking.',
        'Encourage sustainable practices in your workplace.',
        'Support initiatives aimed at reducing plastic pollution.',
        'Use biodegradable or compostable products when possible.',
        'Opt for sustainable paper products made from recycled materials.',
        'Reduce car idling to save fuel and reduce emissions.',
        'Participate in sustainable fashion by supporting ethical brands.',
        'Use natural cleaning agents to reduce chemical exposure.',
        'Promote energy conservation by educating others on best practices.',
        'Install smart home devices to optimize energy use.',
        'Choose sustainably sourced coffee and tea.',
        'Support wildlife conservation efforts through donations or volunteering.',
        'Engage in water-saving practices like collecting rainwater for irrigation.',
        'Advocate for sustainable policies and practices in your community.',
        'Utilize eco-friendly gardening practices to reduce environmental impact.',
        'Switch to electric or hybrid vehicles to reduce emissions.',
        'Practice energy conservation by unplugging unused electronics.',
        'Promote sustainable tourism practices when traveling.',
        'Use eco-friendly personal care products to reduce environmental impact.',
        'Participate in environmental advocacy and awareness campaigns.',
        'Consider adopting a plant-based diet to reduce environmental impact.',
        'Practice responsible disposal of hazardous materials.',
        'Support companies with transparent sustainability practices.',
        'Use natural insulation materials to improve home energy efficiency.'
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
        // Hydration reminder every 1 hour
        setInterval(() => {
            showNotification('Hydration Reminder', 'It’s time to drink water. Stay hydrated!');
        }, 20000); // 20 seconds for testing

        // Sunscreen reminder every 2 hours
        setInterval(() => {
            showNotification('Sunscreen Reminder', 'Remember to reapply your sunscreen to protect your skin!');
        }, 40000); // 40 seconds for testing

        // Sustainability/Weather tip every 3 hours
        setInterval(fetchAndDisplayWeatherData, 60000); // 60 seconds
    }
}

// Start by requesting notification permission
requestNotificationPermission();
