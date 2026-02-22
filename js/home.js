// Home page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load popular cars
    loadPopularCars();
    initRideCarousel();
    initStatsCounters();
    initParallaxBackgrounds();

    // Search form handler
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const selectedCar = document.getElementById('quick-fleet') ? document.getElementById('quick-fleet').value : '';
            const bookingDate = document.getElementById('quick-date') ? document.getElementById('quick-date').value : '';
            const bookingTime = document.getElementById('quick-time') ? document.getElementById('quick-time').value : '';
            const location = document.getElementById('quick-location') ? document.getElementById('quick-location').value.trim() : '';
            const phone = document.getElementById('quick-number') ? document.getElementById('quick-number').value.trim() : '';

            if (selectedCar && bookingDate && bookingTime && location && phone) {
                // Store search params in sessionStorage
                sessionStorage.setItem('searchCar', selectedCar);
                // Backward compatibility for existing listing page logic
                sessionStorage.setItem('searchCity', location);
                sessionStorage.setItem('searchPickupDate', bookingDate);
                sessionStorage.setItem('searchTime', bookingTime);
                sessionStorage.setItem('searchLocation', location);
                sessionStorage.setItem('searchPhone', phone);
                window.location.href = 'car-listing.html';
            } else {
                alert('Please fill all fields');
            }
        });
    }

    // Set minimum date to today
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
});

function initParallaxBackgrounds() {
    const parallaxItems = Array.from(document.querySelectorAll('.js-parallax-bg'));
    if (!parallaxItems.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobileView = window.matchMedia('(max-width: 767px)').matches;
    if (reduceMotion || mobileView) {
        parallaxItems.forEach((item) => {
            item.style.transform = 'translate3d(0,0,0) scale(1.06)';
        });
        return;
    }

    let ticking = false;

    const updateParallax = () => {
        parallaxItems.forEach((item) => {
            const parentSection = item.closest('.js-parallax-section');
            if (!parentSection) return;

            const rect = parentSection.getBoundingClientRect();
            if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

            const viewportCenter = window.innerHeight / 2;
            const sectionCenter = rect.top + (rect.height / 2);
            const distance = sectionCenter - viewportCenter;
            const offset = Math.max(Math.min(distance * -0.08, 56), -56);

            item.style.transform = `translate3d(0, ${offset}px, 0) scale(1.12)`;
        });

        ticking = false;
    };

    const requestParallaxUpdate = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    };

    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    window.addEventListener('resize', requestParallaxUpdate);
    requestParallaxUpdate();
}

function initRideCarousel() {
    const track = document.getElementById('ride-track');
    const prevBtn = document.getElementById('ride-prev');
    const nextBtn = document.getElementById('ride-next');
    if (!track || !prevBtn || !nextBtn) return;

    const getStep = () => {
        const card = track.querySelector('.ride-card');
        if (!card) return 320;
        const styles = window.getComputedStyle(track);
        const gap = parseFloat(styles.columnGap || styles.gap || '16');
        return card.getBoundingClientRect().width + gap;
    };

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: getStep(), behavior: 'smooth' });
    });
}

function initStatsCounters() {
    const counters = document.querySelectorAll('.stats-counter');
    if (!counters.length) return;

    const animateCounter = (el) => {
        const target = Number(el.dataset.target || 0);
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const startTime = performance.now();

        const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = `${value}${suffix}`;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = `${target}${suffix}`;
            }
        };

        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (!el.dataset.animated) {
                    el.dataset.animated = 'true';
                    animateCounter(el);
                }
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.45 });

    counters.forEach((counter) => observer.observe(counter));
}

