// Premium Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const searchBtn = document.getElementById('search-btn');
    const searchBar = document.getElementById('search-bar');

    if (!navbar) return;
    const desktopNavMedia = window.matchMedia('(min-width: 1024px)');

    // Keep navbar always visible while still applying "scrolled" styling.
    const updateNavbarState = function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        navbar.style.transform = 'translateY(0)';
    };

    window.addEventListener('scroll', updateNavbarState);
    updateNavbarState();


    // Enhanced Mobile menu toggle with animation
    if (mobileMenuBtn && mobileMenu) {
        const currentPageName = window.location.pathname.split('/').pop() || 'index.html';

        const getMobileServiceLinks = () => {
            const desktopLinks = Array.from(document.querySelectorAll('.services-mega-dropdown .services-mega-link'))
                .map((link) => ({
                    href: link.getAttribute('href'),
                    label: (link.textContent || '').trim()
                }))
                .filter((item) => item.href && item.label);

            if (desktopLinks.length > 0) {
                return desktopLinks;
            }

            return [
                { href: 'service.html#detail-airport-pickup-drop', label: 'Orlando Airport Transportation' },
                { href: 'service.html#detail-with-driver-car', label: 'Walt Disney World Transportation' },
                { href: 'service.html#detail-family-car-options', label: 'Universal Orlando Transportation' },
                { href: 'service.html#detail-daily-car-rental', label: 'Port Canaveral Cruise Transportation' },
                { href: 'service.html#detail-corporate-rentals', label: 'Corporate Transportation' }
            ];
        };

        const ensureMobileServicesDropdown = () => {
            if (mobileMenu.querySelector('.mobile-services-dropdown')) return;

            const servicesLink = mobileMenu.querySelector('a[href="service.html"]');
            if (!servicesLink) return;

            const serviceLinks = getMobileServiceLinks();
            const isServicePage = currentPageName === 'service.html' || currentPageName === 'service-detail.html';
            const toggleStateClass = isServicePage
                ? 'font-semibold text-primary-dark bg-bg-light'
                : 'font-medium text-text-secondary hover:bg-bg-light hover:text-accent';

            const dropdown = document.createElement('div');
            dropdown.className = 'mobile-services-dropdown rounded-xl border border-border/70 bg-white/70 overflow-hidden';
            dropdown.innerHTML = `
                <button type="button" class="mobile-services-toggle w-full flex items-center justify-between px-4 py-3 ${toggleStateClass}">
                    <span class="flex items-center"><i class="ri-service-line mr-3 ${isServicePage ? 'text-accent' : ''}"></i>Services</span>
                    <i class="ri-arrow-down-s-line text-xs transition-transform duration-200"></i>
                </button>
                <div class="mobile-services-menu hidden px-3 pb-3 pt-2 space-y-1 border-t border-border/60">
                    <a href="service.html" class="flex items-center px-3 py-2 rounded-lg text-sm font-semibold text-primary-dark hover:bg-bg-light hover:text-accent transition">
                        <i class="ri-list-check-2 mr-2 w-4"></i>View All Services
                    </a>
                    ${serviceLinks.map((item) => `
                        <a href="${item.href}" class="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-bg-light hover:text-accent transition">
                            <i class="ri-arrow-right-s-line mr-2 w-4"></i>${item.label}
                        </a>
                    `).join('')}
                </div>
            `;

            servicesLink.replaceWith(dropdown);
        };

        ensureMobileServicesDropdown();

        const updateMobileMenuIcon = (isOpen) => {
            const icon = mobileMenuBtn.querySelector('i');
            if (!icon) return;
            icon.classList.toggle('ri-menu-line', !isOpen);
            icon.classList.toggle('ri-close-line', isOpen);
        };

        const closeServiceDropdowns = () => {
            mobileMenu.querySelectorAll('.mobile-services-menu').forEach(menu => {
                menu.classList.add('hidden');
            });
            mobileMenu.querySelectorAll('.mobile-services-toggle .ri-arrow-down-s-line').forEach(icon => {
                icon.classList.remove('rotate-180');
            });
        };

        const closeMobileMenu = () => {
            mobileMenu.classList.remove('menu-open');
            mobileMenu.classList.add('opacity-0', 'invisible', '-translate-y-full');
            setTimeout(() => {
                mobileMenu.style.display = 'none';
            }, 300);
            updateMobileMenuIcon(false);
            closeServiceDropdowns();
        };

        // Mobile "Services" dropdown toggle
        const serviceToggles = mobileMenu.querySelectorAll('.mobile-services-toggle');
        serviceToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const dropdown = this.closest('.mobile-services-dropdown');
                const menu = dropdown ? dropdown.querySelector('.mobile-services-menu') : null;
                const icon = this.querySelector('.ri-arrow-down-s-line');
                if (!menu) return;

                const willOpen = menu.classList.contains('hidden');
                closeServiceDropdowns();

                if (willOpen) {
                    menu.classList.remove('hidden');
                    if (icon) {
                        icon.classList.add('rotate-180');
                    }
                }
            });
        });

        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = mobileMenu.classList.contains('menu-open');

            if (isOpen) {
                closeMobileMenu();
            } else {
                mobileMenu.style.display = 'block';
                setTimeout(() => {
                    mobileMenu.classList.add('menu-open');
                    mobileMenu.classList.remove('opacity-0', 'invisible', '-translate-y-full');
                }, 10);
                updateMobileMenuIcon(true);
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navbar.contains(event.target) && mobileMenu.classList.contains('menu-open')) {
                closeMobileMenu();
            }
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
    }

    // Highlight active page in navbar
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Desktop services dropdown: reliable open/close on hover + click.
    const servicesNavGroups = Array.from(document.querySelectorAll('.services-nav-group'))
        .filter((group) => group.querySelector('.services-mega-dropdown'));

    const closeDesktopServiceDropdowns = () => {
        servicesNavGroups.forEach((group) => {
            group.classList.remove('is-open');
            const trigger = group.querySelector('a.nav-link');
            if (trigger) {
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    };

    servicesNavGroups.forEach((group) => {
        const trigger = group.querySelector('a.nav-link');
        const menu = group.querySelector('.services-mega-dropdown');
        if (!trigger || !menu) return;

        const coverImage = menu.querySelector('.services-dropdown-cover img');
        const defaultCover = coverImage ? (coverImage.getAttribute('data-default-cover') || coverImage.getAttribute('src') || '') : '';
        const previewLinks = menu.querySelectorAll('.services-mega-link[data-cover]');

        const setCoverPreview = (link) => {
            if (!link) return;
            const coverSrc = link.getAttribute('data-cover');
            if (coverImage && coverSrc) {
                coverImage.setAttribute('src', coverSrc);
            }
        };

        const resetCoverPreview = () => {
            if (coverImage && defaultCover) {
                coverImage.setAttribute('src', defaultCover);
            }
        };

        previewLinks.forEach((link) => {
            link.addEventListener('mouseenter', () => setCoverPreview(link));
            link.addEventListener('focus', () => setCoverPreview(link));
            link.addEventListener('blur', resetCoverPreview);
        });

        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-expanded', 'false');

        group.addEventListener('mouseenter', () => {
            if (!desktopNavMedia.matches) return;
            closeDesktopServiceDropdowns();
            group.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
        });

        group.addEventListener('mouseleave', () => {
            if (!desktopNavMedia.matches) return;
            group.classList.remove('is-open');
            trigger.setAttribute('aria-expanded', 'false');
            resetCoverPreview();
        });

        trigger.addEventListener('click', (event) => {
            if (!desktopNavMedia.matches) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            const isOpen = group.classList.contains('is-open');
            if (!isOpen) {
                event.preventDefault();
                closeDesktopServiceDropdowns();
                group.classList.add('is-open');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });

        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                closeDesktopServiceDropdowns();
            });
        });
    });

    document.addEventListener('click', (event) => {
        if (!desktopNavMedia.matches) return;
        if (!servicesNavGroups.some((group) => group.contains(event.target))) {
            closeDesktopServiceDropdowns();
        }
    });

    window.addEventListener('resize', () => {
        if (!desktopNavMedia.matches) {
            closeDesktopServiceDropdowns();
        }
    });

    // Add smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (
                this.matches('a[href="#enquiry-form"]') ||
                this.matches('a[href="contact.html#enquiry-form"]')
            ) {
                return;
            }
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Global enquiry modal for all pages (desktop + mobile)
    const getOrCreateEnquiryModal = () => {
        let modal = document.getElementById('universal-enquiry-modal');
        if (modal) return modal;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div id="universal-enquiry-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm hidden z-[100] flex items-center justify-center p-4">
                <div class="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
                    <div class="bg-gradient-to-r from-accent to-orange-500 px-5 py-4 text-white flex items-center justify-between">
                        <div>
                            <h3 class="text-xl font-bold">Quick Enquiry</h3>
                            <p class="text-xs text-orange-100">Share your requirement and we will call you back.</p>
                        </div>
                        <button type="button" id="universal-enquiry-close" class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center" aria-label="Close enquiry form">
                            <i class="ri-close-line text-sm"></i>
                        </button>
                    </div>
                    <form id="universal-enquiry-form" class="p-5 space-y-3">
                        <div>
                            <label class="block text-sm font-semibold text-primary-dark mb-1">Full Name</label>
                            <input name="name" type="text" required class="w-full px-4 py-2.5 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent" placeholder="Enter your name">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-primary-dark mb-1">Phone Number</label>
                            <input name="phone" type="tel" required class="w-full px-4 py-2.5 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent" placeholder="+1 XXX XXX XXXX">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-primary-dark mb-1">Email (Optional)</label>
                            <input name="email" type="email" class="w-full px-4 py-2.5 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent" placeholder="you@example.com">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-primary-dark mb-1">Requirement</label>
                            <textarea name="message" rows="3" required class="w-full px-4 py-2.5 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-none" placeholder="Service type, pickup city, dates..."></textarea>
                        </div>
                        <button type="submit" class="w-full btn-primary text-white py-2.5 rounded-xl font-bold">
                            Submit Enquiry
                        </button>
                    </form>
                </div>
            </div>
        `;

        modal = wrapper.firstElementChild;
        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('#universal-enquiry-close');
        const form = modal.querySelector('#universal-enquiry-form');

        const closeModal = () => {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Our team will contact you shortly.');
            form.reset();
            closeModal();
        });

        return modal;
    };

    const openEnquiryModal = () => {
        const modal = getOrCreateEnquiryModal();
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    };

    // Enquiry buttons in navbar should always open popup instead of navigating.
    const navbarEnquiryTriggers = document.querySelectorAll(
        '#navbar a[href="#enquiry-form"], #navbar a[href="contact.html#enquiry-form"]'
    );
    navbarEnquiryTriggers.forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openEnquiryModal();
        });
    });
});
