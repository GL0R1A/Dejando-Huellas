document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://api.mascotas.com/razas/get-razas';
    const dogCardsContainer = document.getElementById('dogCardsContainer');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const currentPageElement = document.getElementById('currentPage');
    const filterAllButton = document.getElementById('filterAll');
    const filterDogsButton = document.getElementById('filterDogs');
    const filterCatsButton = document.getElementById('filterCats');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const petModal = new bootstrap.Modal(document.getElementById('petModal'));
    const modalPetImage = document.getElementById('modalPetImage');
    const modalPetName = document.getElementById('modalPetName');
    const modalPetDescription = document.getElementById('modalPetDescription');
    let currentPage = 1;
    const itemsPerPage = 10;
    let pets = [];
    let filteredPets = [];
  
    async function fetchPets() {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        if (result.statusCode === 200) {
          pets = result.data;
          filteredPets = pets;
          renderPets();
        } else {
          console.error('Error fetching data from API');
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    }
  
    function renderPets() {
      dogCardsContainer.innerHTML = '';
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentPets = filteredPets.slice(startIndex, endIndex);
  
      currentPets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.className = 'col-md-4 mb-4';
        petCard.innerHTML = `
          <div class="card" data-url="${pet.url}">
            <img src="${pet.portada}" class="card-img-top" alt="${pet.nombre}">
            <div class="card-body">
              <h5 class="card-title">${pet.nombre}</h5>
            </div>
          </div>
        `;
        petCard.querySelector('.card').addEventListener('click', function() {
          fetchPetDetails(pet.url);
        });
        dogCardsContainer.appendChild(petCard);
      });
  
      updatePagination();
    }
  
    async function fetchPetDetails(url) {
      try {
        const response = await fetch(`https://api.mascotas.com/razas/raza/${url}`);
        const result = await response.json();
        if (result.statusCode === 200) {
          const pet = result.data[0];
          modalPetImage.src = pet.portada;
          modalPetName.textContent = pet.nombre;
          modalPetDescription.innerHTML = pet.descripcion;
          petModal.show();
        } else {
          console.error('Error fetching pet details from API');
        }
      } catch (error) {
        console.error('Error fetching pet details from API:', error);
      }
    }
  
    function updatePagination() {
      currentPageElement.textContent = currentPage;
      prevPageButton.disabled = currentPage === 1;
      nextPageButton.disabled = currentPage * itemsPerPage >= filteredPets.length;
    }
  
    function filterPets(species) {
      // Remover clase 'active' de todos los botones de filtro
      filterAllButton.classList.remove('active');
      filterDogsButton.classList.remove('active');
      filterCatsButton.classList.remove('active');
  
      if (species === 'all') {
        filteredPets = pets;
        filterAllButton.classList.add('active');
      } else if (species === 1) {
        filteredPets = pets.filter(pet => pet.id_especie === species);
        filterDogsButton.classList.add('active');
      } else if (species === 2) {
        filteredPets = pets.filter(pet => pet.id_especie === species);
        filterCatsButton.classList.add('active');
      }
      currentPage = 1;
      renderPets();
    }
  
    function searchPets() {
      const query = searchInput.value.toLowerCase();
      filteredPets = pets.filter(pet => pet.nombre.toLowerCase().includes(query));
      currentPage = 1;
      renderPets();
    }
  
    prevPageButton.addEventListener('click', function() {
      if (currentPage > 1) {
        currentPage--;
        renderPets();
      }
    });
  
    nextPageButton.addEventListener('click', function() {
      if (currentPage * itemsPerPage < filteredPets.length) {
        currentPage++;
        renderPets();
      }
    });
  
    filterAllButton.addEventListener('click', function() {
      filterPets('all');
    });
  
    filterDogsButton.addEventListener('click', function() {
      filterPets(1);
    });
  
    filterCatsButton.addEventListener('click', function() {
      filterPets(2);
    });
  
    searchButton.addEventListener('click', function() {
      searchPets();
    });
  
    searchInput.addEventListener('input', function() {
      searchPets();
    });
  
    fetchPets();
  });
  