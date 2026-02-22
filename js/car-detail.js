// Car detail page functionality
let currentCar = null;
let currentImageIndex = 0;
let spin360Interval = null;
let is360Playing = false;

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = parseInt(urlParams.get('id'), 10);

    if (carId) {
        loadCarDetails(carId);
    } else {
        window.location.href = 'car-listing.html';
    }

    const prevBtn = document.getElementById('prev-image');
    const nextBtn = document.getElementById('next-image');
    const spin360Toggle = document.getElementById('spin-360-toggle');
    if (prevBtn) prevBtn.addEventListener('click', () => changeImage(-1, false));
    if (nextBtn) nextBtn.addEventListener('click', () => changeImage(1, false));
    if (spin360Toggle) {
        spin360Toggle.addEventListener('click', toggle360View);
    }

    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBooking);

        const pickupDate = document.getElementById('pickup-date');
        const returnDate = document.getElementById('return-date');
        const today = new Date().toISOString().split('T')[0];

        if (pickupDate) {
            pickupDate.setAttribute('min', today);
            pickupDate.addEventListener('change', updatePriceSummary);
        }

        if (returnDate) {
            returnDate.setAttribute('min', today);
            returnDate.addEventListener('change', updatePriceSummary);
        }
    }
});

function getCarImages() {
    if (!currentCar) return [];
    if (Array.isArray(currentCar.images) && currentCar.images.length > 0) {
        return currentCar.images;
    }
    return currentCar.image ? [currentCar.image] : [];
}

function getSpecIcon(label) {
    const key = String(label || '').toLowerCase();
    if (key.includes('seat')) return 'ri-user-3-line';
    if (key.includes('engine')) return 'ri-settings-3-line';
    if (key.includes('battery')) return 'ri-battery-2-charge-line';
    if (key.includes('mileage') || key.includes('range')) return 'ri-speed-up-line';
    if (key.includes('fuel')) return 'ri-gas-station-line';
    if (key.includes('boot')) return 'ri-suitcase-3-line';
    if (key.includes('payload')) return 'ri-briefcase-4-line';
    if (key.includes('charging')) return 'ri-flashlight-line';
    return 'ri-checkbox-circle-line';
}

function buildQuickStats(car) {
    if (!car || !car.specs) return [];

    const preferredLabels = ['Seating Capacity', 'Mileage', 'Range', 'Engine', 'Battery', 'Boot Space', 'Payload'];
    const usedKeys = new Set();
    const stats = [];

    preferredLabels.forEach((label) => {
        const matchedEntry = Object.entries(car.specs).find(([key]) => key.toLowerCase() === label.toLowerCase());
        if (matchedEntry && stats.length < 4) {
            usedKeys.add(matchedEntry[0]);
            stats.push(matchedEntry);
        }
    });

    if (stats.length < 4) {
        Object.entries(car.specs).forEach((entry) => {
            if (stats.length >= 4) return;
            if (!usedKeys.has(entry[0])) {
                stats.push(entry);
            }
        });
    }

    return stats.slice(0, 4);
}

function updateAvailabilityUI() {
    if (!currentCar) return;

    const isAvailable = !!currentCar.available;
    const availabilityStatus = document.getElementById('availability-status');
    const availabilityContainer = document.getElementById('availability-container');
    const heroAvailability = document.getElementById('hero-availability');
    const bookingSubmitBtn = document.querySelector('#booking-form button[type="submit"]');

    if (availabilityStatus) {
        availabilityStatus.textContent = isAvailable ? 'Available' : 'Unavailable';
    }

    if (availabilityContainer) {
        availabilityContainer.classList.toggle('is-unavailable', !isAvailable);
        const iconEl = availabilityContainer.querySelector('i');
        if (iconEl) {
            iconEl.className = isAvailable ? 'ri-checkbox-circle-line' : 'ri-close-circle-line';
        }
    }

    if (heroAvailability) {
        heroAvailability.classList.toggle('is-unavailable', !isAvailable);
        const iconEl = heroAvailability.querySelector('i');
        const textEl = heroAvailability.querySelector('span');
        if (iconEl) {
            iconEl.className = isAvailable ? 'ri-checkbox-circle-line' : 'ri-close-circle-line';
        }
        if (textEl) {
            textEl.textContent = isAvailable ? 'Available for booking' : 'Currently unavailable';
        }
    }

    if (bookingSubmitBtn) {
        bookingSubmitBtn.disabled = !isAvailable;
        bookingSubmitBtn.innerHTML = isAvailable
            ? '<i class="ri-calendar-check-line"></i>Book Now'
            : '<i class="ri-close-circle-line"></i>Unavailable';
    }
}

