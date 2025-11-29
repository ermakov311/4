document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search__input');
    const courseCards = Array.from(document.querySelectorAll('.course-card'));
    const tabsContainer = document.querySelector('.tabs__list');
    const loadMoreBtn = document.querySelector('.courses__load-more');

    const PAGE_SIZE = 6;
    let visibleCount = PAGE_SIZE;
    let currentCategory = 'all';

    function updateVisibleCards() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        const filteredCards = courseCards.filter(card => {
            const title = card.querySelector('.course-card__title').textContent.toLowerCase();
            const category = card.dataset.category;

            const matchesSearch = searchTerm === '' || title.includes(searchTerm) || category.includes(searchTerm);
            const matchesCategory = currentCategory === 'all' || category === currentCategory;

            return matchesSearch && matchesCategory;
        });

        courseCards.forEach(card => card.classList.add('hidden'));

        filteredCards.forEach((card, index) => {
            if (index < visibleCount) {
                card.classList.remove('hidden');
            }
        });

        if (filteredCards.length <= visibleCount) {
            loadMoreBtn.parentElement.classList.add('hidden');
        } else {
            loadMoreBtn.parentElement.classList.remove('hidden');
        }
    }

    function handleSearch() {
        visibleCount = PAGE_SIZE; 
        updateVisibleCards();
    }

    searchInput.addEventListener('input', handleSearch);

    tabsContainer.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = e.target.closest('.tabs__item');
        if (!tab) return;

        tabsContainer.querySelector('.tabs__item--active').classList.remove('tabs__item--active');
        tab.classList.add('tabs__item--active');

        currentCategory = tab.dataset.category;
        visibleCount = PAGE_SIZE;
        updateVisibleCards();
    });

    loadMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        visibleCount += PAGE_SIZE;
        updateVisibleCards();
    });


    updateVisibleCards();
});