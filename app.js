// Gets user's location using the Geolocation API
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

// Fetches weather data based on location (latitude & longitude or city name)
async function fetchWeatherData(location) {
    const apiKey = '9980285236c041bbb4c70015240809';
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

// Gets sunscreen recommendations based on skin type, UV index, and sensitivity
function getSunscreenRecommendation(skinType, uvIndex, isSensitive) {
    let spfRecommendation;

    // Simple logic for SPF recommendation based on UV index
    if (uvIndex <= 2) {
        spfRecommendation = 15;
    } else if (uvIndex <= 5) {
        spfRecommendation = 30;
    } else if (uvIndex <= 7) {
        spfRecommendation = 50;
    } else {
        spfRecommendation = '50+'; // Highest SPF for very high UV index
    }

    // List of sustainable sunscreens based on SPF, skin type, and sensitivity
    const sunscreens = [
        // SPF 15
        { brand: 'Cha Vohtz Age Defy+ Tinted DD Moisturiser', SPF: 15, skinType: 'dry', sensitive: false, url: 'https://www.greenpeople.co.uk/products/age-defy-tinted-dd-moisturiser-spf15-medium-30ml', description: 'Hydrates and protects dry skin with organic ingredients.' },
        { brand: 'IXORA Daily Defense Face Cream SPF15 For Oily Skin', SPF: 15, skinType: 'oily', sensitive: false, url: 'https://ixoraworld.com/products/ixora-organic-daily-defence-face-cream-spf15-oily-skin?srsltid=AfmBOorpI9kJklcRIbXSlgtYlMZ7mgnx4JdnuwZpraP6QxIGItw-rU90', description: 'Lightweight and non-greasy, suitable for oily skin.' },
        { brand: 'Neutrogena Oil-Free Face Moisturizer', SPF: 15, skinType: 'combination', sensitive: false, url: 'https://www.amazon.in/Neutrogena-Free-Facial-Moisturiser-115ml/dp/B006LXE5OC?th=1', description: 'Balances and protects combination skin.' },
        { brand: 'Green People Scent Free Facial Sun Cream SPF15', SPF: 15, skinType: 'dry', sensitive: true, url: 'https://www.greenpeople.co.uk/products/scent-free-facial-sun-cream-spf15-10ml', description: 'Gentle and hydrating, safe for sensitive skin.' },
        { brand: 'Himalaya Protective Sunscreen Lotion', SPF: 15, skinType: 'oily', sensitive: true, url: 'https://himalayawellness.in/products/protective-sunscreen-lotion?variant=30349174341731&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOop-DarDqUE9pHFONPNyrj6D1EO7emHyR5dcMx4RKPz-pUVdMGdXYOg', description: 'Provides protection without clogging pores or irritating sensitive skin.' },
        { brand: 'Simple Protecting Light Moisturiser', SPF: 15, skinType: 'combination', sensitive: true, url: 'https://www.simpleskincare.in/products/protecting-light-moisturiser-with-spf-15-125ml?srsltid=AfmBOoqIcoDVJQmkRwsN9ERglLj4QewaFUXi4rN604nIqCBggi_xrhoK', description: 'Gentle formulation for combination skin with sensitivity.' },
        
        // SPF 30
        { brand: 'FixDerma Shadow Sunscreen For Dry Skin', SPF: 30, skinType: 'dry', sensitive: false, url: 'https://www.fixderma.com/products/sunscreen-for-dry-skin-spf-30-cream?srsltid=AfmBOooCtWZIwBkMMZhB-ZFlv33YLVyF2PzM4QIXzsw5g-XMFSENX0_n', description: 'Moisturizing with natural ingredients for dry skin.' },
        { brand: 'Organic Harvest Organic SPF 30 Sunscreen for Oily Skin', SPF: 30, skinType: 'oily', sensitive: false, url: 'https://www.organicharvest.in/product/oily-skin-spf-30-sunscreen-kakadu-plum-acai-berry-chia-seeds-100g.html?srsltid=AfmBOooUk3cj1m1ertFtf6AtfhN0YzDx6VBTW3HqhG4nEIJrtfWNdm26', description: 'Oil-free and mattifying for oily skin.' },
        { brand: 'Minimalist SPF 30 Body Lotion', SPF: 30, skinType: 'combination', sensitive: false, url: 'https://beminimalist.co/products/spf-30-body-lotion?currency=INR&variant=41795629744289&utm_source=google&utm_medium=cpc&utm_campaign=Google%20Shopping&stkn=f4faea6d89b6&gad_source=1&gclid=CjwKCAjwuMC2BhA7EiwAmJKRrGeh48uERwuVORXDSx8HDukhDUTWawvmZw--KsN27D7cNY-FZVSVfRoCcfAQAvD_BwE', description: 'Balances and protects combination skin.' },
        { brand: 'Paula\'s Choice Ultra-Light Daily Hydrating Fluid', SPF: 30, skinType: 'dry', sensitive: true, url: 'https://www.paulaschoice.in/products/clear-ultra-light-daily-hydrating-fluid-spf-30?srsltid=AfmBOorbSkDyHmd0bSSf4MrcXR1_7Cjv1Khtxdvt9AqV46N3YouSVpjT', description: 'Hydrates and soothes dry and sensitive skin.' },
        { brand: 'DermaControl Oil Absorbing Moisturizer', SPF: 30, skinType: 'oily', sensitive: true, url: 'https://www.cetaphil.com/us/moisturizers/dermacontrol-oil-absorbing-moisturizer-spf-30/302994313044.html', description: 'Lightweight and non-irritating for oily and sensitive skin.' },
        { brand: 'Minimalist SPF 30 Body Lotion', SPF: 30, skinType: 'combination', sensitive: true, url: 'https://beminimalist.co/products/spf-30-body-lotion?currency=INR&variant=41795629744289&utm_source=google&utm_medium=cpc&utm_campaign=Google%20Shopping&stkn=f4faea6d89b6&gad_source=1&gclid=CjwKCAjwuMC2BhA7EiwAmJKRrGeh48uERwuVORXDSx8HDukhDUTWawvmZw--KsN27D7cNY-FZVSVfRoCcfAQAvD_BwE', description: 'Transparent, gentle on combination and sensitive skin.' },
        
        // SPF 50
        { brand: 'Rodan + Fields ESSENTIALS Face + Body Sunscreen Broad Spectrum', SPF: 50, skinType: 'dry', sensitive: false, url: 'https://www.rodanandfields.com/en-us/shop/essentials-face-body-sunscreen-broad-spectrum-spf-50/p/ESFB150?utm_source=pepperjam&utm_medium=affiliate&utm_campaign=21181&clickId=4838774903', description: 'Provides hydration and high protection for dry skin.' },
        { brand: 'Neutrogena Sheer Zinc® Dry-Touch Sunscreen', SPF: 50, skinType: 'oily', sensitive: false, url: 'https://www.neutrogena.com/products/sun/sheer-zinc-dry-touch-sunscreen-broad-spectrum-spf-50/6811080.html', description: 'Hydrating but non-greasy formula for oily skin.' },
        { brand: 'DermaCo 1% Hyaluronic Sunscreen Aqua Gel', SPF: 50, skinType: 'combination', sensitive: false, url: 'https://thedermaco.com/product/1-hyaluronic-sunscreen-aqua-gel?srsltid=AfmBOorsHDsqoxsbmk5vZyxEgz78LLgm4rckQK1ur0SbfvPUCAv1OMqD', description: 'Mattifying and suitable for combination skin.' },
        { brand: 'Coola Hydrating Sunscreen Lotion', SPF: 50, skinType: 'dry', sensitive: true, url: 'https://coola.com/products/classic-body-organic-sunscreen-lotion-spf-50-fragrance-free?_pos=7&_sid=438d1779f&_ss=r', description: 'Soothes and protects dry, sensitive skin.' },
        { brand: 'La Roche Posay Anthelios Mineral Zinc Oxide', SPF: 50, skinType: 'oily', sensitive: true, url: 'https://www.laroche-posay.us/our-products/sun/face-sunscreen/anthelios-mineral-zinc-oxide-sunscreen-spf-50-883140000907.html?srsltid=AfmBOoq8THyar70qFZpraRzxnmTCqS69XoprfD8DK5AixPPQfcAHDfXX', description: 'Lightweight, non-comedogenic for oily and sensitive skin.' },
        { brand: 'Ultrasun Photo Age Control Fluid Sensitive Skin', SPF: 50, skinType: 'combination', sensitive: true, url: 'https://ultrasun.in/products/ultrasun-photo-age-control-fluid-sunscreen-spf-50-for-sensitive-skin', description: 'Suitable for combination and sensitive skin.' },
        
        // SPF 50+
        { brand: 'Foxtale Dewy Finish Sunscreen', SPF: '50+', skinType: 'dry', sensitive: false, url: 'https://foxtale.in/products/spf-70-dewy-finish-sunscreen-v3?srsltid=AfmBOopkCsBMfrqwqyauPU29MIAogL3dtT2wyV4jYdD8FlCrUf_LFEei', description: 'High protection with hydration for dry skin.' },
        { brand: 'Foxtale Matte Finish Sunscreen', SPF: '50+', skinType: 'oily', sensitive: false, url: 'https://foxtale.in/collections/sunscreens/products/matte-finish-sunscreen', description: 'High SPF, oil-free protection.' },
        { brand: 'Foxtale Matte Finish Sunscreen', SPF: '50+', skinType: 'combination', sensitive: false, url: 'https://foxtale.in/collections/sunscreens/products/matte-finish-sunscreen', description: 'High SPF and mattifying for combination skin.' },
        { brand: 'Soulflower Herbal Broad Spectrum Sunscreen with Turmeric', SPF: '50+', skinType: 'dry', sensitive: true, url: 'https://www.amazon.in/Soulflower-Herbal-Spectrum-Sunscreen-Turmeric/dp/B07RD6PQX3?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A15APWRK6P7LBV', description: 'Extra gentle and moisturizing for sensitive skin.' },
        { brand: 'Organic Harvest Organic Oily Skin SPF 60 Sunscreen: Kakadu Plum, Acai Berry & Chia Seeds', SPF: '50+', skinType: 'oily', sensitive: true, url: 'https://www.organicharvest.in/product/sunscreen-oily-skin-spf-60-100-gm.html', description: 'High SPF with a dry-touch, non-greasy formula.' },
        { brand: 'Organic Harvest Organic All Skin SPF 60 Sunscreen: Kakadu Plum, Acai Berry & Chia Seeds', SPF: '50+', skinType: 'combination', sensitive: true, url: 'https://www.organicharvest.in/product/all-skin-spf-60-sunscreen-kakadu-plum-acai-berry-chia-seeds-100g.html', description: 'High SPF with a gentle formula for sensitive skin.' }
    ];

    // Filters suitable sunscreens by matching skin type, sensitivity, and recommended SPF
    const suitableSunscreens = sunscreens.filter(s => 
        s.skinType === skinType && 
        s.sensitive === isSensitive && 
        s.SPF === spfRecommendation
    );

    return {
        recommendation: `Use SPF ${spfRecommendation} sunscreen.`,
        suitableSunscreens
    };
}

// Updates sunscreen recommendations based on location, skin type, and sensitivity
async function updateSunscreenRecommendations(location) {
    const weatherData = await fetchWeatherData(location);
    const uvIndex = weatherData.current.uv;
    const skinType = document.getElementById('skin-type').value;
    const isSensitive = document.getElementById('sensitive-skin').checked;

    const { recommendation, suitableSunscreens } = getSunscreenRecommendation(skinType, uvIndex, isSensitive);

    const sunscreenOutput = document.getElementById('sunscreen-output');
    sunscreenOutput.innerHTML = `
        <p>Current UV Index: ${uvIndex}</p>
        <p>Sunscreen Recommendation: ${recommendation}</p>
        <ul>
            ${suitableSunscreens.map(s => `<li><a href="${s.url}" target="_blank">${s.brand} SPF ${s.SPF}</a>: ${s.description}</li>`).join('')}
        </ul>
    `;
}

// Handles form submission for sunscreen recommendations
document.getElementById('sunscreen-form').onsubmit = async (event) => {
    event.preventDefault();
    
    const cityName = document.getElementById('city-name').value.trim();
    let location;

    if (cityName) {
        location = { city: cityName };
    } else {
        try {
            const userLocation = await getUserLocation();
            location = userLocation;
        } catch (error) {
            alert("Could not get your current location. Please enter a city name.");
            return;
        }
    }

    updateSunscreenRecommendations(location);
};

// Event listener for "Use Current Location" button
document.getElementById('use-current-location').onclick = async () => {
    try {
        const userLocation = await getUserLocation();
        const weatherData = await fetchWeatherData(userLocation);
        const cityName = weatherData.location.name; 
        document.getElementById('city-name').value = cityName;
        updateSunscreenRecommendations(userLocation);
    } catch (error) {
        alert("Could not get your current location.");
    }
};