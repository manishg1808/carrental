// Footer interactions and global floating actions
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const footer = ensureFooter();
        if (footer) {
            enhanceFooterColumns(footer);
            enhanceFooterBottomLinks(footer);
        }

        bindFooterNewsletterForms();
        initFloatingQuickActions();
    });

    function ensureFooter() {
        const existingFooter = document.querySelector('footer');
        if (existingFooter) {
            return existingFooter;
        }

        const footer = document.createElement('footer');
        footer.className = 'relative overflow-hidden bg-slate-950 text-slate-200 py-10 mt-16';
        footer.innerHTML = `
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute -top-20 -left-20 w-72 h-72 bg-accent/15 rounded-full blur-3xl"></div>
                <div class="absolute -bottom-24 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
            </div>
            <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 sm:p-5 mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <p class="text-xs uppercase tracking-[0.25em] text-orange-200 font-semibold">Drive Today</p>
                        <h3 class="text-2xl font-extrabold text-white mt-1">Need Transportation Right Now?</h3>
                        <p class="text-slate-300 text-sm mt-1">Talk to our booking team and get instant availability.</p>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <a href="tel:+14073414310" class="inline-flex items-center px-5 py-2.5 rounded-xl bg-white text-primary-dark font-bold hover:bg-accent hover:text-white transition">
                            <i class="ri-phone-fill mr-2 text-xs"></i>Call Now
                        </a>
                        <a href="contact.html#enquiry-form" class="inline-flex items-center px-5 py-2.5 rounded-xl border border-white/30 text-white font-bold hover:bg-white hover:text-primary-dark transition">
                            <i class="ri-mail-line mr-2 text-xs"></i>Quick Enquiry
                        </a>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"></div>
                <div class="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
                    <p>&copy; 2026 PrimeTransit. All rights reserved.</p>
                    <div class="flex items-center gap-4">
                        <a href="about.html" class="hover:text-accent transition">Company</a>
                        <a href="service.html" class="hover:text-accent transition">Services</a>
                        <a href="contact.html" class="hover:text-accent transition">Support</a>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(footer);
        return footer;
    }

    function enhanceFooterColumns(footer) {
        const columnsGrid = findFooterColumnsGrid(footer);
        if (!columnsGrid) return;

        columnsGrid.classList.remove('xl:grid-cols-4');
        columnsGrid.classList.add('xl:grid-cols-5');

        columnsGrid.innerHTML = `
            <div>
                <a href="index.html" class="inline-flex items-center space-x-3">
                    <span class="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden shadow-lg">
                            <img src="images/logo.png" alt="Luxury Fleet Services logo" class="w-8 h-8 object-contain">
                        </span>
                    <span>
                        <span class="block text-xl font-extrabold text-white">PrimeTransit</span>
                        <span class="block text-xs font-semibold -mt-0.5 bg-gradient-to-r from-[#FFD700] via-[#C9A227] to-black bg-clip-text text-transparent">Luxury Fleet Services</span>
                    </span>
                </a>
                <p class="text-slate-300 text-sm mt-4 leading-relaxed">Reliable transportation solutions for airport rides, cruise transfers, corporate travel, and family trips across major routes.</p>
                <div class="flex items-center gap-3 mt-5">
                    <a href="#" aria-label="Facebook" class="w-9 h-9 rounded-full border border-white/20 text-slate-200 hover:bg-accent hover:border-accent hover:text-white flex items-center justify-center transition"><i class="ri-facebook-fill text-sm"></i></a>
                    <a href="#" aria-label="Instagram" class="w-9 h-9 rounded-full border border-white/20 text-slate-200 hover:bg-accent hover:border-accent hover:text-white flex items-center justify-center transition"><i class="ri-instagram-line text-sm"></i></a>
                    <a href="#" aria-label="X" class="w-9 h-9 rounded-full border border-white/20 text-slate-200 hover:bg-accent hover:border-accent hover:text-white flex items-center justify-center transition"><i class="ri-twitter-x-line text-sm"></i></a>
                    <a href="#" aria-label="YouTube" class="w-9 h-9 rounded-full border border-white/20 text-slate-200 hover:bg-accent hover:border-accent hover:text-white flex items-center justify-center transition"><i class="ri-youtube-fill text-sm"></i></a>
                </div>
            </div>

            <div>
                <h4 class="text-white font-bold text-lg mb-4">Quick Links</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="index.html" class="text-slate-300 hover:text-accent transition">Home</a></li>
                    <li><a href="car-listing.html" class="text-slate-300 hover:text-accent transition">Fleet</a></li>
                    <li><a href="service.html" class="text-slate-300 hover:text-accent transition">Services</a></li>
                    <li><a href="about.html" class="text-slate-300 hover:text-accent transition">About Us</a></li>
                    <li><a href="contact.html" class="text-slate-300 hover:text-accent transition">Contact</a></li>
                    <li><a href="images.html" class="text-slate-300 hover:text-accent transition">Images</a></li>
                    <li><a href="blog.html" class="text-slate-300 hover:text-accent transition">Blog</a></li>
                </ul>
            </div>

            <div>
                <h4 class="text-white font-bold text-lg mb-4">Services</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="service.html#detail-airport-pickup-drop" class="text-slate-300 hover:text-accent transition">Orlando Airport Transportation</a></li>
                    <li><a href="service.html#detail-with-driver-car" class="text-slate-300 hover:text-accent transition">Walt Disney World Transportation</a></li>
                    <li><a href="service.html#detail-family-car-options" class="text-slate-300 hover:text-accent transition">Universal Orlando Transportation</a></li>
                    <li><a href="service.html#detail-daily-car-rental" class="text-slate-300 hover:text-accent transition">Port Canaveral Cruise Transportation</a></li>
                    <li><a href="service.html#detail-corporate-rentals" class="text-slate-300 hover:text-accent transition">Corporate Transportation</a></li>
                </ul>
            </div>

            <div>
                <h4 class="text-white font-bold text-lg mb-4">Fleet</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="car-listing.html" class="text-slate-300 hover:text-accent transition">All Fleet Vehicles</a></li>
                    <li><a href="car-listing.html?category=SUV" class="text-slate-300 hover:text-accent transition">SUV Fleet</a></li>
                    <li><a href="car-listing.html?category=Sedan" class="text-slate-300 hover:text-accent transition">Sedan Fleet</a></li>
                    <li><a href="car-listing.html?category=Hatchback" class="text-slate-300 hover:text-accent transition">Hatchback Fleet</a></li>
                    <li><a href="car-listing.html?category=MUV" class="text-slate-300 hover:text-accent transition">MUV Fleet</a></li>
                    <li><a href="car-listing.html?category=Luxury" class="text-slate-300 hover:text-accent transition">Luxury Fleet</a></li>
                    <li><a href="car-listing.html?fuel=Electric" class="text-slate-300 hover:text-accent transition">Electric Fleet</a></li>
                    <li><a href="car-listing.html?available=true" class="text-slate-300 hover:text-accent transition">Available Fleet</a></li>
                </ul>
            </div>

            <div>
                <h4 class="text-white font-bold text-lg mb-4">Contact Info</h4>
                    <div class="space-y-2 text-sm text-slate-300 mb-4">
                        <p><i class="ri-phone-fill text-accent mr-2"></i><a href="tel:+14073414310" class="hover:text-accent transition">+1-4073414310</a></p>
                        <p><i class="ri-mail-line text-accent mr-2"></i><a href="mailto:support@luxuryfleetservices.com" class="hover:text-accent transition">support@luxuryfleetservices.com</a></p>
                        <p><i class="ri-map-pin-line text-accent mr-2"></i>5549 Bay Lagoo Cir, Orlando FL 32819</p>
                    </div>
                <form class="footer-newsletter-form flex gap-2" action="#" method="post">
                    <input type="email" required placeholder="Your email" class="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent">
                    <button type="submit" class="px-4 py-2 rounded-lg bg-accent text-white font-semibold hover:bg-orange-500 transition">Join</button>
                </form>
            </div>
        `;
    }

    function findFooterColumnsGrid(footer) {
        const grids = footer.querySelectorAll('div.grid');
        return Array.from(grids).find(function (grid) {
            return grid.classList.contains('grid-cols-1') &&
                grid.classList.contains('md:grid-cols-2') &&
                grid.classList.contains('gap-8') &&
                (grid.classList.contains('xl:grid-cols-4') || grid.classList.contains('xl:grid-cols-5'));
        });
    }

    function enhanceFooterBottomLinks(footer) {
        const linkGroups = footer.querySelectorAll('div.flex.items-center.gap-4');
        const bottomLinks = Array.from(linkGroups).find(function (group) {
            return group.querySelector('a[href="about.html"]');
        });

        if (!bottomLinks) return;

        bottomLinks.innerHTML = `
            <a href="about.html" class="hover:text-accent transition">Company</a>
            <a href="service.html" class="hover:text-accent transition">Services</a>
            <a href="images.html" class="hover:text-accent transition">Images</a>
            <a href="blog.html" class="hover:text-accent transition">Blog</a>
            <a href="contact.html" class="hover:text-accent transition">Support</a>
        `;
    }

    function bindFooterNewsletterForms() {
        const forms = document.querySelectorAll('.footer-newsletter-form');
        forms.forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                const emailInput = form.querySelector('input[type="email"]');
                const email = emailInput ? emailInput.value.trim() : '';

                if (!email) {
                    alert('Please enter your email address.');
                    return;
                }

                alert('Thanks! You are subscribed for PrimeTransit updates.');
                form.reset();
            });
        });
    }

    function initFloatingQuickActions() {
        if (document.getElementById('floating-action-stack')) {
            return;
        }

        const stack = document.createElement('div');
        stack.id = 'floating-action-stack';
        stack.className = 'floating-action-stack';
        stack.innerHTML = `
            <button type="button"
                    id="scroll-to-top-btn"
                    class="floating-action-btn floating-action-btn--top"
                    aria-label="Scroll to top"
                    title="Scroll to top">
                <i class="ri-arrow-up-line" aria-hidden="true"></i>
            </button>
            <a href="https://wa.me/14073414310?text=Hi%20PrimeTransit%2C%20I%20want%20to%20book%20transportation."
               target="_blank"
               rel="noopener noreferrer"
               class="floating-action-btn floating-action-btn--whatsapp"
               aria-label="Chat on WhatsApp"
               title="Chat on WhatsApp">
                <i class="ri-whatsapp-line" aria-hidden="true"></i>
            </a>
        `;

        document.body.appendChild(stack);

        const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
        if (!scrollToTopBtn) {
            return;
        }

        const toggleScrollToTopButton = function () {
            if (window.scrollY > 260) {
                scrollToTopBtn.classList.add('is-visible');
            } else {
                scrollToTopBtn.classList.remove('is-visible');
            }
        };

        toggleScrollToTopButton();

        window.addEventListener('scroll', toggleScrollToTopButton, { passive: true });
        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
})();
