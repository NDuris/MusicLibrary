let artists = []; 

function populateTable() {
    const tableBody = document.querySelector('tbody');

    tableBody.innerHTML = ''; //clear tabellen

    //fyld tabellen
    artists.forEach((artist, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td><a href="/edit-artist?id=${artist.id}">${artist.name}</a></td>
            <td>${artist.birthdate}</td>
            <td>${artist.activeSince}</td>
            <td>${artist.genres}</td>
            <td>${artist.labels}</td>
            <td><a href="${artist.website}" target="_blank">Website</a></td>
            <td><img id="artist-image" src="${artist.image}" alt="${artist.name}"" class="artist-image"></td>
            <td>${artist.shortDescription}</td>
            <td class="action-buttons">
                <button class="favorite-button">${artist.isFavorite ? 'Unfavorite' : 'Favorite'}</button>
                <button class="delete-button">Delete</button>
            </td>
        `;

        //favorit knap
        row.querySelector('.favorite-button').addEventListener('click', () => {
            toggleFavorite(index);
        });

        // delete knap
        row.querySelector('.delete-button').addEventListener('click', () => {
            deleteArtist(index);
        });

        // Apply a class to favorite artists
        if (artist.isFavorite) {
            row.classList.add('favorite');
        }
    });
}

// Function til at toggle Favorite
function toggleFavorite(index) {
    artists[index].isFavorite = !artists[index].isFavorite;
    populateTable(); 
}

// Function til delete
function deleteArtist(index) {
    artists.splice(index, 1);
    populateTable(); 
}

// Hent data
fetch('/artists').then(response => response.json()).then(data => {
        artists = data;
        populateTable(); 
    });