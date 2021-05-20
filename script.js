const imageContainer = document.querySelector(".image-container");
const loader = document.querySelector(".loader");


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {

  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}


// Helper Function to Set attributes in the DOM

function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Display Photos from Array

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");

    setAttribute(item, {
      href: photo.links.html,
      target: "_blank"
    });
    const img = document.createElement("img");

    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // Event Listener, check when each image is finished loading
    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayPhotos();
  } catch (error) {
    // Catch error here
  }
}

// Check to see if scrolling is at the bottom of the page, Load more photos
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }

})

// On Load
getPhotos();