function loadCarDetails(carId) {
    currentCar = carsData.find((car) => car.id === carId);

    if (!currentCar) {
        window.location.href = 'car-listing.html';
        return;
    }

    document.title = `${currentCar.name} - PrimeTransit`;
    currentImageIndex = 0;

    const images = getCarImages();
    const mainImage = document.getElementById('main-image');
    if (mainImage && images.length > 0) {
        mainImage.src = images[0];
        mainImage.alt = currentCar.name;
    }

    const thumbnailGallery = document.getElementById('thumbnail-gallery');
    if (thumbnailGallery) {
        thumbnailGallery.innerHTML = images.map((img, index) => `
            <img
                src="${img}"
                alt="${currentCar.name}"
                class="car-thumb-item ${index === 0 ? 'active' : ''}"
                onclick="selectImage(${index})"
            >
        `).join('');
    }

    const carName = document.getElementById('car-name');
    if (carName) carName.textContent = currentCar.name;

    const carType = document.getElementById('car-type');
    if (carType) carType.textContent = currentCar.type;

    const carTransmission = document.getElementById('car-transmission');
    if (carTransmission) carTransmission.textContent = currentCar.transmission;

    const carFuel = document.getElementById('car-fuel');
    if (carFuel) carFuel.textContent = currentCar.fuel;

    const carDescription = document.getElementById('car-description');
    if (carDescription) carDescription.textContent = currentCar.description;

    const carNameHero = document.getElementById('car-name-hero');
    if (carNameHero) carNameHero.textContent = currentCar.name;

    const carDescriptionHero = document.getElementById('car-description-hero');
    if (carDescriptionHero) carDescriptionHero.textContent = currentCar.description;

    const heroType = document.getElementById('hero-type');
    if (heroType) heroType.innerHTML = `<i class="ri-car-line"></i>${currentCar.type}`;

    const heroTransmission = document.getElementById('hero-transmission');
    if (heroTransmission) heroTransmission.innerHTML = `<i class="ri-settings-3-line"></i>${currentCar.transmission}`;

    const heroFuel = document.getElementById('hero-fuel');
    if (heroFuel) heroFuel.innerHTML = `<i class="ri-gas-station-line"></i>${currentCar.fuel}`;

    const carPrice = document.getElementById('car-price');
    if (carPrice) carPrice.textContent = currentCar.price.toLocaleString();

    const heroPrice = document.getElementById('hero-price');
    if (heroPrice) heroPrice.textContent = currentCar.price.toLocaleString();

    updateAvailabilityUI();

    const quickStats = document.getElementById('car-quick-stats');
    if (quickStats) {
        quickStats.innerHTML = buildQuickStats(currentCar).map(([label, value]) => `
            <div class="car-quick-stat">
                <span><i class="${getSpecIcon(label)}"></i>${label}</span>
                <strong>${value}</strong>
            </div>
        `).join('');
    }

    const carFeatures = document.getElementById('car-features');
    if (carFeatures && currentCar.features) {
        carFeatures.innerHTML = currentCar.features.map((feature) => `
            <div class="car-feature-item">
                <span><i class="ri-check-line"></i></span>
                <p>${feature}</p>
            </div>
        `).join('');
    }

    const carSpecs = document.getElementById('car-specs');
    if (carSpecs && currentCar.specs) {
        carSpecs.innerHTML = Object.entries(currentCar.specs).map(([key, value]) => `
            <div class="car-spec-row">
                <span><i class="${getSpecIcon(key)}"></i>${key}</span>
                <strong>${value}</strong>
            </div>
        `).join('');
    }

    updatePriceSummary();
    stop360View();
    update360Button();
}

