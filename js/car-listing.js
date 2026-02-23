// Car listing page functionality
const CARS_PER_PAGE = 9;

let filteredCars = [...carsData];
let currentPage = 1;
let currentFilters = {
    type: [],
    transmission: [],
    fuel: [],
    availability: null,
    priceMin: 0,
    priceMax: 10000
};

document.addEventListener('DOMContentLoaded', function() {
    renderCategoryFilters();
    loadCars();

    const categorySidebar = document.getElementById('category-sidebar');
    const categorySidebarOverlay = document.getElementById('category-sidebar-overlay');
    const mobileCategoryToggle = document.getElementById('mobile-category-toggle');
    const mobileCategoryToggleText = document.getElementById('mobile-category-toggle-text');
    const mobileCategoryToggleIcon = mobileCategoryToggle ? mobileCategoryToggle.querySelector('.ri-arrow-down-s-line') : null;
    const mobileCategoryClose = document.getElementById('mobile-category-close');
    const isMobileViewport = () => window.innerWidth < 1024;

    const setMobileCategoryState = (isOpen) => {
        if (!categorySidebar) return;

        if (!isMobileViewport()) {
            categorySidebar.classList.remove('-translate-x-full');
            if (categorySidebarOverlay) {
                categorySidebarOverlay.classList.add('opacity-0', 'invisible');
                categorySidebarOverlay.classList.remove('opacity-100', 'visible');
            }
            document.body.classList.remove('overflow-hidden');
            if (mobileCategoryToggle) {
                mobileCategoryToggle.setAttribute('aria-expanded', 'true');
            }
            return;
        }

        categorySidebar.classList.toggle('-translate-x-full', !isOpen);

        if (categorySidebarOverlay) {
            categorySidebarOverlay.classList.toggle('opacity-0', !isOpen);
            categorySidebarOverlay.classList.toggle('invisible', !isOpen);
            categorySidebarOverlay.classList.toggle('opacity-100', isOpen);
            categorySidebarOverlay.classList.toggle('visible', isOpen);
        }

        document.body.classList.toggle('overflow-hidden', isOpen);

        if (mobileCategoryToggleText) {
            mobileCategoryToggleText.innerHTML = isOpen
                ? '<i class="ri-stack-line text-accent mr-2"></i>Hide Categories'
                : '<i class="ri-stack-line text-accent mr-2"></i>Show Categories';
        }

        if (mobileCategoryToggleIcon) {
            mobileCategoryToggleIcon.classList.toggle('rotate-180', isOpen);
        }

        if (mobileCategoryToggle) {
            mobileCategoryToggle.setAttribute('aria-expanded', String(isOpen));
        }
    };

    if (mobileCategoryToggle && categorySidebar) {
        mobileCategoryToggle.addEventListener('click', function() {
            const shouldOpen = categorySidebar.classList.contains('-translate-x-full');
            setMobileCategoryState(shouldOpen);
        });
    }

    if (categorySidebarOverlay) {
        categorySidebarOverlay.addEventListener('click', function() {
            setMobileCategoryState(false);
        });
    }

    if (mobileCategoryClose) {
        mobileCategoryClose.addEventListener('click', function() {
            setMobileCategoryState(false);
        });
    }

    window.addEventListener('resize', function() {
        if (isMobileViewport()) {
            setMobileCategoryState(false);
        } else {
            setMobileCategoryState(true);
        }
    });

    if (isMobileViewport()) {
        setMobileCategoryState(false);
    } else {
        setMobileCategoryState(true);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMobileViewport()) {
            setMobileCategoryState(false);
        }
    });

    // Legacy filter checkboxes (if present)
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    filterCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', handleFilterChange);
    });

    // Category sidebar buttons (event delegation for dynamic buttons)
    const categoryContainer = document.getElementById('category-filter-list');
    if (categoryContainer) {
        categoryContainer.addEventListener('click', function(e) {
            const btn = e.target.closest('.category-filter-btn');
            if (!btn) return;

            const category = btn.dataset.category;
            setActiveCategoryButton(btn);

            currentFilters.type = [];
            currentFilters.fuel = [];

            if (category === 'electric') {
                currentFilters.fuel = ['Electric'];
            } else if (category !== 'all') {
                currentFilters.type = [category];
            }

            applyFilters();

            if (isMobileViewport()) {
                setMobileCategoryState(false);
            }
        });
    }

    // Price range sliders
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const priceMinValue = document.getElementById('price-min-value');
    const priceMaxValue = document.getElementById('price-max-value');

    if (priceMin && priceMax) {
        priceMin.addEventListener('input', function() {
            priceMinValue.textContent = this.value;
            currentFilters.priceMin = parseInt(this.value, 10);
            if (parseInt(this.value, 10) > parseInt(priceMax.value, 10)) {
                priceMax.value = this.value;
                priceMaxValue.textContent = this.value;
                currentFilters.priceMax = parseInt(this.value, 10);
            }
            applyFilters();
        });

        priceMax.addEventListener('input', function() {
            priceMaxValue.textContent = this.value;
            currentFilters.priceMax = parseInt(this.value, 10);
            if (parseInt(this.value, 10) < parseInt(priceMin.value, 10)) {
                priceMin.value = this.value;
                priceMinValue.textContent = this.value;
                currentFilters.priceMin = parseInt(this.value, 10);
            }
            applyFilters();
        });
    }

    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            applyFilters();
        });
    }

    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            applyFilters();
        });
    }

    // Pagination controls
    const paginationControls = document.getElementById('pagination-controls');
    if (paginationControls) {
        paginationControls.addEventListener('click', handlePaginationClick);
    }

    // Reset filters
    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetFilters();

            if (isMobileViewport()) {
                setMobileCategoryState(false);
            }
        });
    }

    // Check for search params from home page
    const searchCar = sessionStorage.getItem('searchCar');
    const searchInputEl = document.getElementById('search-input');
    if (searchCar && searchInputEl) {
        searchInputEl.value = searchCar;
        sessionStorage.removeItem('searchCar');
        applyFilters();
    }

    // Apply URL filters from footer links (category, fuel, availability, search)
    const hasUrlFilters = applyFiltersFromUrl();
    if (hasUrlFilters) {
        applyFilters();
    }
});

