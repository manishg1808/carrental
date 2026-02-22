// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    initParallaxBackgrounds();

    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const fieldValue = function (fieldName) {
        const field = contactForm.querySelector(`[name="${fieldName}"]`);
        return field ? field.value.trim() : '';
    };

    const today = new Date().toISOString().split('T')[0];
    const pickupDateInput = contactForm.querySelector('[name="pickup_date"]');
    const returnDateInput = contactForm.querySelector('[name="return_date"]');

    if (pickupDateInput) pickupDateInput.setAttribute('min', today);
    if (returnDateInput) returnDateInput.setAttribute('min', today);

    if (pickupDateInput && returnDateInput) {
        pickupDateInput.addEventListener('change', function () {
            const pickup = pickupDateInput.value || today;
            returnDateInput.setAttribute('min', pickup);
            if (returnDateInput.value && returnDateInput.value < pickup) {
                returnDateInput.value = pickup;
            }
        });
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const data = {
            name: fieldValue('name'),
            email: fieldValue('email'),
            phone: fieldValue('phone'),
            chooseCar: fieldValue('choose_car'),
            pickupDate: fieldValue('pickup_date'),
            pickupTime: fieldValue('pickup_time'),
            pickupLocation: fieldValue('pickup_location'),
            returnDate: fieldValue('return_date'),
            returnTime: fieldValue('return_time'),
            returnLocation: fieldValue('return_location'),
            serviceType: fieldValue('service_type'),
            passengers: fieldValue('passengers'),
            subject: fieldValue('subject'),
            message: fieldValue('message')
        };

        if (
            !data.name || !data.email || !data.phone || !data.chooseCar ||
            !data.pickupDate || !data.pickupTime || !data.pickupLocation ||
            !data.returnDate || !data.returnTime || !data.returnLocation ||
            !data.serviceType || !data.passengers || !data.subject || !data.message
        ) {
            alert('Please fill all required fields before submitting.');
            return;
        }

        console.log('Contact booking enquiry:', data);
        alert('Thank you! Your booking request has been submitted.');
        contactForm.reset();
        if (pickupDateInput) pickupDateInput.setAttribute('min', today);
        if (returnDateInput) returnDateInput.setAttribute('min', today);
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
