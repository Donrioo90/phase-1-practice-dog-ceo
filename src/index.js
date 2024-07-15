console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.getElementById('dog-image-container');
    const breedsContainer = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');
  
    // Fetch random dog images
    fetch(imgUrl)
      .then(response => response.json())
      .then(data => {
        data.message.forEach(imgUrl => {
          const img = document.createElement('img');
          img.src = imgUrl;
          imageContainer.appendChild(img);
        });
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  
    let allBreeds = [];
  
    // Fetch all dog breeds
    fetch(breedUrl)
      .then(response => response.json())
      .then(data => {
        allBreeds = data.message;
        renderBreeds(allBreeds);
        populateDropdown();
      })
      .catch(error => {
        console.error('Error fetching breeds:', error);
      });
  
    function renderBreeds(breeds) {
      breedsContainer.innerHTML = '';
      for (const breed in breeds) {
        const li = document.createElement('li');
        li.textContent = breed;
        
        // Add click event listener to change font color to blue
        li.addEventListener('click', function() {
          li.style.color = 'blue';
        });
  
        breedsContainer.appendChild(li);
      }
    }
  
    function populateDropdown() {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (const letter of letters) {
        const option = document.createElement('option');
        option.value = letter;
        option.textContent = letter;
        breedDropdown.appendChild(option);
      }
    }
  
    breedDropdown.addEventListener('change', function(event) {
      const selectedLetter = event.target.value;
      const filteredBreeds = {};
  
      for (const breed in allBreeds) {
        if (breed.startsWith(selectedLetter.toLowerCase())) {
          filteredBreeds[breed] = allBreeds[breed];
        }
      }
  
      renderBreeds(filteredBreeds);
    });
  });
  