function getCategoryIcon(type) {
    const icons = {
        SUV: 'ri-truck-line',
        Sedan: 'ri-roadster-line',
        Hatchback: 'ri-car-line',
        MUV: 'ri-bus-2-line',
        Luxury: 'ri-gemini-line',
        Coupe: 'ri-car-line',
        Convertible: 'ri-car-line',
        Pickup: 'ri-truck-line'
    };
    return icons[type] || 'ri-car-line';
}

function getSortedTypeEntries(typeCounts) {
    const preferredOrder = ['SUV', 'Sedan', 'Hatchback', 'MUV', 'Luxury', 'Coupe', 'Convertible', 'Pickup'];
    const entries = Object.entries(typeCounts);
    entries.sort((a, b) => {
        const ai = preferredOrder.indexOf(a[0]);
        const bi = preferredOrder.indexOf(b[0]);
        if (ai !== -1 && bi !== -1) return ai - bi;
        if (ai !== -1) return -1;
        if (bi !== -1) return 1;
        return a[0].localeCompare(b[0]);
    });
    return entries;
}

function updateListingStats() {
    const totalCarsEl = document.getElementById('listing-total-cars');
    const availableCarsEl = document.getElementById('listing-available-cars');
    const categoryTypesEl = document.getElementById('listing-category-types');

    if (totalCarsEl) {
        totalCarsEl.textContent = carsData.length;
    }

    if (availableCarsEl) {
        availableCarsEl.textContent = carsData.filter((car) => car.available).length;
    }

    if (categoryTypesEl) {
        categoryTypesEl.textContent = new Set(carsData.map((car) => car.type)).size;
    }
}

