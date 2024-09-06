document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const categoryDropdown = document.getElementById('categoryDropdown');
    const itemList = document.getElementById('itemList');
    const loader = document.getElementById('loader');
    const menuBtn = document.querySelector('.menu-btn');
    const hamburger = document.querySelector('.hamburger');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    
    let selectedCategory = '';
    let searchQuery = '';

    function filterItems() {
        const items = Array.from(document.querySelectorAll('.item-container'));
        items.forEach(item => {
            const itemName = item.querySelector('.item-front').textContent.toLowerCase();
            const itemCategories = item.getAttribute('data-categories').split(',');

            const matchesCategory = selectedCategory === '' || itemCategories.includes(selectedCategory);
            const matchesSearch = itemName.includes(searchQuery.toLowerCase());

            if (matchesCategory && matchesSearch) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    searchBar.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        filterItems();
    });

    categoryDropdown.addEventListener('change', (e) => {
        selectedCategory = e.target.value;
        filterItems();
    });

    // Hamburger menu toggle
    menuBtn.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };

    // Initially load and display items
    filterItems();
});