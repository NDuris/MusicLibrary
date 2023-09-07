let artists = []; 

function populateTable() {
    const tableBody = document.querySelector('tbody');

    tableBody.innerHTML = ''; //clear table

    //fill table
    artists.forEach((artist, id) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td><a href="/edit-artist?id=${artist.id}">${artist.name}</a></td>
            <td><img id="artist-image" src="${artist.image}" alt="${artist.name}"" class="artist-image"></td>
            <td>${artist.shortDescription}</td>
            <td class="action-buttons">
                <button class="favorite-button">${artist.isFavorite ? 'Unfavorite' : 'Favorite'}</button>
                <button class="delete-button">Delete</button>
            </td>
        `;

        //favorit button
        row.querySelector('.favorite-button').addEventListener('click', () => {
            toggleFavoriteById(id);
        });

        // delete button
        row.querySelector('.delete-button').addEventListener('click', () => {
            deleteArtistById(id);
        });

        // Apply a class to favorite artists
        //TODO
        if (artist.isFavorite) {
            row.classList.add('favorite');
        }
    });
}

// Function to toggle Favorite
async function toggleFavoriteById(id) {
    console.log("i was clicked");
    const artist = artists[id];
    artist.isFavorite = !artist.isFavorite.toString();
    try {
        const response = await fetch(`/artists/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isFavorite: artist.isFavorite }),
    });
    if (response.ok) {
        console.log('Artist edited successfully');
        refreshArtistList();
    } else {
        console.error('Failed to edited artist');
    }
    } catch (error) {
        console.error('Error setting artist to favorite:', error);
    }

    populateTable(); 
}

// Function to delete an artist by ID
async function deleteArtistById(id) {
    try {
        const response = await fetch(`/artists/${id}`, {
            method: 'DELETE',
        });
        console.log("er i deleteArtistById" + id);
        if (response.ok) {
            console.log('Artist deleted successfully');
            refreshArtistList();
        } else {
            console.error('Failed to delete artist');
        }
    } catch (error) {
        console.error('Error deleting artist:', error);
    }
}

// Function to attach click event handlers to delete buttons
function attachDeleteButtonHandlers() {
    const deleteButtons = document.querySelectorAll('delete-button');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const artistId = button.getAttribute('data-artist-id');
            if (artistId) {
                deleteArtistById(artistId);
            }
        });
    });
}

// Function to attach click event handlers to favorite buttons
function attachFavoriteButtonHandlers() {
    const favoriteButtons = document.querySelectorAll('favorite-button');
    favoriteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const artistId = button.getAttribute('data-artist-id');
            if (artistId) {
                toggleFavoriteById(artistId);
            }
        });
    });
}


// refresh the artist list
function refreshArtistList() {
    fetch('/artists')
        .then((response) => response.json())
        .then((data) => {
            artists = data;
            populateTable();
            attachDeleteButtonHandlers(); 
            attachFavoriteButtonHandlers();
        })
        .catch((error) => console.error('Error fetching artists:', error));
}

// fetch data
fetch('/artists').then(response => response.json()).then(data => {
        artists = data;
        populateTable(); 
    });

    
// initialize the button click eventhandlers
attachDeleteButtonHandlers();
attachFavoriteButtonHandlers();

//TODO:
//Add artist button to redirect to new form (similar to edit-artist form)
//Sorting function to Table