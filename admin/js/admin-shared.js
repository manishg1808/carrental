(function () {
    const STORAGE_KEY = 'adminCars';
    const CATEGORY_STORAGE_KEY = 'adminCategories';
    const BRAND_STORAGE_KEY = 'adminBrands';
    const HIDDEN_CATEGORY_STORAGE_KEY = 'adminHiddenCategories';
    const HIDDEN_BRAND_STORAGE_KEY = 'adminHiddenBrands';
    const DEFAULT_CATEGORIES = ['SUV', 'Sedan', 'Hatchback', 'MUV', 'Luxury', 'Coupe', 'Convertible', 'Pickup'];
    const DEFAULT_BRANDS = ['Toyota', 'Honda', 'Hyundai', 'Tata', 'Mahindra', 'Kia', 'Ford', 'BMW', 'Mercedes', 'Audi'];

    function cloneCars(source) {
        return source.map(function (car) {
            return Object.assign({}, car);
        });
    }

    function normalizeText(value) {
        return String(value || '').trim();
    }

    function toTitleCase(text) {
        return normalizeText(text)
            .split(/\s+/)
            .filter(Boolean)
            .map(function (part) {
                return part
                    .split('-')
                    .map(function (chunk) {
                        if (!chunk) return chunk;
                        if (/^[A-Z0-9]{2,4}$/.test(chunk)) return chunk;
                        if (/^[a-z0-9]{1,3}$/.test(chunk)) return chunk.toUpperCase();
                        const lower = chunk.toLowerCase();
                        return lower.charAt(0).toUpperCase() + lower.slice(1);
                    })
                    .join('-');
            })
            .join(' ');
    }

    function extractBrandFromName(name) {
        const parts = normalizeText(name).split(/\s+/).filter(Boolean);
        if (!parts.length) return '';
        const first = parts[0].replace(/[^a-zA-Z0-9-]/g, '');
        return toTitleCase(first);
    }

    function normalizeCar(car) {
        const safeCar = Object.assign({}, car || {});
        const type = toTitleCase(safeCar.type || safeCar.category || 'SUV');
        const category = toTitleCase(safeCar.category || safeCar.type || 'SUV');
        const brand = toTitleCase(safeCar.brand || extractBrandFromName(safeCar.name) || 'Generic');
        const name = normalizeText(safeCar.name);
        const transmission = normalizeText(safeCar.transmission || 'Automatic');
        const popularOnHome = Boolean(safeCar.popularOnHome);

        return Object.assign({}, safeCar, {
            name: name,
            type: type,
            category: category,
            brand: brand,
            transmission: transmission,
            popularOnHome: popularOnHome
        });
    }

    function uniqueSorted(list) {
        const seen = new Set();
        const out = [];

        (list || []).forEach(function (item) {
            const normalized = toTitleCase(item);
            const key = normalized.toLowerCase();
            if (!normalized || seen.has(key)) return;
            seen.add(key);
            out.push(normalized);
        });

        return out.sort(function (a, b) {
            return a.localeCompare(b);
        });
    }

    function parseStoredArray(key) {
        const raw = localStorage.getItem(key);
        if (!raw) return [];

        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) return parsed;
        } catch (e) {}

        return [];
    }

    function saveStoredArray(key, values) {
        localStorage.setItem(key, JSON.stringify(uniqueSorted(values)));
    }

    function seedCars() {
        if (Array.isArray(window.carsData)) {
            const seeded = cloneCars(window.carsData).map(normalizeCar);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
            return seeded;
        }
        return [];
    }

    function loadCars() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) return parsed.map(normalizeCar);
            } catch (e) {}
        }
        return seedCars();
    }

    function saveCars(cars) {
        const normalized = (cars || []).map(normalizeCar);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }

    function resetCars() {
        return seedCars();
    }

    function formatRupee(value) {
        return 'Rs ' + Number(value || 0).toLocaleString();
    }

    function resolveImageSrc(image) {
        if (!image) return '../images/5.jpg';
        if (String(image).startsWith('data:')) return image;
        if (String(image).startsWith('http')) return image;
        if (String(image).startsWith('../')) return image;
        return '../' + image;
    }

    function getStats(cars) {
        const total = cars.length;
        const available = cars.filter(function (car) { return car.available; }).length;
        const unavailable = total - available;
        const avg = total
            ? Math.round(cars.reduce(function (sum, car) { return sum + Number(car.price || 0); }, 0) / total)
            : 0;
        return { total: total, available: available, unavailable: unavailable, avgPrice: avg };
    }

    function getTypeStats(cars) {
        const map = {};
        cars.forEach(function (car) {
            const type = toTitleCase(car.type || 'Unknown');
            map[type] = (map[type] || 0) + 1;
        });
        return Object.entries(map).sort(function (a, b) { return b[1] - a[1]; });
    }

    function getCategoryStats(cars) {
        const map = {};
        cars.forEach(function (car) {
            const category = toTitleCase(car.category || car.type || 'Unknown');
            map[category] = (map[category] || 0) + 1;
        });
        return Object.entries(map).sort(function (a, b) { return b[1] - a[1]; });
    }

    function getBrandStats(cars) {
        const map = {};
        cars.forEach(function (car) {
            const brand = toTitleCase(car.brand || extractBrandFromName(car.name) || 'Unknown');
            map[brand] = (map[brand] || 0) + 1;
        });
        return Object.entries(map).sort(function (a, b) { return b[1] - a[1]; });
    }

    function loadCategories(cars) {
        const stored = parseStoredArray(CATEGORY_STORAGE_KEY);
        const fromCars = (cars || []).map(function (car) {
            return car.category || car.type;
        });
        const hidden = new Set(
            parseStoredArray(HIDDEN_CATEGORY_STORAGE_KEY).map(function (value) {
                return toTitleCase(value).toLowerCase();
            })
        );

        return uniqueSorted(DEFAULT_CATEGORIES.concat(fromCars, stored)).filter(function (category) {
            return !hidden.has(String(category).toLowerCase());
        });
    }

    function saveCategories(categories) {
        const normalized = uniqueSorted(categories);
        saveStoredArray(CATEGORY_STORAGE_KEY, normalized);

        const normalizedKeys = new Set(normalized.map(function (value) {
            return String(value).toLowerCase();
        }));
        const hidden = parseStoredArray(HIDDEN_CATEGORY_STORAGE_KEY).filter(function (value) {
            return !normalizedKeys.has(toTitleCase(value).toLowerCase());
        });
        saveStoredArray(HIDDEN_CATEGORY_STORAGE_KEY, hidden);
    }

    function removeCategory(category) {
        const target = toTitleCase(category);
        if (!target) return;
        const targetKey = target.toLowerCase();

        const stored = parseStoredArray(CATEGORY_STORAGE_KEY).filter(function (value) {
            return toTitleCase(value).toLowerCase() !== targetKey;
        });
        saveStoredArray(CATEGORY_STORAGE_KEY, stored);

        const hidden = parseStoredArray(HIDDEN_CATEGORY_STORAGE_KEY);
        if (!hidden.some(function (value) { return toTitleCase(value).toLowerCase() === targetKey; })) {
            hidden.push(target);
        }
        saveStoredArray(HIDDEN_CATEGORY_STORAGE_KEY, hidden);
    }

    function loadBrands(cars) {
        const stored = parseStoredArray(BRAND_STORAGE_KEY);
        const fromCars = (cars || []).map(function (car) {
            return car.brand || extractBrandFromName(car.name);
        });
        const hidden = new Set(
            parseStoredArray(HIDDEN_BRAND_STORAGE_KEY).map(function (value) {
                return toTitleCase(value).toLowerCase();
            })
        );

        return uniqueSorted(DEFAULT_BRANDS.concat(fromCars, stored)).filter(function (brand) {
            return !hidden.has(String(brand).toLowerCase());
        });
    }

    function saveBrands(brands) {
        const normalized = uniqueSorted(brands);
        saveStoredArray(BRAND_STORAGE_KEY, normalized);

        const normalizedKeys = new Set(normalized.map(function (value) {
            return String(value).toLowerCase();
        }));
        const hidden = parseStoredArray(HIDDEN_BRAND_STORAGE_KEY).filter(function (value) {
            return !normalizedKeys.has(toTitleCase(value).toLowerCase());
        });
        saveStoredArray(HIDDEN_BRAND_STORAGE_KEY, hidden);
    }

    function removeBrand(brand) {
        const target = toTitleCase(brand);
        if (!target) return;
        const targetKey = target.toLowerCase();

        const stored = parseStoredArray(BRAND_STORAGE_KEY).filter(function (value) {
            return toTitleCase(value).toLowerCase() !== targetKey;
        });
        saveStoredArray(BRAND_STORAGE_KEY, stored);

        const hidden = parseStoredArray(HIDDEN_BRAND_STORAGE_KEY);
        if (!hidden.some(function (value) { return toTitleCase(value).toLowerCase() === targetKey; })) {
            hidden.push(target);
        }
        saveStoredArray(HIDDEN_BRAND_STORAGE_KEY, hidden);
    }

    function fileToDataUrl(file) {
        return new Promise(function (resolve, reject) {
            if (!file) {
                resolve('');
                return;
            }
            const reader = new FileReader();
            reader.onload = function () { resolve(reader.result); };
            reader.onerror = function () { reject(new Error('Image read failed')); };
            reader.readAsDataURL(file);
        });
    }

    window.AdminData = {
        loadCars: loadCars,
        saveCars: saveCars,
        resetCars: resetCars,
        formatRupee: formatRupee,
        resolveImageSrc: resolveImageSrc,
        getStats: getStats,
        getTypeStats: getTypeStats,
        getCategoryStats: getCategoryStats,
        getBrandStats: getBrandStats,
        loadCategories: loadCategories,
        saveCategories: saveCategories,
        removeCategory: removeCategory,
        loadBrands: loadBrands,
        saveBrands: saveBrands,
        removeBrand: removeBrand,
        toTitleCase: toTitleCase,
        fileToDataUrl: fileToDataUrl
    };
})();

