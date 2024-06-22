document.addEventListener('DOMContentLoaded', async () => {
  const itemDetail = document.getElementById('itemDetail');
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get('id');

  if (!itemId) {
      itemDetail.innerHTML = '<p>Invalid item ID</p>';
      return;
  }

  try {
      const response = await fetch('data.json');
      const data = await response.json();
      const item = data.find(item => item.id == itemId);

      if (item) {
          itemDetail.innerHTML = `
              <h1>${item.name}</h1>
              <p>Category: ${item.category}</p>
              <p>${item.description}</p>
          `;
      } else {
          itemDetail.innerHTML = '<p>Item not found</p>';
      }
  } catch (error) {
      console.error('Error fetching the data:', error);
      itemDetail.innerHTML = '<p>Error loading item details</p>';
  }
});
