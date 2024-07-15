document.addEventListener("DOMContentLoaded", function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
  
    // Fetch dog images
    fetchDogImages(imgUrl);
  
    // Fetch dog breeds and render them
    fetchDogBreeds(breedUrl);
  
    // Add event listener to breed dropdown
    const breedDropdown = document.getElementById('breed-dropdown');
    breedDropdown.addEventListener('change', function() {
      filterBreedsByLetter(this.value);
    });
  });
  
  function fetchDogImages(imgUrl) {
    fetch(imgUrl)
      .then(response => response.json())
      .then(data => {
        const images = data.message; // Array of image URLs
        const container = document.getElementById('dog-image-container');
  
        images.forEach(imageUrl => {
          const img = document.createElement('img');
          img.src = imageUrl;
          img.alt = 'Dog Image';
          container.appendChild(img);
        });
      })
      .catch(error => {
        console.error('Error fetching dog images:', error);
      });
  }
  
  function fetchDogBreeds(breedUrl) {
    fetch(breedUrl)
      .then(response => response.json())
      .then(data => {
        const breedsObject = data.message; // Object containing all breeds
  
        // Extract all breed names
        const breeds = Object.keys(breedsObject);
  
        // Get the ul element to add breeds
        const breedList = document.getElementById('dog-breeds');
  
        // Clear any existing content
        breedList.innerHTML = '';
  
        // Add each breed as a list item in the ul
        breeds.forEach(breed => {
          const li = document.createElement('li');
          li.textContent = breed;
          breedList.appendChild(li);
  
          // Add click event listener to change font color
          li.addEventListener('click', function() {
            // Change font color (example: red)
            li.style.color = 'red';
          });
        });
      })
      .catch(error => {
        console.error('Error fetching dog breeds:', error);
      });
  }
  
  function filterBreedsByLetter(letter) {
    const breedList = document.getElementById('dog-breeds');
    const breeds = breedList.getElementsByTagName('li');
  
    for (let i = 0; i < breeds.length; i++) {
      const breed = breeds[i];
      const breedName = breed.textContent.toLowerCase();
      if (breedName.startsWith(letter)) {
        breed.style.display = 'list-item'; // Show matching breeds
      } else {
        breed.style.display = 'none'; // Hide non-matching breeds
      }
    }
  }
  
  