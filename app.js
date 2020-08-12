let map;
let service;
//default postion
let userLocation = {
    lat: 33.540111,
    lng: 73.148924
};
//reference to the resutarant being explored
let currentClickedLocation;
//list of restaurants that needs to be hidden
let clostedText;

//get user location
function getLocation() {
    if (navigator.geolocation) {
       navigator.geolocation.watchPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
        userLocation = {
            lat: 33.540111,
            lng: 73.148924
        };
        initMap();
    }
}

const showPosition = (position) =>  {
    userLocation.lat = position.coords.latitude;
    userLocation.lng = position.coords.longitude;
    initMap();
}

//initializes map
const initMap = () => {
    console.clear()
    map = new google.maps.Map(document.getElementById("map"), {
        center: userLocation,
        zoom: 17,
        styles: style
    });
    service = new google.maps.places.PlacesService(map);

    let pos = {
        lat: userLocation.lat,
        lng: userLocation.lng
    }
    addMarker(pos, "Your Location", "green")
    addLocalMarkers();

    google.maps.event.addListener(map, 'click', (event) => {
        addManually(event.latLng);
    });
    google.maps.event.addListener(map, "center_changed", () => {
        fetchNearbyRestaurants();
    });
    displayLocalRestaurants(); 
    fetchNearbyRestaurants();
}

document.addEventListener('click', (e) => {
    e = e || window.event;
    let target = e.target || e.srcElement, text = target.textContent || target.innerText;
    if (event.target.getAttribute('func') === 'cross') {
        let listContainer = document.getElementById('listContainer');
        listContainer.innerHTML = clostedText;
    }
}, false);

const addMarker = (pos, title, color) => {
    let marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: 'imgs/' + color + '.png',
        title: title
    });
    let contentString = `
        <h5>
            ${title}
        </h5>
    `
    let infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    marker.addListener('click', () => {
        infowindow.open(map, marker);
    });
}

const addReview = () => {
    let modal = document.getElementById("form1");
    modal.style.display = "block";
    let span = document.getElementsByClassName("close")[0];
    span.onclick = () => {
        modal.style.display = "none";
    }
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

const submitReview = () => {

    let modal = document.getElementById("form1");
    modal.style.display = "none";

    let name = document.getElementById('username').value;
    let review = document.getElementById('userreview').value;
    let rating = document.getElementById('userrating').value;
    document.getElementById('listContainer').innerHTML += `
    <div class = "row reviewList">
        <div class = "col-7 text-left">
            <p class = "pl-1">
                <b>${name}</b><br>
                <i class="fas fa-star amber-text"></i> ${rating || 0}
            </p>
        </div>
        <div class = "col-5 text-right">
            <img class ="profile" src = "imgs/user.png">
        </div>
        <div class = "text-left ago pl-4">${review}</div><br>
        <div class = "text-right pl-3 ago right"> Just Now</div><br>
    </div>
    `

}

const updateMin = () => {
    let slider = document.getElementById("slidermin");
    let output = document.getElementById("ratingMin");
    output.innerHTML = slider.value; // Display the default slider value

}
const updateMax = () =>{
    let slider = document.getElementById("slidermax");
    let output = document.getElementById("ratingMax");
    output.innerHTML = slider.value; // Display the default slider value

}

const searchByRating = () => {
    let sliderMin = document.getElementById("slidermin").value;
    let sliderMax = document.getElementById("slidermax").value;

    if (sliderMin > sliderMax) {
        alert('Min can not be greater than Max');
    }
    else {
        displayNearbyRestaurants(true);
    }
}

const toggleMenu = () => {
    let x = document.getElementById("listContainer")

    if (window.innerWidth > 600) {
        return
    }
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

window.onresize = () => {
    if (window.innerWidth > 600) {
        let x = document.getElementById("listContainer")
        x.style.display = "block";
        let y = document.getElementById("back")
        y.style.display = "none"
        let z = document.getElementById("fab")
        z.style.display = "none"
        document.getElementById("userreview").cols = "58"
    }
    if (window.innerWidth < 600) {
        let y = document.getElementById("back")
        y.style.display = "block"
        let z = document.getElementById("fab")
        z.style.display = "block"
        //userreview
        document.getElementById("userreview").cols = "34"
    }
}