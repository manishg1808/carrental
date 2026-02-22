// Service page: show only selected service section when opened via hash.
document.addEventListener('DOMContentLoaded', function () {
    const serviceSections = Array.from(document.querySelectorAll('article[id^="detail-"]'));
    if (!serviceSections.length) return;

    const showAllButton = document.getElementById('show-all-services');
    const serviceListingSection = serviceSections[0].closest('section');
    const validSectionIds = new Set(serviceSections.map(function (section) {
        return section.id;
    }));

    function toggleShowAllButton(show) {
        if (!showAllButton) return;
        if (show) {
            showAllButton.classList.remove('hidden');
        } else {
            showAllButton.classList.add('hidden');
        }
    }

    function showAllSections() {
        serviceSections.forEach(function (section) {
            section.hidden = false;
        });
        toggleShowAllButton(false);
    }

    function focusSectionById(sectionId, shouldScroll) {
        if (!sectionId || !validSectionIds.has(sectionId)) {
            showAllSections();
            return;
        }

        serviceSections.forEach(function (section) {
            section.hidden = section.id !== sectionId;
        });
        toggleShowAllButton(true);

        if (shouldScroll) {
            const activeSection = document.getElementById(sectionId);
            if (activeSection) {
                activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    function currentHashId() {
        return decodeURIComponent((window.location.hash || '').replace(/^#/, ''));
    }

    function applyFromHash(shouldScroll) {
        focusSectionById(currentHashId(), shouldScroll);
    }

    applyFromHash(false);
    window.addEventListener('hashchange', function () {
        applyFromHash(true);
    });

    if (showAllButton) {
        showAllButton.addEventListener('click', function (event) {
            event.preventDefault();
            history.replaceState(null, '', window.location.pathname);
            showAllSections();

            if (serviceListingSection) {
                serviceListingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});