function loadPopularCars() {
    const popularCarsContainer = document.getElementById('popular-cars');
    if (!popularCarsContainer) return;

    const escapeHtml = (value) => String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const readSpec = (car, keys) => {
        if (!car || typeof car !== 'object') return '';
        const specs = car.specs && typeof car.specs === 'object' ? car.specs : {};
        for (const key of keys) {
            if (specs[key]) return String(specs[key]).trim();
        }
        return '';
    };

    const getPassengers = (car) => {
        const value = car.passengers || car.seats || car.seatingCapacity || readSpec(car, ['Seating Capacity', 'Seat Capacity', 'Passengers']);
        return value ? String(value).trim() : '-';
    };

    const getSeats = (car) => {
        const value = car.seats || car.passengers || car.seatingCapacity || readSpec(car, ['Seating Capacity', 'Seat Capacity', 'Seats']);
        return value ? String(value).trim() : '-';
    };

    const getLuggage = (car) => {
        const value = car.luggage || car.baggage || readSpec(car, ['Luggage', 'Baggage', 'Boot Space', 'Payload']);
        return value ? String(value).trim() : '-';
    };

    let sourceCars = Array.isArray(carsData) ? carsData.slice() : [];

    try {
        const storedCars = JSON.parse(localStorage.getItem('adminCars') || '[]');
        if (Array.isArray(storedCars) && storedCars.length) {
            sourceCars = storedCars;
        }
    } catch (error) {}

    const explicitPopularCars = sourceCars.filter((car) => car && car.popularOnHome);
    const popularCars = (explicitPopularCars.length ? explicitPopularCars : sourceCars).slice(0, 4);

    popularCarsContainer.innerHTML = popularCars.map((car) => {
        const safeName = escapeHtml(car.name || 'Vehicle');
        const fuel = escapeHtml(car.fuel || '-');
        const passengers = escapeHtml(getPassengers(car));
        const seats = escapeHtml(getSeats(car));
        const luggage = escapeHtml(getLuggage(car));
        const rawPrice = Number(car.price || 0);
        const formattedPrice = Number.isFinite(rawPrice) && rawPrice > 0
            ? `Rs. ${rawPrice.toLocaleString()} / day`
            : 'Price On Request';
        const safeImage = escapeHtml(car.image || 'images/5.jpg');
        const detailLink = Number.isFinite(Number(car.id))
            ? `car-detail.html?id=${Number(car.id)}`
            : 'car-listing.html';

        return `
        <article class="popular-hover-card">
            <div class="popular-preview">
                <img src="${safeImage}" alt="${safeName}" class="popular-preview-image">
                <div class="popular-preview-ring"></div>
            </div>

            <div class="popular-content">
                <div class="popular-detail">
                    <span>${safeName}</span>
                    <div class="popular-mini-specs">
                        <small><i class="ri-group-line"></i>${passengers} Passengers</small>
                        <small><i class="ri-armchair-line"></i>${seats} Seats</small>
                        <small><i class="ri-suitcase-3-line"></i>${luggage} Luggage</small>
                        <small><i class="ri-gas-station-line"></i>${fuel}</small>
                    </div>
                    <p>${formattedPrice}</p>
                    <a href="${detailLink}" class="popular-btn">View</a>
                </div>
                <div class="popular-product-image">
                    <div class="popular-box-image">
                        <img src="${safeImage}" alt="${safeName}" class="popular-img-product">
                    </div>
                </div>
            </div>
        </article>
    `;
    }).join('');

    initPopularCarsSlider();
}

function initPopularCarsSlider() {
    const track = document.getElementById('popular-cars');
    const prevBtn = document.getElementById('popular-prev');
    const nextBtn = document.getElementById('popular-next');
    if (!track || !prevBtn || !nextBtn) return;

    const getStep = () => {
        const firstCard = track.querySelector('.popular-hover-card');
        if (!firstCard) return 320;
        const styles = window.getComputedStyle(track);
        const gap = parseInt(styles.columnGap || styles.gap || '24', 10);
        return firstCard.getBoundingClientRect().width + gap;
    };

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: getStep(), behavior: 'smooth' });
    });
}
