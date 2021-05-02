let images = document.querySelector('.images');
const searchButton = document.querySelector('#searchbutton');
const searchquery = document.querySelector('#searchterm');
const warning = document.querySelector('#warning');


const count = 10;
// Add your unsplash clientID string here.
const clientId = '';  



searchButton.addEventListener('click', () => load_images());

// Logic
// When the search button is clicked, check if input has value. if no value, show warning of Input needed.
// if there is value, call the api to fetch images.
// if user reaches bottom of the page, call the api again to fetch next set of images.
async function load_images() {

    // check if there is user input
    if (searchquery.value.length > 0) {
        // console.log(`${searchquery.value}`);
        searchquery.classList.remove('redBorder');
        warning.style.display = "none";


        imageData = await getImages().catch(err => console.log(err));

        // creare a loop to get imageURLs out from array
        showImageDom(imageData);


    } else {
        searchquery.classList.add('redBorder');
        warning.innerHTML = "Please enter a search term"
    }

}

async function getImages() {
    const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${clientId}&count=${count}&query=${searchquery.value}`);
    const data = await response.json();
    return data;
}

searchquery.onkeyup = () => {
    searchquery.classList.remove('redBorder');
    warning.style.display = "none";
}

function showImageDom(imageData) {
    imageData.forEach((image) => {
        let imageDom = document.createElement("img");
        imageDom.classList.add('img');
        imageDom.src = image.urls.regular;
        images.appendChild(imageDom);
    })
}

window.onscroll = function() {
    if ((window.innerHeight + window.pageYOffset) >= images.offsetHeight) {
        getImages().then((imageData) => showImageDom(imageData));
    }
}
