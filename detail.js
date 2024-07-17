document.addEventListener('DOMContentLoaded', async () => {
    const itemList = document.getElementById('itemList');
    const itemDetail = document.getElementById('itemDetail');
    const params = new URLSearchParams(window.location.search);
    const itemId = parseInt(params.get('id'), 10);

    try {
        const response = await fetch('data.json');
        const data = await response.json();

        if (!itemId) {
            itemDetail.innerHTML = '<p>Select an item from the list</p>';
            return;
        }

        const item = data.find(item => item.id === itemId);

        if (item) {
            itemDetail.innerHTML = `
                <img class="main-image" src="${item.image}" alt="Image of ${item.name}">
                <div class="title-holder">
                    <h1 class="title">${item.name}</h1>
                    <h1 class="title outline">${item.name}</h1>
                </div>
                <p>Categories: ${item.categories.join(', ')}</p>
                <div>${item.description}</div>
            `;
        } else {
            itemDetail.innerHTML = '<p>Item not found</p>';
        }

        const nextItem = data.find(item => item.id === itemId + 1);

        if (nextItem) {
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('item-container');

            const itemLinkFront = document.createElement('a');
            itemLinkFront.href = `?id=${nextItem.id}`;
            itemLinkFront.textContent = nextItem.name;
            itemLinkFront.classList.add('item-link', 'first');

            const itemLinkBack = document.createElement('a');
            itemLinkBack.href = `?id=${nextItem.id}`;
            itemLinkBack.textContent = nextItem.name;
            itemLinkBack.classList.add('item-link', 'second');

            itemContainer.appendChild(itemLinkFront);
            itemContainer.appendChild(itemLinkBack);
            itemList.appendChild(itemContainer);
        } else {
            itemList.innerHTML = '<p>No next items</p>';
        }
    } 
    catch (error) {
        console.error('Error fetching the data:', error);
        itemDetail.innerHTML = '<p>Error loading item details</p>';
    }
});
