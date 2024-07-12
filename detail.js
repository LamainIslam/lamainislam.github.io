document.addEventListener('DOMContentLoaded', async () => {
    const itemList = document.getElementById('itemList');
    const itemDetail = document.getElementById('itemDetail');
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('id');

    try {
        const response = await fetch('data.json');
        const data = await response.json();

        data.forEach(item => {
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('item-container');

            const itemLinkFront = document.createElement('a');
            itemLinkFront.href = `?id=${item.id}`;
            itemLinkFront.textContent = item.name;
            itemLinkFront.classList.add('item-link', 'first');
            if (item.id == itemId) {
                itemLinkFront.classList.add('current');
            }

            const itemLinkBack = document.createElement('a');
            itemLinkBack.href = `?id=${item.id}`;
            itemLinkBack.textContent = item.name;
            itemLinkBack.classList.add('item-link', 'second');
            if (item.id == itemId) {
                itemLinkBack.classList.add('current');
            }

            itemContainer.appendChild(itemLinkFront);
            itemContainer.appendChild(itemLinkBack);
            itemList.appendChild(itemContainer);
        });

        if (!itemId) {
            itemDetail.innerHTML = '<p>Select an item from the list</p>';
            return;
        }

        const item = data.find(item => item.id == itemId);

        if (item) {
            itemDetail.innerHTML = `
                <img class="main-image" src="${item.image}" alt="Image of ${item.name}">
                <div class="title-holder">
                <h1>${item.name}</h1>
                <h1 class="outline">${item.name}</h1>
                </div>
                <p>Categories: ${item.categories.join(', ')}</p>
                <div>${item.description}</div>
            `;
            
        } else {
            itemDetail.innerHTML = '<p>Item not found</p>';
        }
    } 
    catch (error) {
        console.error('Error fetching the data:', error);
        itemDetail.innerHTML = '<p>Error loading item details</p>';
    }
});