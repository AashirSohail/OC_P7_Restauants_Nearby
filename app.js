var style = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#757575"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#181818"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1b1b1b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#2c2c2c"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8a8a8a"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#373737"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3c3c3c"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3d3d3d"
            }
        ]
    }
]

var localRest = [
    {
        "restaurantName": "Bronco",
        "address": "39 Rue des Petites Écuries, 75010 Paris",
        "lat": 33.539311,
        "long": 73.149830,
        "ratings": [
            {
                "stars": 4,
                "comment": "Great! But not many veggie options."
            },
            {
                "stars": 5,
                "comment": "My favorite restaurant!"
            }
        ]
    },
    {
        "restaurantName": "Babalou",
        "address": "4 Rue Lamarck, 75018 Paris",
        "lat": 33.540259,
        "long": 73.151398,
        "ratings": [
            {
                "stars": 5,
                "comment": "Tiny pizzeria next to Sacre Coeur!"
            },
            {
                "stars": 3,
                "comment": "Meh, it was fine."
            }
        ]
    },
    {
        "restaurantName": "Pavalo",
        "address": "43 Grand Écuries, 75010 Paris",
        "lat": 33.539105,
        "long": 73.146119,
        "ratings": [
            {
                "stars": 4,
                "comment": "Great! But not many veggie options."
            },
            {
                "stars": 5,
                "comment": "My favorite restaurant!"
            }
        ]
    }
]

var manualRest = []

var map;
var userLocation = {
    lat: 33.540102,
    lng: 73.1485852
};
var currentClickedLocation;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    userLocation.lat = position.coords.latitud;
    userLocation.lang = position.coords.longitude;
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: userLocation,
        zoom: 14,
        styles: style
    });

    var pos = {
        lat: userLocation.lat,
        lng: userLocation.lng
    }
    addMarker(pos, "Your Location", "green")
    addLocalMarkers();

    google.maps.event.addListener(map, 'click', function (event) {
        addManually(event.latLng);
    });
    google.maps.event.addListener(map, "center_changed", function () {
        fetchNearbyRestaurants();
    });
}

function addLocalMarkers() {
    for (var i = 0; i < localRest.length; i++) {
        addMarker({ lat: localRest[i].lat, lng: localRest[i].long }, localRest[i].restaurantName, "yellow")
    }
}

function displayLocalRestaurants() {
    var list = document.getElementById('listItems')
    for (var i = 0; i < localRest.length; i++) {
        var item = `
        <div class = "item">
            <div class = "row">
            <div class = "col-7 text-left">
                <p class = "pl-2">
                <b>${localRest[i].restaurantName}</b><br>
                <p class = "address">${localRest[i].address}</p><br>
                <i class="pl-2 fas fa-star amber-text"></i> ${getLocalRating(localRest[i].ratings)}
                </p>
            </div>
            <div class = "col-5 text-right">
                <img class ="img" src = "imgs/place.png">
            </div>
            </div>
        </div>
    `
        list.innerHTML += item
    }
}

function displayManualRestaurants(rest) {
    var list = document.getElementById('listItems')
    var item = `
        <div class = "item">
            <div class = "row">
            <div class = "col-7 text-left">
                <p class = "pl-2">
                <b>${rest.name}</b><br>
                <p class = "address"> ${rest.address}</p><br>
                <i class="pl-2 fas fa-star amber-text"></i> ${rest.ratings}
                </p>
            </div>
            <div class = "col-5 text-right">
                <img class ="img" src = "imgs/place.png">
            </div>
            </div>
        </div>
    `
    list.innerHTML += item

}

function displayNearbyRestaurants() {
    var list = document.getElementById('listItems')
    list.innerHTML = ''
    for (var i = 0; i < fetchedRestaurants.length; i++) {
        console.log(fetchedRestaurants[i].place_id)
        var item = `
        <div class = "item" data-place=${fetchedRestaurants[i].place_id} onclick = "review(this)">
            <div class = "row">
            <div class = "col-7 text-left">
                <p class = "pl-2">
                <b>${fetchedRestaurants[i].name}</b><br>
                <p class = "address">${fetchedRestaurants[i].vicinity.substring(0, 20)}</p><br>
                <i class="pl-2 fas fa-star amber-text"></i> ${fetchedRestaurants[i].rating || 0}
                </p>
            </div>
            <div class = "col-5 text-right">
                <img class ="img" src = "${fetchedRestaurants[i].imageUrl || "imgs/place.png"}">
            </div>
            </div>
        </div>
    `
        list.innerHTML += item
    }
    displayLocalRestaurants();
}

function addMarker(pos, title, color) {
    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: 'imgs/' + color + '.png',
        title: title
    });
    var contentString = `
        <h5>
            ${title}
        </h5>
    `
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
}

function addManually(location) {
    //popup form
    var modal = document.getElementById("form");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    currentClickedLocation = location;
}
var tempManualRest = {
    name: '',
    address: '',
    ratings: 0
}
function addRestaurant() {
    var modal = document.getElementById("form");
    modal.style.display = "none";

    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    console.log(name, address);
    tempManualRest.name = name;
    tempManualRest.address = address;

    var marker = new google.maps.Marker({
        position: currentClickedLocation,
        map: map,
        icon: 'imgs/' + "blue" + '.png',
        title: tempManualRest.name
    });

    var contentString = `
    <h5>
        ${name}
    </h5>
`
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
    manualRest.push(tempManualRest);
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
    displayManualRestaurants(tempManualRest);
}

function getLocalRating(obj) {
    var len = obj.length;
    var sum = 0;
    for (var i = 0; i < len; i++) {
        sum += obj[i].stars
    }
    return sum / len;
}


function fetchNearbyRestaurants() {
    var map_center = map.getCenter()
    var request = {
        location: map_center,
        radius: '500',
        type: ['restaurant'],
        rankby: "distance"
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, storeFetchedRestaurants);
}

var fetchedRestaurants = [];
var fetchedRest = { imageUrl: '', name: '', rating: 0, user_ratings_total: 0, vicinity: '', location: '', place_id: 0}

function storeFetchedRestaurants(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            if (results[i].photos) {
                fetchedRest.imageUrl = results[i].photos[0].getUrl({ maxWidth: 200, maxHeight: 200 });
            }
            fetchedRest.name = results[i].name;
            fetchedRest.rating = results[i].rating;
            fetchedRest.user_ratings_total = results[i].user_ratings_total;
            fetchedRest.vicinity = results[i].vicinity;
            fetchedRest.location = results[i].geometry.location;
            fetchedRest.place_id = results[i].place_id;
            checkUnique(fetchedRest);
            fetchedRest = { imageUrl: '', name: '', rating: 0, user_ratings_total: 0, vicinity: '', location: '', place_id: 0}

        }
    }
    displayFetchedRestaurants();
}

function checkUnique(obj) {
    let index = -1;

    for (let i = 0; i < fetchedRestaurants.length; i++) {
        if (fetchedRestaurants[i].name === obj.name) {
            index = i;
        }
    }
    if(index > -1) {
        fetchedRestaurants[index] = obj;
      } else {
        fetchedRestaurants.push(obj)
      }
}


function displayFetchedRestaurants() {

    fetchedRestaurants.forEach((rest) => {
        addMarker(rest.location, rest.name, 'red')
    })
    displayNearbyRestaurants();
}

function review(item){
    console.log(item.getAttribute('place'));
}


