
const imageContainer = document.querySelector('.image-container');
const loading = document.querySelector('.loading');


let isInitialLoad = true;
let photosArray = [];


// Unsplash API:
const initialCount = 5;
const apiKey = '_FbHY2yKreRpSNelIDyrAqy1IPezxf4JlwGhBpzuYvI';
let apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;


// Update API Url and Load more photos
const updateAPIUrlWithNewCount = (picCount) => {
    apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
    getPhotos();
}

// Helper function to Set attributes on DOM elements
const setAttribute = (element, attribute) => {
    for (const key in attribute) {
        element.setAttribute(key, attribute[key])
    }
}


// Create elements and add to DOM
const displayPhotos = () => {
    photosArray.forEach(photo => {

        const link = document.createElement('a');
        setAttribute(link, {
            href: photo.links.html,
            target: '_blank',
        })

        const img = document.createElement('img');
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })


        imageContainer.append(link);
        link.append(img);
    })
}



// Fetch photos from API
async function getPhotos() {
    try {
        const res = await fetch(apiURL);
        photosArray = await res.json();
        displayPhotos();
        if (isInitialLoad) {
            isInitialLoad = false;
        }
    } catch (err) {
        console.log(err)
    }

}


// Intersection Observer API to load more photos when scrolling to bottom
const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        updateAPIUrlWithNewCount(20);
        observer.unobserve(entries[0].target);
    }
}, { threshold: 1.0 })


observer.observe(loading);

// Initial
getPhotos();