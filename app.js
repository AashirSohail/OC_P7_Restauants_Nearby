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
    }
]

var map;
var userLocation = {
    lat: 33.540102,
    lng: 73.1485852
};

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + "\nLongitude: " + position.coords.longitude)
    userLocation.lat = position.coords.latitud;
    userLocation.lang = position.coords.longitude;
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: userLocation,
        zoom: 14,
        styles: style
    });

    addMarker(userLocation.lat, userLocation.lng, "green")
    addLocalMarkers();
}

function addLocalMarkers() {
    for (var i = 0; i < localRest.length; i++) {
        addMarker(localRest[i].lat, localRest[i].long, "yellow")
        console.log(localRest[i]);
    }
}

function displayLocalRestaurants() {
    var list = document.getElementById('listItems')
    for (var i = 0; i < localRest.length; i++) {
        var item = `
        <div class = "item">
            <div class = "row">
            <div class = "col-7 text-left">
                ${localRest[i].restaurantName}<br>
                ${localRest[i].address}
            </div>
            <div class = "col-5 text-right">
                <img class ="img" src = "imgs/placeholder.jpg">
            </div>
            </div>
        </div>
    `
        list.innerHTML += item
    }


}

function addMarker(lat, lng, color) {
    var marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        icon: 'imgs/' + color + '.png'
    });
}

