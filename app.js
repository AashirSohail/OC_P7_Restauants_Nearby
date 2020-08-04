//styles
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

//json for local restaurants
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

//user added resturants will be appended here
var manualRestaurants = [
    
];
//restaurant fetched from API call
var fetchedRestaurants = [];

var map;
var service;
//default postion
var userLocation = {
    lat: 33.540102,
    lng: 73.1485852
};
//reference to the resutarant being explored
var currentClickedLocation;
//list of restaurants that needs to be hidden
var clostedText;

//get user location
function getLocation() {
    if (navigator.geolocation) {
       navigator.geolocation.watchPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
        userLocation = {
            lat: 33.540102,
            lng: 73.1485852
        };
        initMap();
    }
}
function showPosition(position) {
    userLocation.lat = position.coords.latitude;
    userLocation.lng = position.coords.longitude;
    console.log('Grabbed user location',userLocation)
    initMap();
}

//initializes map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: userLocation,
        zoom: 17,
        styles: style
    });
    service = new google.maps.places.PlacesService(map);

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
    displayLocalRestaurants(); 
    fetchNearbyRestaurants();
}

//display local markers
function addLocalMarkers() {
    for (var i = 0; i < localRest.length; i++) {
        addMarker({ lat: localRest[i].lat, lng: localRest[i].long }, localRest[i].restaurantName, "yellow")
    }
}

