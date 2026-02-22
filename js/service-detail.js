(function () {
    const SERVICE_META = {
        'self-drive': { label: 'Orlando Airport Transportation', sectionId: 'service-airport-transfer' },
        'with-driver': { label: 'Walt Disney World Transportation', sectionId: 'service-with-driver' },
        'airport-transfer': { label: 'Universal Orlando Transportation', sectionId: 'service-family-car' },
        'luxury-car': { label: 'Port Canaveral Cruise Transportation', sectionId: 'detail-daily-car-rental' },
        'family-car': { label: 'Corporate Transportation', sectionId: 'detail-corporate-rentals' }
    };

    const CARS = [
        {
            slug: 'swift-hatch', service: 'self-drive',
            title: 'Swift Hatch Premium', subtitle: 'Compact and budget-friendly city drive',
            image: 'images/1.jpg', price: 'Rs. 1499', plan: 'Per day, 250 km limit',
            transmission: 'Manual', fuel: 'Petrol', seats: '5 Seats', baggage: '2 Bags',
            description: 'A practical city transportation option for short routes with smooth handling and strong fuel efficiency.',
            highlights: ['Fast pickup process', 'Low refundable security', '24x7 roadside support'],
            includes: ['Basic insurance cover', 'Sanitized delivery', 'Pollution and paperwork included'],
            bestFor: ['Daily city usage', 'Couple trips', 'Student travel']
        },
        {
            slug: 'i20-sportz', service: 'self-drive',
            title: 'Hyundai i20 Sportz', subtitle: 'Premium hatchback with smooth automatic drive',
            image: 'images/3.jpg', price: 'Rs. 1899', plan: 'Per day, 250 km limit',
            transmission: 'Automatic', fuel: 'Petrol', seats: '5 Seats', baggage: '2 Bags',
            description: 'Premium hatch with feature-rich cabin and refined automatic transmission, ideal for daily and weekend transportation plans.',
            highlights: ['Automatic convenience', 'Rear camera and sensors', 'Balanced highway stability'],
            includes: ['Basic insurance cover', 'Free first fuel top-up', '24x7 call support'],
            bestFor: ['Office commute', 'Weekend getaways', 'Beginner drivers']
        },
        {
            slug: 'sonet-turbo', service: 'self-drive',
            title: 'Kia Sonet Turbo', subtitle: 'Performance-focused compact SUV',
            image: 'images/5.jpg', price: 'Rs. 2399', plan: 'Per day, 300 km limit',
            transmission: 'Automatic', fuel: 'Turbo Petrol', seats: '5 Seats', baggage: '3 Bags',
            description: 'A high-value compact SUV for travelers who want extra power, ground clearance, and modern connected features.',
            highlights: ['Turbo engine response', 'Cruise control', 'Premium interior finish'],
            includes: ['Comprehensive insurance add-on option', 'Roadside assistance', 'Fast document verification'],
            bestFor: ['Highway routes', 'Friends road trips', 'Premium transportation users']
        },

        {
            slug: 'honda-city-exec', service: 'with-driver',
            title: 'Honda City Executive', subtitle: 'Business sedan with chauffeur service',
            image: 'images/2.jpg', price: 'Rs. 2299', plan: '8 hours / 80 km package',
            transmission: 'Automatic', fuel: 'Petrol', seats: '5 Seats', baggage: '3 Bags',
            description: 'Professional chauffeur-driven sedan package suited for meetings and executive city movement.',
            highlights: ['Verified professional driver', 'On-time pickup commitment', 'Corporate billing support'],
            includes: ['Driver allowance included', 'Fuel included in base package', 'Toll and parking on actuals'],
            bestFor: ['Corporate meetings', 'VIP pickups', 'One-day city schedules']
        },
        {
            slug: 'innova-crysta-tour', service: 'with-driver',
            title: 'Innova Crysta Tour', subtitle: 'Most trusted chauffeur MPV option',
            image: 'images/4.jpg', price: 'Rs. 3199', plan: '8 hours / 80 km package',
            transmission: 'Manual', fuel: 'Diesel', seats: '7 Seats', baggage: '5 Bags',
            description: 'Large and comfortable chauffeur car for team transport, airport runs, and long-distance travel.',
            highlights: ['Spacious third-row seating', 'Highway comfort', 'Experienced outstation drivers'],
            includes: ['Driver and fuel in package', 'Cleaned before every trip', 'Emergency replacement support'],
            bestFor: ['Family functions', 'Airport group transfers', 'Corporate teams']
        },
        {
            slug: 'hector-plus-chauffeur', service: 'with-driver',
            title: 'MG Hector Plus Chauffeur', subtitle: 'Premium SUV chauffeur package',
            image: 'images/6.jpg', price: 'Rs. 3699', plan: '8 hours / 80 km package',
            transmission: 'Automatic', fuel: 'Petrol', seats: '6 Seats', baggage: '4 Bags',
            description: 'Luxury-oriented chauffeur SUV with superior cabin comfort and road presence for premium users.',
            highlights: ['Premium captain seats', 'Quiet cabin ride', 'Dedicated senior driver pool'],
            includes: ['Driver and fuel included', 'On-demand Wi-Fi', 'Priority support line'],
            bestFor: ['Executive movement', 'Guest transport', 'Event duty']
        },

        {
            slug: 'etios-airport', service: 'airport-transfer',
            title: 'Etios Airport Sedan', subtitle: 'Affordable and dependable airport transfer',
            image: 'images/8.jpg', price: 'Rs. 1299', plan: 'One-way airport transfer',
            transmission: 'Manual', fuel: 'Petrol', seats: '4 Seats', baggage: '2 Bags',
            description: 'Reliable one-way airport package with clean car, verified driver, and waiting support.',
            highlights: ['Live flight tracking', 'Meet-and-greet option', 'No surge at booking time'],
            includes: ['Driver and fuel included', '1 hour waiting', 'Toll included for airport route'],
            bestFor: ['Solo traveler', 'Couples', 'Budget airport ride']
        },
        {
            slug: 'innova-airport-assist', service: 'airport-transfer',
            title: 'Innova Airport Assist', subtitle: 'Group airport transfer with luggage comfort',
            image: 'images/9.jpg', price: 'Rs. 1999', plan: 'One-way airport transfer',
            transmission: 'Manual', fuel: 'Diesel', seats: '7 Seats', baggage: '5 Bags',
            description: 'Most practical airport transfer for families and small teams carrying extra baggage.',
            highlights: ['Large boot area', 'Flight delay support', 'Family-friendly seating'],
            includes: ['Driver and fuel included', '90 minutes waiting', 'Pickup signboard on request'],
            bestFor: ['Family airport drop', 'Team airport pickup', 'Extra luggage trips']
        },
        {
            slug: 'mercedes-airport-elite', service: 'airport-transfer',
            title: 'Mercedes E-Class Elite', subtitle: 'VIP airport transfer experience',
            image: 'images/5.jpg', price: 'Rs. 4999', plan: 'One-way premium transfer',
            transmission: 'Automatic', fuel: 'Petrol', seats: '4 Seats', baggage: '3 Bags',
            description: 'Luxury airport transfer with executive-grade chauffeur experience for high-priority guests.',
            highlights: ['Luxury interior comfort', 'Executive chauffeur', 'Priority dispatch team'],
            includes: ['Driver and fuel included', 'Premium meet-and-greet', 'Priority customer support'],
            bestFor: ['VIP guests', 'Business leaders', 'Special occasion pickup']
        },

        {
            slug: 'mercedes-e-signature', service: 'luxury-car',
            title: 'Mercedes E-Class Signature', subtitle: 'Refined executive luxury sedan',
            image: 'images/5.jpg', price: 'Rs. 6499', plan: 'Per day, 250 km limit',
            transmission: 'Automatic', fuel: 'Petrol', seats: '4 Seats', baggage: '3 Bags',
            description: 'A premium executive sedan designed for elite travel with best-in-class ride comfort and luxury interior finish.',
            highlights: ['Premium leather interior', 'Chauffeur-ready configuration', 'Smooth long-distance comfort'],
            includes: ['Premium support line', 'Vehicle sanitization', 'Optional onboard refreshments'],
            bestFor: ['VIP movement', 'Executive airport runs', 'Luxury event travel']
        },
        {
            slug: 'bmw-5-luxe', service: 'luxury-car',
            title: 'BMW 5 Series Luxe', subtitle: 'Sport-luxury performance sedan',
            image: 'images/6.jpg', price: 'Rs. 6999', plan: 'Per day, 250 km limit',
            transmission: 'Automatic', fuel: 'Petrol', seats: '4 Seats', baggage: '3 Bags',
            description: 'A powerful and elegant luxury sedan combining business-class comfort with driver-focused performance.',
            highlights: ['Sport and comfort drive modes', 'Ambient cabin lighting', 'Premium rear-seat comfort'],
            includes: ['Premium support line', 'Dedicated booking manager', 'Priority maintenance backup'],
            bestFor: ['Business leaders', 'Premium city tours', 'Corporate luxury bookings']
        },
        {
            slug: 'audi-a6-prestige', service: 'luxury-car',
            title: 'Audi A6 Prestige', subtitle: 'Elegant luxury business sedan',
            image: 'images/9.jpg', price: 'Rs. 6799', plan: 'Per day, 250 km limit',
            transmission: 'Automatic', fuel: 'Petrol', seats: '4 Seats', baggage: '3 Bags',
            description: 'Luxury sedan package focused on understated elegance, comfort, and executive-grade travel presence.',
            highlights: ['Quiet premium cabin', 'Executive infotainment setup', 'Balanced highway comfort'],
            includes: ['Premium support line', 'Cleaned before dispatch', 'Optional concierge service'],
            bestFor: ['Executive meetings', 'Guest protocols', 'Wedding VIP transport']
        },

        {
            slug: 'ertiga-family', service: 'family-car',
            title: 'Ertiga Family Pack', subtitle: 'Practical family MPV for daily and trip use',
            image: 'images/4.jpg', price: 'Rs. 2599', plan: 'Per day, 300 km limit',
            transmission: 'Manual', fuel: 'Petrol', seats: '7 Seats', baggage: '4 Bags',
            description: 'Balanced option for family comfort, better mileage, and convenient third-row seating.',
            highlights: ['Good mileage for long use', 'Comfortable 7-seat layout', 'Easy in-city drive'],
            includes: ['Insurance cover', '24x7 support', 'Child seat on request'],
            bestFor: ['Family outings', 'Temple or event runs', 'Weekend road trips']
        },
        {
            slug: 'carens-comfort', service: 'family-car',
            title: 'Kia Carens Comfort+', subtitle: 'Premium MPV for long family travel',
            image: 'images/6.jpg', price: 'Rs. 2999', plan: 'Per day, 300 km limit',
            transmission: 'Automatic', fuel: 'Petrol', seats: '6 Seats', baggage: '4 Bags',
            description: 'High-comfort MPV with premium interiors and extra refinement for long distance family travel.',
            highlights: ['Premium cabin finish', 'Smooth suspension', 'Large infotainment setup'],
            includes: ['Insurance cover', 'Roadside assistance', 'Sanitized delivery'],
            bestFor: ['Long family routes', 'Occasion travel', 'Premium family users']
        },
        {
            slug: 'rumion-family-plus', service: 'family-car',
            title: 'Rumion Family Plus', subtitle: 'Value family package with comfort and mileage',
            image: 'images/2.jpg', price: 'Rs. 2799', plan: 'Per day, 300 km limit',
            transmission: 'Manual', fuel: 'Petrol', seats: '7 Seats', baggage: '4 Bags',
            description: 'Reliable family vehicle for regular travel with easy maintenance and practical seating.',
            highlights: ['Family-friendly ergonomics', 'Strong mileage output', 'Comfort-oriented layout'],
            includes: ['Insurance cover', 'Support helpline', 'Fast booking confirmation'],
            bestFor: ['Family city runs', 'School and activity travel', 'Outstation visits']
        }
    ];

    const readQuery = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            service: params.get('service') || 'self-drive',
            car: params.get('car') || ''
        };
    };

    const listHTML = (items) => {
        return items.map((item) => '<li class="flex items-start text-sm text-text-secondary"><i class="ri-checkbox-circle-line text-accent mt-1 mr-2"></i><span>' + item + '</span></li>').join('');
    };

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };
    const renderRelated = (serviceKey, currentSlug) => {
        const container = document.getElementById('related-cars-grid');
        if (!container) return;

        const related = CARS.filter((item) => item.service === serviceKey && item.slug !== currentSlug).slice(0, 3);

        container.innerHTML = related.map((car) => {
            return '<article class="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm hover:shadow-xl transition">' +
                '<div class="h-44 overflow-hidden"><img src="' + car.image + '" alt="' + car.title + '" class="w-full h-full object-cover group-hover:scale-105 transition duration-500"></div>' +
                '<div class="p-4">' +
                '<h3 class="text-lg font-bold text-primary-dark">' + car.title + '</h3>' +
                '<p class="text-sm text-text-secondary mt-1">' + car.subtitle + '</p>' +
                '<div class="mt-3 flex items-center justify-between">' +
                '<p class="text-base font-extrabold text-primary-dark">' + car.price + '</p>' +
                '<a href="service-detail.html?service=' + car.service + '&car=' + car.slug + '" class="inline-flex items-center text-sm font-semibold text-accent">View Details <i class="ri-arrow-right-line ml-1 text-xs"></i></a>' +
                '</div>' +
                '</div>' +
                '</article>';
        }).join('');
    };

    const init = () => {
        const query = readQuery();
        let serviceKey = SERVICE_META[query.service] ? query.service : 'self-drive';

        const serviceCars = CARS.filter((item) => item.service === serviceKey);
        let selectedCar = serviceCars.find((item) => item.slug === query.car);
        if (!selectedCar) selectedCar = serviceCars[0];

        if (!selectedCar) {
            serviceKey = 'self-drive';
            selectedCar = CARS.find((item) => item.service === serviceKey);
            if (!selectedCar) return;
        }

        const meta = SERVICE_META[serviceKey];

        setText('detail-service-badge', meta.label);
        setText('detail-title', selectedCar.title);
        setText('detail-subtitle', selectedCar.subtitle);
        setText('detail-transmission', selectedCar.transmission);
        setText('detail-fuel', selectedCar.fuel);
        setText('detail-seats', selectedCar.seats);
        setText('detail-baggage', selectedCar.baggage);
        setText('detail-description', selectedCar.description);
        setText('detail-price', selectedCar.price);
        setText('detail-plan', selectedCar.plan);

        const imageEl = document.getElementById('detail-image');
        if (imageEl) {
            imageEl.src = selectedCar.image;
            imageEl.alt = selectedCar.title;
        }

        const highlightsEl = document.getElementById('detail-highlights');
        if (highlightsEl) highlightsEl.innerHTML = listHTML(selectedCar.highlights);

        const includesEl = document.getElementById('detail-includes');
        if (includesEl) includesEl.innerHTML = listHTML(selectedCar.includes);

        const bestForEl = document.getElementById('detail-best-for');
        if (bestForEl) bestForEl.innerHTML = listHTML(selectedCar.bestFor);

        const sectionHref = 'service.html#' + meta.sectionId;
        const topBack = document.getElementById('detail-breadcrumb-service-top');
        if (topBack) topBack.href = sectionHref;

        const sideBack = document.getElementById('detail-breadcrumb-service');
        if (sideBack) sideBack.href = sectionHref;

        const bottomBack = document.getElementById('detail-breadcrumb-service-bottom');
        if (bottomBack) bottomBack.href = sectionHref;

        document.title = selectedCar.title + ' - ' + meta.label + ' | PrimeTransit';

        renderRelated(serviceKey, selectedCar.slug);
    };

    document.addEventListener('DOMContentLoaded', init);
})();