window.selectImage = function(index) {
    const images = getCarImages();
    if (!images.length) return;

    currentImageIndex = index;
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('#thumbnail-gallery img');

    if (mainImage) {
        mainImage.src = images[index];
        mainImage.alt = `${currentCar.name} view ${index + 1}`;
    }

    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
};

function changeImage(direction, from360 = false) {
    const images = getCarImages();
    if (!images.length) return;

    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }

    selectImage(currentImageIndex);
    if (!from360) {
        stop360View();
        update360Button();
    }
}

function toggle360View() {
    if (is360Playing) {
        stop360View();
    } else {
        start360View();
    }
    update360Button();
}

function start360View() {
    const images = getCarImages();
    if (images.length < 2) return;

    stop360View();
    is360Playing = true;
    spin360Interval = setInterval(() => {
        changeImage(1, true);
    }, 450);
}

function stop360View() {
    if (spin360Interval) {
        clearInterval(spin360Interval);
        spin360Interval = null;
    }
    is360Playing = false;
}

function update360Button() {
    const spin360Toggle = document.getElementById('spin-360-toggle');
    if (!spin360Toggle) return;

    const images = getCarImages();
    const canPlay = images.length > 1;

    spin360Toggle.disabled = !canPlay;
    spin360Toggle.classList.toggle('is-active', is360Playing);
    spin360Toggle.innerHTML = is360Playing
        ? '<i class="ri-pause-circle-line"></i>Stop 360'
        : '<i class="ri-360-view"></i>360 View';
}

function updatePriceSummary() {
    if (!currentCar) return;

    const pickupDate = document.getElementById('pickup-date');
    const returnDate = document.getElementById('return-date');
    const summaryPrice = document.getElementById('summary-price');
    const summaryDays = document.getElementById('summary-days');
    const summaryTax = document.getElementById('summary-tax');
    const summaryTotal = document.getElementById('summary-total');

    if (!pickupDate || !returnDate || !summaryPrice) return;

    const pickup = new Date(pickupDate.value);
    const returnD = new Date(returnDate.value);

    if (pickupDate.value && returnDate.value && returnD > pickup) {
        const days = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));
        const pricePerDay = currentCar.price;
        const subtotal = days * pricePerDay;
        const tax = subtotal * 0.18;
        const total = subtotal + tax;

        summaryPrice.textContent = pricePerDay.toLocaleString();
        if (summaryDays) summaryDays.textContent = days;
        if (summaryTax) summaryTax.textContent = Math.round(tax).toLocaleString();
        if (summaryTotal) summaryTotal.textContent = Math.round(total).toLocaleString();
    } else {
        summaryPrice.textContent = currentCar.price.toLocaleString();
        if (summaryDays) summaryDays.textContent = '0';
        if (summaryTax) summaryTax.textContent = '0';
        if (summaryTotal) summaryTotal.textContent = '0';
    }
}

function handleBooking(e) {
    e.preventDefault();

    if (!currentCar || !currentCar.available) {
        alert('This car is currently unavailable.');
        return;
    }

    const pickupDateEl = document.getElementById('pickup-date');
    const returnDateEl = document.getElementById('return-date');
    const pickupLocationEl = document.getElementById('pickup-location');
    const pickupDate = pickupDateEl ? pickupDateEl.value : '';
    const returnDate = returnDateEl ? returnDateEl.value : '';
    const pickupLocation = pickupLocationEl ? pickupLocationEl.value : '';

    if (!pickupDate || !returnDate || !pickupLocation) {
        alert('Please fill all fields.');
        return;
    }

    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    if (returnD <= pickup) {
        alert('Return date must be after pickup date.');
        return;
    }

    const days = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));
    const subtotal = days * currentCar.price;
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    const bookingDetails = {
        carId: currentCar.id,
        carName: currentCar.name,
        pickupDate,
        returnDate,
        pickupLocation,
        days,
        pricePerDay: currentCar.price,
        subtotal,
        tax,
        total
    };

    void bookingDetails;
    alert(`Booking successful!\n\nCar: ${currentCar.name}\nPickup: ${pickupDate}\nReturn: ${returnDate}\nLocation: ${pickupLocation}\nTotal: Rs ${Math.round(total).toLocaleString()}\n\nYou will receive a confirmation email shortly.`);
}
