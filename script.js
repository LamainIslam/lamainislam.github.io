document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const categoryDropdown = document.getElementById('categoryDropdown');
    const itemList = document.getElementById('itemList');
    const loader = document.getElementById('loader');
    const menuBtn = document.querySelector('.menu-btn');
    const hamburger = document.querySelector('.hamburger');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    
    let data = [];
    let selectedCategory = '';
    let searchQuery = '';

    // // Define color themes
    // const colorThemes = [
    //     {
    //         '--color-1': '#9ca0bc;',
    //         '--color-2': '#9ca0bc7a;',
    //         '--color-3': '#252733;',
    //         '--color-4': '#9ca0bcb3;',
    //         '--color-5': '#202020;',
    //         '--color-6': '#6adbbc;',
    //     }
    // ];

    // Predefined categories
    const predefinedCategories = ["App", "Website", "Solo", "Group", "Others"];

    // // Function to apply a theme
    // const applyTheme = (theme) => {
    //     const root = document.documentElement;
    //     for (const [key, value] of Object.entries(theme)) {
    //         root.style.setProperty(key, value);
    //     }
    // };

    // // Randomly select a theme and apply it
    // const randomTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)];
    // applyTheme(randomTheme);

    async function fetchData() {
        showLoader();
        try {
            const response = await fetch('data.json');
            data = await response.json();
            renderCategoryDropdown();
            renderList();
        } catch (error) {
            console.error('Error fetching the data:', error);
        } finally {
            hideLoader();
        }
    }

    function renderList() {
        itemList.innerHTML = '';
        const filteredData = data.filter(item => {
            const matchesCategory = selectedCategory === '' || predefinedCategories.includes(selectedCategory) && item.categories.includes(selectedCategory);
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
        filteredData.forEach(item => {
            const parentDiv = document.createElement('div');
            parentDiv.className = 'item-container';

            const svgString = `
            <svg class="svg-top-align" width="60" height="60" viewBox="0 0 63 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="48.4258" width="20" height="64.8449" transform="rotate(45 48.4258 0)" fill="#FF4400"/>
                <rect x="43" width="20" height="60" fill="#FF4400"/>
                <rect y="20" width="20" height="60" transform="rotate(-90 0 20)" fill="#FF4400"/>
            </svg>`;

            const li1 = document.createElement('li');
            li1.textContent = `${item.name}`;
            li1.className = 'item-front';
            li1.addEventListener('click', () => {
                window.location.href = `detail.html?id=${item.id}`;
            });

            const li2 = document.createElement('li');
            li2.innerHTML = `${item.name} ${svgString}`; // Set the innerHTML with the text and SVG
            li2.className = 'item-front';
            li2.addEventListener('click', () => {
                window.location.href = `detail.html?id=${item.id}`;
            });

            parentDiv.appendChild(li1);
            parentDiv.appendChild(li2);
            itemList.appendChild(parentDiv);
        });
    }

    function renderCategoryDropdown() {
        categoryDropdown.innerHTML = '<option value="">All</option>';
        predefinedCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryDropdown.appendChild(option);
        });
    }

    searchBar.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderList();
    });

    categoryDropdown.addEventListener('change', (e) => {
        selectedCategory = e.target.value;
        renderList();
    });

    function showLoader() {
        loader.style.display = 'block';
    }

    function hideLoader() {
        loader.style.display = 'none';
    }

    fetchData();

    // Hamburger menu toggle
    menuBtn.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
});
