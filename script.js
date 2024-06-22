document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('searchBar');
  const categoryButtonsContainer = document.getElementById('categoryButtons');
  const itemList = document.getElementById('itemList');

  let data = [];
  let categories = [];
  let selectedCategory = '';
  let searchQuery = '';

  async function fetchData() {
      try {
          const response = await fetch('data.json');
          data = await response.json();
          categories = [...new Set(data.flatMap(item => item.categories))];
          renderCategoryButtons();
          renderList();
      } catch (error) {
          console.error('Error fetching the data:', error);
      }
  }

  function renderList() {
      itemList.innerHTML = '';
      const filteredData = data.filter(item => {
          const matchesCategory = selectedCategory === '' || item.categories.includes(selectedCategory);
          const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesCategory && matchesSearch;
      });
      filteredData.forEach(item => {
          const li = document.createElement('li');
          li.textContent = `${item.name} (${item.categories.join(', ')})`;
          li.addEventListener('click', () => {
              window.location.href = `detail.html?id=${item.id}`;
          });
          itemList.appendChild(li);
      });
  }

  function renderCategoryButtons() {
      categoryButtonsContainer.innerHTML = '';
      const allButton = document.createElement('button');
      allButton.textContent = 'All';
      allButton.className = 'category-button' + (selectedCategory === '' ? ' active' : '');
      allButton.addEventListener('click', () => {
          selectedCategory = '';
          renderCategoryButtons();
          renderList();
      });
      categoryButtonsContainer.appendChild(allButton);

      categories.forEach(category => {
          const button = document.createElement('button');
          button.textContent = category;
          button.className = 'category-button' + (category === selectedCategory ? ' active' : '');
          button.addEventListener('click', () => {
              selectedCategory = category;
              renderCategoryButtons();
              renderList();
          });
          categoryButtonsContainer.appendChild(button);
      });
  }

  searchBar.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderList();
  });

  fetchData();
});