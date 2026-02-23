document.addEventListener('DOMContentLoaded', function () {
    const modalConfigs = [
        { triggerId: 'disney-explore-btn', modalId: 'disney-details-modal', closeId: 'disney-modal-close' },
        { triggerId: 'universal-explore-btn', modalId: 'universal-details-modal', closeId: 'universal-modal-close' },
        { triggerId: 'port-explore-btn', modalId: 'port-details-modal', closeId: 'port-modal-close' },
        { triggerId: 'corporate-explore-btn', modalId: 'corporate-details-modal', closeId: 'corporate-modal-close' }
    ];

    const closeModal = function (modal) {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('overflow-hidden');
    };

    const openModal = function (modal) {
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overflow-hidden');
    };

    modalConfigs.forEach(function (config) {
        const trigger = document.getElementById(config.triggerId);
        const modal = document.getElementById(config.modalId);
        const closeBtn = document.getElementById(config.closeId);

        if (!trigger || !modal || !closeBtn) return;

        trigger.addEventListener('click', function () {
            openModal(modal);
        });

        closeBtn.addEventListener('click', function () {
            closeModal(modal);
        });

        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;

        modalConfigs.forEach(function (config) {
            const modal = document.getElementById(config.modalId);
            if (modal && !modal.classList.contains('hidden')) {
                closeModal(modal);
            }
        });
    });
});