function getSpecValue(specs, keys) {
    if (!specs || typeof specs !== 'object') return '';
    const specKeys = Object.keys(specs);
    const matchedKey = specKeys.find((key) => keys.some((wanted) => key.toLowerCase() === wanted.toLowerCase()));
    return matchedKey ? String(specs[matchedKey]) : '';
}

function getSeatCount(car) {
    const seatValue = getSpecValue(car.specs, ['Seating Capacity', 'Seats']);
    return seatValue || 'N/A';
}

function getPassengerCount(car) {
    if (car && car.passengers) return String(car.passengers);
    return getSeatCount(car);
}

function getCarBrand(car) {
    const specBrand = getSpecValue(car.specs, ['Brand', 'Make']);
    if (car && car.brand) return String(car.brand);
    if (specBrand) return specBrand;

    const name = String((car && car.name) || '').trim();
    return name ? name.split(/\s+/)[0] : 'N/A';
}

function getLuggageLabel(car) {
    const bootSpace = getSpecValue(car.specs, ['Boot Space']);
    if (bootSpace) {
        return `Boot ${bootSpace}`;
    }

    const payload = getSpecValue(car.specs, ['Payload']);
    if (payload) {
        return `Payload ${payload}`;
    }

    return 'Utility';
}

function renderCategoryFilters() {
    const categoryContainer = document.getElementById('category-filter-list');
    if (!categoryContainer) return;

    const typeCounts = carsData.reduce((acc, car) => {
        acc[car.type] = (acc[car.type] || 0) + 1;
        return acc;
    }, {});
    const typeEntries = getSortedTypeEntries(typeCounts);

    const buttons = [];
    buttons.push(`
        <button type="button" class="category-filter-btn listing-category-filter-btn is-active" data-category="all">
            <span class="listing-category-label">
                <i class="ri-car-line"></i>All Cars
            </span>
            <span class="listing-category-count">${carsData.length}</span>
        </button>
    `);

    typeEntries.forEach(([type, count]) => {
        buttons.push(`
            <button type="button" class="category-filter-btn listing-category-filter-btn" data-category="${type}">
                <span class="listing-category-label">
                    <i class="${getCategoryIcon(type)}"></i>${type}
                </span>
                <span class="listing-category-count">${count}</span>
            </button>
        `);
    });

    categoryContainer.innerHTML = buttons.join('');
}

function setActiveCategoryButton(activeBtn) {
    document.querySelectorAll('.category-filter-btn').forEach((btn) => {
        btn.classList.toggle('is-active', btn === activeBtn);
    });
}

function handleFilterChange(e) {
    const filterType = e.target.dataset.filter;
    const value = e.target.value;

    if (e.target.checked) {
        if (!currentFilters[filterType].includes(value)) {
            currentFilters[filterType].push(value);
        }
    } else {
        currentFilters[filterType] = currentFilters[filterType].filter((v) => v !== value);
    }

    applyFilters();
}

function normalizeTitleCase(value) {
    return String(value || '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map((word) => word ? word.charAt(0).toUpperCase() + word.slice(1) : '')
        .join(' ');
}

function applyFiltersFromUrl() {
    const params = new URLSearchParams(window.location.search);
    let hasAnyFilter = false;

    const categoryParam = params.get('category');
    if (categoryParam) {
        const wantedCategory = normalizeTitleCase(categoryParam);
        const match = carsData.find((car) => String(car.type || '').toLowerCase() === wantedCategory.toLowerCase());
        if (match) {
            currentFilters.type = [match.type];
            hasAnyFilter = true;

            const categoryBtn = document.querySelector('.category-filter-btn[data-category="' + match.type + '"]');
            if (categoryBtn) {
                setActiveCategoryButton(categoryBtn);
            }
        }
    }

    const fuelParam = params.get('fuel');
    if (fuelParam) {
        const wantedFuel = normalizeTitleCase(fuelParam);
        const matchFuel = carsData.find((car) => String(car.fuel || '').toLowerCase() === wantedFuel.toLowerCase());
        if (matchFuel) {
            currentFilters.fuel = [matchFuel.fuel];
            hasAnyFilter = true;
        }

        if (wantedFuel.toLowerCase() === 'electric') {
            const electricBtn = document.querySelector('.category-filter-btn[data-category="electric"]');
            if (electricBtn) {
                setActiveCategoryButton(electricBtn);
            }
        }
    }

    const availableParam = params.get('available');
    if (availableParam === 'true' || availableParam === 'false') {
        currentFilters.availability = availableParam === 'true';
        hasAnyFilter = true;
    }

    const searchParam = params.get('search');
    if (searchParam) {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = searchParam;
            hasAnyFilter = true;
        }
    }

    return hasAnyFilter;
}

