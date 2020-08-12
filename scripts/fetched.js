//restaurant fetched from API call
var fetchedRestaurants = [];

//fetch restaurants from Places API
const displayNearbyRestaurants = (ratingSearch) => {
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

const review = (item) => {
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
        },  (place, status) => {
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
                    document.getElementById('cross').addEventListener('click',  () => {
                        listContainer.innerHTML = clostedText;
                    });
                    document.getElementById('add').addEventListener('click',  () => {
                        addReview();
                    });
                }
            }
        });
    }
}


const fetchNearbyRestaurants = () => {
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

const storeFetchedRestaurants = (results, status) => {
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

const checkUnique = (obj) =>{
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


const displayFetchedRestaurants = () => {

    fetchedRestaurants.forEach((rest) => {
        addMarker(rest.location, rest.name, 'red')
    })
    displayNearbyRestaurants(false);
}