// display local restaurants
function displayLocalRestaurants(ratingSearch) {
    var list = document.getElementById('listItems')
    var min = document.getElementById("slidermin").value;
    var max = document.getElementById("slidermax").value;
    for (var i = 0; i < localRest.length; i++) {
        if (!ratingSearch || (fetchedRestaurants[i].rating >= min && fetchedRestaurants[i].rating <= max)) {
            var item = `
        <div place = ${localRest[i].restaurantName} class = "item" onclick="addLocalReview(this)">
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
}
//when clicked
function addLocalReview(item) {
    clostedText = listContainer.innerHTML;
    if (item.getAttribute('place')) {
        //search manualRestaurants for this name and fetch the object
        rest = localRest.filter(r => {
            return r.restaurantName == item.getAttribute('place')
        })
        var template = `
        <div class = "text-left">    
            <p class = "clickedName">${rest[0].restaurantName} <a class = "cross" id ="cross"><i func="cross" class="fas fa-times-circle"></i></a></p>
            <p class = "clickedRating"><i class="pr-2 fas fa-star amber-text"></i> Rating <b class = "right">${getLocalRating(rest[0].ratings)}</b></p>
            <img class ="clickedImg" src="imgs/place.png">
            <p class ="clickedAddress"><i class="fas fa-map-marked-alt pr-2"></i>${rest[0].address}</p>
            <p class ="clickedTotal">${rest[0].ratings.length || 0} <span class= "pl-2">User Reviews</span> <a id = "add"><i class="fas fa-plus-circle"></i></a></p>
            <div id = "reviews" class="mt-3"></div>
        </div
        `
        listContainer.innerHTML = template;

        //user-reviews
        if (rest[0].ratings.length > 0) {
            for (let i = 0; i < rest[0].ratings.length; i++) {
                document.getElementById('listContainer').innerHTML += `
            <div class = "row reviewList">
                <div class = "col-7 text-left">
                    <p class = "pl-1">
                        <b>${rest[0].ratings[i].author_name || "Jhon Dow"}</b><br>
                        <i class="fas fa-star amber-text"></i> ${rest[0].ratings[i].stars || 0}
                    </p>
                </div>
                <div class = "col-5 text-right">
                    <img class ="profile" src = "${rest[0].ratings[i].profile_photo_url || "imgs/place.png"}">
                </div>
                <div class = "text-left ago pl-4">${rest[0].ratings[i].comment + '\n'}</div><br>
                <div class = "text-right pl-2 ago right">Just Now</div><br>
            </div>
            `
            }
        }
        //listeners
        document.getElementById('cross').addEventListener('click', function () {
            listContainer.innerHTML = clostedText;
        });
        document.getElementById('add').addEventListener('click', function () {
            addReview();
        });
    }
}

//display restaurant
function displayManualRestaurants() {
    var list = document.getElementById('listItems')

    for(let i = 0; i < manualRestaurants.length; i++){
        var item = `
        <div place = ${manualRestaurants[i].name} class = "item" onclick = "addManualReview(this)">
            <div class = "row">
            <div class = "col-7 text-left">
                <p class = "pl-2">
                <b>${manualRestaurants[i].name}</b><br>
                <p class = "address"> ${manualRestaurants[i].address}</p><br>
                <i class="pl-2 fas fa-star amber-text"></i> ${manualRestaurants[i].ratings}
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

function addManualReview(item) {
    clostedText = listContainer.innerHTML;
    if (item.getAttribute('place')) {
        //search manualRestaurants for this name and fetch the object
        rest = manualRestaurants.filter(r => {
            return r.name == item.getAttribute('place')
        }) 
        var template = `
        <div class = "text-left">    
            <p class = "clickedName">${rest[0].name} <a class = "cross" id ="cross"><i func="cross" class="fas fa-times-circle"></i></a></p>
            <p class = "clickedRating"><i class="pr-2 fas fa-star amber-text"></i> Rating <b class = "right">${rest[0].rating}</b></p>
            <img class ="clickedImg" src="imgs/place.png">
            <p class ="clickedAddress"><i class="fas fa-map-marked-alt pr-2"></i>${rest[0].address}</p>
            <p class ="clickedTotal">${rest[0].total_ratings || 0} <span class= "pl-2">User Reviews</span> <a id = "add"><i class="fas fa-plus-circle"></i></a></p>
            <div id = "reviews" class="mt-3"></div>
        </div
        `
        listContainer.innerHTML = template;

        //user-reviews
        if (rest[0].reviews.length > 0) {
            for (let i = 0; i < rest[0].reviews.length; i++) {
                document.getElementById('listContainer').innerHTML += `
            <div class = "row reviewList">
                <div class = "col-7 text-left">
                    <p class = "pl-1">
                        <b>${rest[0].reviews[i].author_name}</b><br>
                        <i class="fas fa-star amber-text"></i> ${rest[0].reviews[i].rating || 0}
                    </p>
                </div>
                <div class = "col-5 text-right">
                    <img class ="profile" src = "${rest[0].reviews[i].profile_photo_url || "imgs/place.png"}">
                </div>
                <div class = "text-left ago pl-4">${rest[0].reviews[i].text + '\n'}</div><br>
                <div class = "text-right pl-2 ago right">Just Now</div><br>
            </div>
            `
            }
        }
        //listeners
        document.getElementById('cross').addEventListener('click', function () {
            listContainer.innerHTML = clostedText;
        });
        document.getElementById('add').addEventListener('click', function () {
            addReview();
        });
    }
}

function displayNearbyRestaurants(ratingSearch) {
    var list = document.getElementById('listItems')
    if (list) {
        list.innerHTML = ''
    }
    else {
        return
    }
    var min = document.getElementById("slidermin").value;
    var max = document.getElementById("slidermax").value;
    //console.clear();
    for (var i = 0; i < fetchedRestaurants.length; i++) {
        //if(!ratingSearch || (fetchedRestaurants.rating >= min && fetchedRestaurants.rating <= max)){
        if (!ratingSearch || (fetchedRestaurants[i].rating >= min && fetchedRestaurants[i].rating <= max)) {
            var item = `
            <div class = "item" place=${fetchedRestaurants[i].place_id} onclick = "review(this)">
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
    }
    displayManualRestaurants();
    displayLocalRestaurants(false);
}

var clostedText = '';

function review(item) {
    var clickedRestaurant = {
        name: '',
        img: '',
        rating: 0,
        reviews: [],
        total_ratings: 0,
        vicinity: ''
    };

    if (item.getAttribute('place')) {

        service.getDetails({
            placeId: item.getAttribute('place')
        }, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                if (place) {
                    clickedRestaurant.name = place.name;
                    if (place.photos) {
                        clickedRestaurant.img = place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 });
                    }
                    else {
                        clickedRestaurant.img = "imgs/place.png";
                    }
                    clickedRestaurant.address = place.formatted_address;
                    clickedRestaurant.rating = place.rating;
                    clickedRestaurant.total_ratings = place.user_ratings_total;
                    clickedRestaurant.reviews = place.reviews;

                    let listContainer = document.getElementById('listContainer');
                    clostedText = listContainer.innerHTML;
                    listContainer.innerHTML = '';
                    var template = `
                        <div class = "text-left">    
                            <p class = "clickedName">${clickedRestaurant.name} <a class = "cross" id ="cross"><i func="cross" class="fas fa-times-circle"></i></a></p>
                            <p class = "clickedRating"><i class="pr-2 fas fa-star amber-text"></i> Rating <b class = "right">${clickedRestaurant.rating}</b></p>
                            <img class ="clickedImg" src="${clickedRestaurant.img || "imgs/place.png"}">
                            <p class ="clickedAddress"><i class="fas fa-map-marked-alt pr-2"></i>${clickedRestaurant.address}</p>
                            <p class ="clickedTotal">${clickedRestaurant.total_ratings} <span class= "pl-2">User Reviews</span> <a id = "add"><i class="fas fa-plus-circle"></i></a></p>
                            <div id = "reviews" class="mt-3"></div>
                        </div
                        `
                    listContainer.innerHTML = template;

                    //user-reviews
                    if (clickedRestaurant.reviews.length) {
                        for (let i = 0; i < clickedRestaurant.reviews.length; i++) {
                            document.getElementById('listContainer').innerHTML += `
                            <div class = "row reviewList">
                                <div class = "col-7 text-left">
                                    <p class = "pl-1">
                                        <b>${clickedRestaurant.reviews[i].author_name}</b><br>
                                        <i class="fas fa-star amber-text"></i> ${clickedRestaurant.reviews[i].rating || 0}
                                    </p>
                                </div>
                                <div class = "col-5 text-right">
                                    <img class ="profile" src = "${clickedRestaurant.reviews[i].profile_photo_url || "imgs/place.png"}">
                                </div>
                                <div class = "text-left ago pl-4">${clickedRestaurant.reviews[i].text + '\n'}</div><br>
                                <div class = "text-right pl-2 ago right">${clickedRestaurant.reviews[i].relative_time_description}</div><br>
                            </div>
                            `
                        }
                    }


                    //listeners
                    document.getElementById('cross').addEventListener('click', function () {
                        listContainer.innerHTML = clostedText;
                    });
                    document.getElementById('add').addEventListener('click', function () {
                        addReview();
                    });
                }
            }
        });
    }
}

document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement, text = target.textContent || target.innerText;
    if (event.target.getAttribute('func') === 'cross') {
        let listContainer = document.getElementById('listContainer');
        listContainer.innerHTML = clostedText;
    }
}, false);

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

function addReview() {
    var modal = document.getElementById("form1");
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

function submitReview() {

    var modal = document.getElementById("form1");
    modal.style.display = "none";

    var name = document.getElementById('username').value;
    var review = document.getElementById('userreview').value;
    var rating = document.getElementById('userrating').value;
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

var tempManualRest = {
    name: '',
    address: '',
    ratings: 0
}
function addManualRestaurant() {
    var modal = document.getElementById("form");
    modal.style.display = "none";

    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    console.log(name, address);
    tempManualRest.name = name;
    tempManualRest.address = address;
    tempManualRest.rating = 0;
    tempManualRest.reviews = [ 
        {
        author_name: "Aashir",
        rating: 3,
        text: "Awesome"
        }
    ];

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
    manualRestaurants.push(tempManualRest);
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
    displayManualRestaurants();
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

fetchedRestaurants = [];
var fetchedRest = { imageUrl: '', name: '', rating: 0, user_ratings_total: 0, vicinity: '', location: '', place_id: 0 }

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
            fetchedRest = { imageUrl: '', name: '', rating: 0, user_ratings_total: 0, vicinity: '', location: '', place_id: 0 }

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
    if (index > -1) {
        fetchedRestaurants[index] = obj;
    } else {
        fetchedRestaurants.push(obj)
    }
}


function displayFetchedRestaurants() {

    fetchedRestaurants.forEach((rest) => {
        addMarker(rest.location, rest.name, 'red')
    })
    displayNearbyRestaurants(false);
}

function updateMin() {
    var slider = document.getElementById("slidermin");
    var output = document.getElementById("ratingMin");
    output.innerHTML = slider.value; // Display the default slider value

}
function updateMax() {
    var slider = document.getElementById("slidermax");
    var output = document.getElementById("ratingMax");
    output.innerHTML = slider.value; // Display the default slider value

}

function searchByRating() {
    var sliderMin = document.getElementById("slidermin").value;
    var sliderMax = document.getElementById("slidermax").value;

    if (sliderMin > sliderMax) {
        alert('Min can not be greater than Max');
    }
    else {
        displayNearbyRestaurants(true);
    }
}

function toggleMenu() {
    var x = document.getElementById("listContainer")

    if (window.innerWidth > 600) {
        return
    }
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

window.onresize = function () {
    if (window.innerWidth > 600) {
        var x = document.getElementById("listContainer")
        x.style.display = "block";
        var y = document.getElementById("back")
        y.style.display = "none"
        var z = document.getElementById("fab")
        z.style.display = "none"
        document.getElementById("userreview").cols = "58"
    }
    if (window.innerWidth < 600) {
        var y = document.getElementById("back")
        y.style.display = "block"
        var z = document.getElementById("fab")
        z.style.display = "block"
        //userreview
        document.getElementById("userreview").cols = "34"
    }
}