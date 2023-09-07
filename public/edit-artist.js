// edit-artist.js
const goBackButton = document.getElementById("go-back-button");
const editArtistForm = document.getElementById("edit-artist-form");

// Function to extract the artist ID from the URL query parameter
function getArtistIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

function loadArtistData() {
    const artistId = getArtistIdFromUrl();

    if (artistId) {
        // Fetch artist data using a GET request to the server based on artist ID
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
                document.getElementById("image").value = data.image; // Assuming there's an image input field
                
                // Display the artist image
                const artistImage = document.getElementById("artist-image");
                artistImage.src = data.image; // Set the 'src' attribute to the image URL
            })
            .catch((error) => console.error("Error loading artist data:", error));
    } else {
        console.error("Artist ID not provided in the URL");
    }
}

// Function to submit the edited artist data using a PUT request
function submitEditedArtistData() {
    const artistId = getArtistIdFromUrl(); // Get the artist ID from the URL

    if (artistId) {
        // Create an object with the updated artist data from the form fields
        const updatedArtist = {
            name: document.getElementById("name").value,
            birthdate: document.getElementById("birthdate").value,
            activeSince: document.getElementById("activeSince").value,
            genres: document.getElementById("genres").value,
            labels: document.getElementById("labels").value,
            website: document.getElementById("website").value,
            shortDescription: document.getElementById("shortDescription").value,
            // Add other fields as needed
        };

        // Send a PUT request to update the artist data on the server
        fetch(`/artists/${artistId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedArtist),
        })
            .then((response) => {
                if (response.ok) {
                    // Redirect to the artist list page after successful update
                    window.location.href = "/artists";
                } else {
                    console.error("Failed to update artist data.");
                }
            })
            .catch((error) => console.error("Error updating artist data:", error));
    } else {
        console.error("Artist ID not provided in the URL");
    }
}


// Event listener for form submission
editArtistForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    submitEditedArtistData();
});

goBackButton.addEventListener("click", function () {
    window.location.href = "/"; // Redirect to the main artist list page
});

// Load artist data when the page loads
loadArtistData();
