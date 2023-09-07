const goBackButton = document.getElementById("go-back-button");
const editArtistForm = document.getElementById("edit-artist-form");

//get artist id
function getArtistIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

//get data to populate form
function loadArtistData() {
    const artistId = getArtistIdFromUrl();

    if (artistId) {
        fetch(`/artists/${artistId}`)
            .then((response) => response.json())
            .then((data) => {
                // Populate form fields with artist data
                document.getElementById("name").value = data.name;
                document.getElementById("birthdate").value = data.birthdate;
                document.getElementById("activeSince").value = data.activeSince;
                document.getElementById("genres").value = data.genres;
                document.getElementById("labels").value = data.labels;
                document.getElementById("website").value = data.website;
                document.getElementById("shortDescription").value = data.shortDescription;
                document.getElementById("image").value = data.image; 
                
                // Display the artist image
                const artistImage = document.getElementById("artist-image");
                artistImage.src = data.image; 
            })
            .catch((error) => console.error("Error loading artist data:", error));
    } else {
        console.error("Artist ID not provided in the URL");
    }
}

// function to submit the edited artist data 
function submitEditedArtistData() {
    const artistId = getArtistIdFromUrl(); // Get the artist ID from the URL

    if (artistId) {
        const updatedArtist = {
            name: document.getElementById("name").value,
            birthdate: document.getElementById("birthdate").value,
            activeSince: document.getElementById("activeSince").value,
            genres: document.getElementById("genres").value,
            labels: document.getElementById("labels").value,
            website: document.getElementById("website").value,
            shortDescription: document.getElementById("shortDescription").value,
        };

        //PUT request to update the artist data
        fetch(`/artists/${artistId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedArtist),
        })
            .then((response) => {
                if (response.ok) {
                    window.location.href = "/";
                } else {
                    console.error("Failed to update artist data.");
                }
            })
            .catch((error) => console.error("Error updating artist data:", error));
    } else {
        console.error("Artist ID not provided in the URL");
    }
}

// Event listener for saving/submitting the form
editArtistForm.addEventListener("submit", function (event) {
    event.preventDefault(); 
    submitEditedArtistData();
});

//go back to main page
goBackButton.addEventListener("click", function () {
    window.location.href = "/"; 
});

// Load artist data when the page loads
loadArtistData();
