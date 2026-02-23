document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('route-booking-modal');
    const closeBtn = document.getElementById('route-booking-close');
    const form = document.getElementById('route-booking-form');
    const statusText = document.getElementById('route-booking-status');
    const summary = document.getElementById('route-booking-summary');
    const routeInput = document.getElementById('route-booking-route');
    const destinationInput = document.getElementById('route-booking-destination');
    const submitBtn = document.getElementById('route-booking-submit');

    if (!modal || !form) return;

    const today = new Date().toISOString().split('T')[0];
    const pickupDateInput = form.querySelector('input[name="pickup_date"]');
    const returnDateInput = form.querySelector('input[name="return_date"]');
    if (pickupDateInput) pickupDateInput.min = today;
    if (returnDateInput) returnDateInput.min = today;

    if (pickupDateInput && returnDateInput) {
        pickupDateInput.addEventListener('change', function () {
            const pickupValue = pickupDateInput.value || today;
            returnDateInput.min = pickupValue;
            if (returnDateInput.value && returnDateInput.value < pickupValue) {
                returnDateInput.value = pickupValue;
            }
        });
    }

    const routeToServiceType = function (routeName) {
        const lower = (routeName || '').toLowerCase();
        if (lower.includes('sea world')) return 'Sea World Transportation';
        if (lower.includes('sanford')) return 'Sanford Airport Transportation';
        if (lower.includes('pickup: orlando')) return 'Orlando City to City Transfer';
        if (lower.includes('airport')) return 'Orlando Airport Transportation';
        if (lower.includes('universal')) return 'Universal Orlando Transportation';
        if (lower.includes('port canaveral')) return 'Port Canaveral Cruise Transportation';
        return 'Corporate Transportation';
    };

    const openModal = function (routeName, destinationName) {
        routeInput.value = routeName || '';
        destinationInput.value = destinationName || '';
        summary.textContent = `${routeName} -> ${destinationName}`;
        const subjectInput = form.querySelector('[name="subject"]');
        const serviceTypeInput = form.querySelector('[name="service_type"]');
        const pickupLocationInput = form.querySelector('[name="pickup_location"]');
        const returnLocationInput = form.querySelector('[name="return_location"]');
        if (subjectInput) subjectInput.value = `Route Booking Request: ${destinationName}`;
        if (serviceTypeInput) serviceTypeInput.value = routeToServiceType(routeName);
        if (pickupLocationInput) pickupLocationInput.value = routeName;
        if (returnLocationInput) returnLocationInput.value = destinationName;
        statusText.textContent = '';
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
    };

    const closeModal = function () {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
    };

    document.addEventListener('click', function (event) {
        const trigger = event.target.closest('.route-rate-book-btn[data-route-book="true"]');
        if (!trigger) return;

        const row = trigger.closest('tr');
        const tableCard = trigger.closest('.route-rate-card');
        const destinationCell = row ? row.querySelector('td:first-child') : null;
        const routeHeading = tableCard ? tableCard.querySelector('.route-rate-head h2') : null;

        const routeName = routeHeading ? routeHeading.textContent.trim() : 'Selected Route';
        const destinationName = destinationCell ? destinationCell.textContent.trim() : 'Selected Destination';

        openModal(routeName, destinationName);
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const data = {
            source: 'website-service-route',
            page_url: window.location.href,
            form_id: 'service-route-rate-popup',
            name: (form.querySelector('[name="name"]')?.value || '').trim(),
            email: (form.querySelector('[name="email"]')?.value || '').trim(),
            phone: (form.querySelector('[name="phone"]')?.value || '').trim(),
            subject: (form.querySelector('[name="subject"]')?.value || '').trim(),
            message: (form.querySelector('[name="message"]')?.value || '').trim(),
            payload: {
                route: routeInput.value,
                destination: destinationInput.value,
                choose_car: (form.querySelector('[name="choose_car"]')?.value || '').trim(),
                pickup_date: (form.querySelector('[name="pickup_date"]')?.value || '').trim(),
                pickup_time: (form.querySelector('[name="pickup_time"]')?.value || '').trim(),
                pickup_location: (form.querySelector('[name="pickup_location"]')?.value || '').trim(),
                return_date: (form.querySelector('[name="return_date"]')?.value || '').trim(),
                return_time: (form.querySelector('[name="return_time"]')?.value || '').trim(),
                return_location: (form.querySelector('[name="return_location"]')?.value || '').trim(),
                service_type: (form.querySelector('[name="service_type"]')?.value || '').trim(),
                passengers: (form.querySelector('[name="passengers"]')?.value || '').trim()
            }
        };

        if (
            !data.name || !data.email || !data.phone || !data.subject || !data.message ||
            !data.payload.choose_car || !data.payload.pickup_date || !data.payload.pickup_time ||
            !data.payload.pickup_location || !data.payload.return_date || !data.payload.return_time ||
            !data.payload.return_location || !data.payload.service_type || !data.payload.passengers
        ) {
            statusText.textContent = 'Please fill all required fields.';
            return;
        }

        submitBtn.disabled = true;
        statusText.textContent = 'Submitting...';

        try {
            const response = await fetch('backend/api/submit-lead.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok || !result.ok) {
                throw new Error(result.error || 'Unable to submit right now.');
            }

            statusText.textContent = 'Thank you. Your enquiry has been sent.';
            form.reset();
            if (pickupDateInput) pickupDateInput.min = today;
            if (returnDateInput) returnDateInput.min = today;

            setTimeout(function () {
                closeModal();
            }, 800);
        } catch (error) {
            statusText.textContent = error.message || 'Something went wrong. Please try again.';
        } finally {
            submitBtn.disabled = false;
        }
    });
});
