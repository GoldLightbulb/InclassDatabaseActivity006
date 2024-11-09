// public/script.js
const leftPane = document.getElementById('painting-list');
const rightPane = document.getElementById('painting-details-form');

// Fetch paintings and populate the left pane
async function loadPaintings() {
  const response = await fetch('http://localhost:5001/api/paintings');
  const paintings = await response.json();

  paintings.forEach(painting => {
    const thumbnailDiv = document.createElement('div');
    thumbnailDiv.classList.add('painting-item');

    const thumbnailImage = document.createElement('img');
    thumbnailImage.src = painting.ImageFileName || 'default-thumbnail.jpg'; // Placeholder image if no thumbnail is provided
    thumbnailImage.alt = painting.Title;
    thumbnailImage.classList.add('thumbnail');
    thumbnailImage.onclick = () => displayPaintingDetails(painting._id);

    const viewButton = document.createElement('button');
    viewButton.innerText = 'View';
    viewButton.classList.add('view-btn');
    viewButton.onclick = () => displayPaintingDetails(painting._id);

    thumbnailDiv.appendChild(thumbnailImage);
    thumbnailDiv.appendChild(viewButton);
    leftPane.appendChild(thumbnailDiv);
  });
}

// Fetch and display painting details when a thumbnail is clicked
async function displayPaintingDetails(id) {
  const response = await fetch(`http://localhost:5001/api/paintings/${id}`);
  const painting = await response.json();
  console.log(painting.Title)

  rightPane.innerHTML = `
        <!-- Title and Main Info -->
      <div class="section header-section">


    <h2 class="painting-title">${painting.Title}</h2>
    <p class="painting-description">${painting.Excerpt}</p>
      
      </div>
    <div class="section">
      <label>Artist First Name</label>
      <input type="text" name="firstName" class="input-field" value="${painting.FirstName}">

      <label>Artist Last Name</label>
      <input type="text" name="lastName" class="input-field" value="${painting.LastName}">

      <label>Gallery</label>
      <input type="text" name="gallery" class="input-field" value="${painting.GalleryName}">
    </div>

    <div class="section">
      <label>Year of Work</label>
      <input type="text" name="yearOfWork" class="input-field" value="${painting.YearOfWork}">

      <label>Medium</label>
      <input type="text" name="medium" class="input-field" value="${painting.Medium}">

      <label>Description</label>
      <textarea name="description" class="textarea-field">${painting.Description}</textarea>
    </div>

    <div class="button-group">
      <button type="button" class="save-btn" onclick="savePaintingDetails('${painting._id}')">Save</button>
      <button type="button" class="cancel-btn">Cancel</button>
    </div>
  `;
}

// Save painting details after editing
async function savePaintingDetails(id) {
  const updatedPainting = {
    FirstName: document.querySelector('input[name="firstName"]').value,
    LastName: document.querySelector('input[name="lastName"]').value,
    GalleryName: document.querySelector('input[name="gallery"]').value,
    YearOfWork: document.querySelector('input[name="yearOfWork"]').value,
    Medium: document.querySelector('input[name="medium"]').value,
    Description: document.querySelector('textarea[name="description"]').value,
  };

  await fetch(`http://localhost:5001/api/paintings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPainting),
  });

  alert('Painting details updated');
  displayPaintingDetails(id); // Refresh with updated details
}

// Initialize the application
document.addEventListener('DOMContentLoaded', loadPaintings);