function applyFilters() {
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const sortValue = document.getElementById('sort-select')?.value || 'default';

    filteredCars = carsData.filter((car) => {
        if (searchTerm && !car.name.toLowerCase().includes(searchTerm)) {
            return false;
        }

        if (currentFilters.type.length > 0 && !currentFilters.type.includes(car.type)) {
            return false;
        }

        if (currentFilters.transmission.length > 0 && !currentFilters.transmission.includes(car.transmission)) {
            return false;
        }

        if (currentFilters.fuel.length > 0 && !currentFilters.fuel.includes(car.fuel)) {
            return false;
        }

        if (typeof currentFilters.availability === 'boolean' && car.available !== currentFilters.availability) {
            return false;
        }

        if (car.price < currentFilters.priceMin || car.price > currentFilters.priceMax) {
            return false;
        }

        return true;
    });

    switch (sortValue) {
        case 'price-low':
            filteredCars.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredCars.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredCars.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            break;
    }

    currentPage = 1;
    loadCars();
}

function resetFilters() {
    document.querySelectorAll('.filter-checkbox').forEach((checkbox) => {
        checkbox.checked = false;
    });

    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const priceMinValue = document.getElementById('price-min-value');
    const priceMaxValue = document.getElementById('price-max-value');

    if (priceMin && priceMax) {
        priceMin.value = 0;
        priceMax.value = 10000;
        priceMinValue.textContent = '0';
        priceMaxValue.textContent = '10000';
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = '';
    }

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.value = 'default';
    }

    currentFilters = {
        type: [],
        transmission: [],
        fuel: [],
        availability: null,
        priceMin: 0,
        priceMax: 10000
    };

    filteredCars = [...carsData];
    currentPage = 1;

    const allBtn = document.querySelector('.category-filter-btn[data-category="all"]');
    if (allBtn) {
        setActiveCategoryButton(allBtn);
    }

    loadCars();
}

function handlePaginationClick(e) {
    const pageBtn = e.target.closest('button[data-page]');
    if (!pageBtn || pageBtn.disabled) return;

    const nextPage = parseInt(pageBtn.dataset.page, 10);
    if (Number.isNaN(nextPage)) return;

    currentPage = nextPage;
    loadCars();

    const carGrid = document.getElementById('car-grid');
    if (carGrid) {
        window.scrollTo({
            top: carGrid.getBoundingClientRect().top + window.scrollY - 120,
            behavior: 'smooth'
        });
    }
}

function renderPagination(totalPages, startIndex, endIndex) {
    const wrapper = document.getElementById('pagination-wrapper');
    const controls = document.getElementById('pagination-controls');
    const summary = document.getElementById('pagination-summary');

    if (!wrapper || !controls || !summary) return;

    if (totalPages <= 1) {
        wrapper.classList.add('hidden');
        controls.innerHTML = '';
        summary.textContent = '';
        return;
    }

    wrapper.classList.remove('hidden');
    summary.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${filteredCars.length} cars`;

    const prevDisabled = currentPage === 1 ? 'disabled' : '';
    const nextDisabled = currentPage === totalPages ? 'disabled' : '';

    let html = `
        <button type="button" data-page="${currentPage - 1}" ${prevDisabled}
            class="px-3 py-2 rounded-lg border border-border bg-white text-primary-dark font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-accent hover:text-accent transition">
            <i class="ri-arrow-left-s-line"></i>
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage
            ? 'bg-accent text-white border-accent'
            : 'bg-white text-primary-dark border-border hover:border-accent hover:text-accent';
        html += `
            <button type="button" data-page="${i}"
                class="min-w-[42px] px-3 py-2 rounded-lg border font-semibold transition ${activeClass}">
                ${i}
            </button>
        `;
    }

    html += `
        <button type="button" data-page="${currentPage + 1}" ${nextDisabled}
            class="px-3 py-2 rounded-lg border border-border bg-white text-primary-dark font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-accent hover:text-accent transition">
            <i class="ri-arrow-right-s-line"></i>
        </button>
    `;

    controls.innerHTML = html;
}

