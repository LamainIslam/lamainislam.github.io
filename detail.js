document.addEventListener('DOMContentLoaded', async () => {
    const itemList = document.getElementById('itemList');
    const itemDetail = document.getElementById('itemDetail');
    const params = new URLSearchParams(window.location.search);
    const itemId = parseInt(params.get('id'), 10);

    // const colorThemes = [
    //     {
    //         '--color-1': '#9191E9;',
    //         '--color-2': '#9191E97a;',
    //         '--color-3': '#eeeeee;',
    //         '--color-4': '#9191E9b3;',
    //         '--color-5': '#202020;',
    //         '--color-6': '#6adbbc;',
    //     },
    //     {
    //         '--color-1': '#ff6f61',
    //         '--color-2': '#ff6f617a',
    //         '--color-3': '#f2f2f2',
    //         '--color-4': '#ff6f61b3',
    //         '--color-5': '#333333',
    //         '--color-6': '#79c7c5',
    //     },
    //     {
    //         '--color-1': '#4682b4',
    //         '--color-2': '#4682b47a',
    //         '--color-3': '#fafafa',
    //         '--color-4': '#4682b4b3',
    //         '--color-5': '#2c2c2c',
    //         '--color-6': '#f08080',
    //     },{
    //         '--color-1': '#29c276',
    //         '--color-2': '#29c2767a',     
    //         '--color-3': '#efefef',       
    //         '--color-4': '#29c276b3',     
    //         '--color-5': '#202020',       
    //         '--color-6': '#c22929',       
    //     },
    //     {
    //         '--color-1': '#c22929',
    //         '--color-2': '#c229297a',     
    //         '--color-3': '#ffffff',       
    //         '--color-4': '#c22929b3',     
    //         '--color-5': '#202020',       
    //         '--color-6': '#29c276',       
    //     },
    //     {
    //         '--color-1': '#2966c2',
    //         '--color-2': '#2966c27a',     
    //         '--color-3': '#f2f2f2',       
    //         '--color-4': '#2966c2b3',     
    //         '--color-5': '#202020',       
    //         '--color-6': '#ff4400',       
    //     },
    // ];

    // Function to apply a theme
    // const applyTheme = (theme) => {
    //     const root = document.documentElement;
    //     for (const [key, value] of Object.entries(theme)) {
    //         root.style.setProperty(key, value);
    //     }
    // };

    // // Randomly select a theme and apply it
    // const randomTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)];
    // applyTheme(randomTheme);

    try {
        const response = await fetch('data.json');
        const data = await response.json();

        if (!itemId) {
            itemDetail.innerHTML = '<p>Select an item from the list</p>';
            return;
        }

        const item = data.find(item => item.id === itemId);

        if (item) {
            let carouselHtml = '';

            // Check if there are images
            if (item.image.length > 1) {
                // Create the carousel structure if there are multiple images
                carouselHtml = `
                    <div class="carousel">
                        <div class="carousel-images">
                `;

                // Inject images into the carousel
                item.image.forEach(imgSrc => {
                    carouselHtml += `<img src="${imgSrc}" alt="Image of ${item.name}">`;
                });

                // Close the carousel structure and add controls
                carouselHtml += `
                        </div>
                        <div class="carousel-controls">
                            <button class="carousel-prev">❮</button>
                            <button class="carousel-next">❯</button>
                        </div>
                    </div>
                `;
            } else if (item.image.length === 1) {
                // If there is only one image, just display it without the carousel controls
                carouselHtml = `<img class="single-image" src="${item.image[0]}" alt="Image of ${item.name}">`;
            } else {
                // If there are no images, you could display a placeholder or nothing at all
                carouselHtml = `<div class="no-images"></div>`;
            }

            // Append the carousel or image and other item details to the itemDetail element
            itemDetail.innerHTML = `
                <div class="img-holder">
                    ${carouselHtml}
                </div>
                <div class="title-holder">
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <!-- <h1 class="title outline">${item.name}</h1> -->
                </div>
                <div class="title-holder left-scroller">
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <h1 class="title">${item.name} •</h1>
                    <!-- <h1 class="title outline">${item.name}</h1> -->
                </div>
                <p class="categories">
                    Categories: 
                    ${item.categories.map(category => `<span class="category-item">${category}</span>`).join(' ')}
                </p>
                <div class="description">${item.description}</div>
            `;

            // Add event listeners for the carousel controls if there are multiple images
            if (item.image.length > 1) {
                let currentSlide = 0;
                const images = document.querySelector('.carousel-images');
                const totalSlides = item.image.length;

                document.querySelector('.carousel-prev').addEventListener('click', () => {
                    currentSlide = (currentSlide > 0) ? currentSlide - 1 : totalSlides - 1;
                    updateCarousel();
                });

                document.querySelector('.carousel-next').addEventListener('click', () => {
                    currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
                    updateCarousel();
                });

                function updateCarousel() {
                    images.style.transform = `translateX(-${currentSlide * 100}%)`;
                }
            }
        } else {
            itemDetail.innerHTML = '<p>Item not found</p>';
        }

        // Clear the item list at the beginning
        itemList.innerHTML = '';

        const createItemContainer = (item, linkText, extraClass) => {
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('item-container', extraClass);

            const itemLinkFront = document.createElement('a');
            itemLinkFront.href = `?id=${item.id}`;
            itemLinkFront.textContent = linkText;
            itemLinkFront.classList.add('item-link', 'first');

            const itemLinkBack = document.createElement('a');
            itemLinkBack.href = `?id=${item.id}`;
            itemLinkBack.textContent = item.name;
            itemLinkBack.classList.add('item-link', 'second');

            itemContainer.appendChild(itemLinkFront);
            itemContainer.appendChild(itemLinkBack);
            itemList.appendChild(itemContainer);
        };

        const preItem = data.find(item => item.id === itemId - 1);
        if (preItem) {
            createItemContainer(preItem, 'Previous Project', 'previous-item');
        }

        const nextItem = data.find(item => item.id === itemId + 1);
        if (nextItem) {
            createItemContainer(nextItem, 'Next Project', 'next-item');
        }
    } catch (error) {
        console.error('Error fetching the data:', error);
        itemDetail.innerHTML = '<p>Error loading item details</p>';
    }
});