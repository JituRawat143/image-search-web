let currentPage = 1;
let lastQuery = '';

function searchImages() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    if (query === '') {
        alert('Please enter a search term.');
        return;
    }

    
    if (query !== lastQuery) {
        currentPage = 1;
        document.getElementById('imageContainer').innerHTML = '';
    }

    lastQuery = query;

    const apiKey = 'Fa1U4fP53h508vwQ-3heXRlmxknIisgNfZID6-kTFrA'; // Replace with your Unsplash API key
    const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&page=${currentPage}&client_id=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results.length === 0 && currentPage === 1) {
                document.getElementById('imageContainer').innerHTML = '<p>No results found.</p>';
                document.querySelector('.button-container').style.display = 'none';
                return;
            }

            displayImages(data.results);

            const buttonContainer = document.querySelector('.button-container');
            buttonContainer.style.display = 'block';
        })
        .catch(error => console.error('Error fetching images:', error));
}

function displayImages(images) {
    const imageContainer = document.getElementById('imageContainer');

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.regular;
        imgElement.alt = image.alt_description;

        const cardElement = document.createElement('div');
        cardElement.classList.add('image-card');
        cardElement.appendChild(imgElement);

        imageContainer.appendChild(cardElement);
    });

    currentPage++;
}

document.addEventListener('DOMContentLoaded', function() {
    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.style.display = 'none';
});

function showMore() {
    searchImages(); // Uses lastQuery and currentPage++
}
