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

//display local markers
const addLocalMarkers = () => {
    for (var i = 0; i < localRest.length; i++) {
        addMarker({ lat: localRest[i].lat, lng: localRest[i].long }, localRest[i].restaurantName, "yellow")
    }
}


// display local restaurants
const displayLocalRestaurants = (ratingSearch) => {
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
const addLocalReview = (item) => {
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
        document.getElementById('cross').addEventListener('click',() => {
            listContainer.innerHTML = clostedText;
        });
        document.getElementById('add').addEventListener('click',() => {
            addReview();
        });
    }
}

const getLocalRating = (obj) => {
    var len = obj.length;
    var sum = 0;
    for (var i = 0; i < len; i++) {
        sum += obj[i].stars
    }
    return sum / len;
}