function loadCars() {
    const carGrid = document.getElementById('car-grid');
    const noResults = document.getElementById('no-results');
    const resultsCount = document.getElementById('results-count');
    const paginationWrapper = document.getElementById('pagination-wrapper');

    if (!carGrid) return;

    updateListingStats();

    if (resultsCount) {
        resultsCount.textContent = filteredCars.length;
    }

    if (filteredCars.length === 0) {
        carGrid.innerHTML = '';
        if (noResults) {
            noResults.classList.remove('hidden');
        }
        if (paginationWrapper) {
            paginationWrapper.classList.add('hidden');
        }
        return;
    }

    if (noResults) {
        noResults.classList.add('hidden');
    }

    const totalPages = Math.ceil(filteredCars.length / CARS_PER_PAGE);
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * CARS_PER_PAGE;
    const endIndex = Math.min(startIndex + CARS_PER_PAGE, filteredCars.length);
    const paginatedCars = filteredCars.slice(startIndex, endIndex);

    carGrid.innerHTML = paginatedCars.map((car) => `
        <article class="listing-car-card group">
            <div class="listing-car-media">
                <img src="${car.image}" alt="${car.name}">
                <div class="listing-car-media-overlay"></div>
                <div class="listing-car-badges">
                    <span class="listing-availability ${car.available ? 'is-available' : 'is-unavailable'}">
                        <i class="${car.available ? 'ri-checkbox-circle-fill' : 'ri-close-circle-fill'}"></i>
                        ${car.available ? 'Available' : 'Unavailable'}
                    </span>
                    <span class="listing-type-badge">
                        <i class="${getCategoryIcon(car.type)}"></i>${car.type}
                    </span>
                </div>
                <a href="car-detail.html?id=${car.id}" class="listing-image-cta">
                    View Details <i class="ri-arrow-right-up-line"></i>
                </a>
            </div>
            <div class="listing-car-body">
                <div class="listing-car-head">
                    <h3>${car.name}</h3>
                    <p>${car.description}</p>
                </div>
                <div class="listing-car-specs">
                    <span><i class="ri-price-tag-3-line"></i>${getCarBrand(car)} Brand</span>
                    <span><i class="ri-group-line"></i>${getPassengerCount(car)} Passengers</span>
                    <span><i class="ri-user-3-line"></i>${getSeatCount(car)} Seats</span>
                    <span><i class="ri-gas-station-line"></i>${car.fuel}</span>
                    <span><i class="ri-suitcase-3-line"></i>${getLuggageLabel(car)}</span>
                    <span><i class="${car.available ? 'ri-checkbox-circle-fill' : 'ri-close-circle-fill'}"></i>${car.available ? 'Available' : 'Unavailable'}</span>
                </div>
                <div class="listing-car-footer">
                    <div class="listing-price-block">
                        <p>Starting from</p>
                        <h4>&#8377;${car.price.toLocaleString()}<span>/day</span></h4>
                    </div>
                    <div class="listing-card-actions">
                        <a href="car-detail.html?id=${car.id}" class="listing-card-btn listing-card-btn-outline">Details</a>
                        <a href="car-detail.html?id=${car.id}" class="listing-card-btn listing-card-btn-solid">
                            <i class="ri-calendar-check-line"></i>Book
                        </a>
                    </div>
                </div>
            </div>
        </article>
    `).join('');

    renderPagination(totalPages, startIndex, endIndex);
}
