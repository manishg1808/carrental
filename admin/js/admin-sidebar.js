document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('admin-sidebar');
    const openBtn = document.getElementById('sidebar-toggle');
    const closeBtn = document.getElementById('sidebar-close');
    const overlay = document.getElementById('sidebar-overlay');
    const nav = sidebar ? sidebar.querySelector('nav') : null;

    if (!sidebar || !openBtn || !overlay) return;

    const items = [
        { href: 'index.html', icon: 'fa-chart-column', label: 'Overview' },
        { href: 'car-list.html', icon: 'fa-list', label: 'Car List' },
        { href: 'categories.html', icon: 'fa-layer-group', label: 'Categories' },
        { href: 'brands.html', icon: 'fa-tags', label: 'Brands' },
        { href: 'images.html', icon: 'fa-images', label: 'Images' }
    ];

    function getCurrentPage() {
        const rawPath = window.location.pathname || '';
        const cleanPath = rawPath.split('?')[0].split('#')[0];
        const page = cleanPath.split('/').pop() || 'index.html';
        return page.toLowerCase();
    }

    function renderNav() {
        if (!nav) return;
        const currentPage = getCurrentPage();

        nav.innerHTML = items.map(function (item) {
            const isActive = currentPage === item.href.toLowerCase();
            return '<a class="menu-item ' + (isActive ? 'active' : '') + '" href="' + item.href + '">' +
                '<i class="fas ' + item.icon + '"></i>' +
                '<span>' + item.label + '</span>' +
            '</a>';
        }).join('');
    }

    renderNav();

    function openSidebar() {
        document.body.classList.add('sidebar-open');
    }

    function closeSidebar() {
        document.body.classList.remove('sidebar-open');
    }

    openBtn.addEventListener('click', openSidebar);

    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }

    overlay.addEventListener('click', closeSidebar);

    sidebar.addEventListener('click', function (event) {
        const link = event.target.closest('a');
        if (link) {
            closeSidebar();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1024) {
            closeSidebar();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeSidebar();
        }
    });
});
