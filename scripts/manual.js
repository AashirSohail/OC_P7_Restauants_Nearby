//user added resturants will be appended here
let manualRestaurants = [];

//display manual markers
const addManualMarkers = () => {
    for (let i = 0; i < manualRestaurants.length; i++) {
        addMarker({ lat: manualRestaurants[i].lat, lng: manualRestaurants[i].long }, manualRestaurants[i].restaurantName, "blue")
    }
}

//display restaurant
const displayManualRestaurants = () => {
    let list = document.getElementById('listItems')

    for(let i = 0; i < manualRestaurants.length; i++){
        let item = `
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

const addManualReview = (item) => {
    clostedText = listContainer.innerHTML;
    if (item.getAttribute('place')) {
        //search manualRestaurants for this name and fetch the object
        rest = manualRestaurants.filter(r => {
            return r.name == item.getAttribute('place')
        }) 
        let template = `
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
        document.getElementById('cross').addEventListener('click',  () => {
            listContainer.innerHTML = clostedText;
        });
        document.getElementById('add').addEventListener('click',  () => {
            addReview();
        });
    }
}

const addManually = (location) => {
    //popup form
    let modal = document.getElementById("form");
    let span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick =  () => {
        modal.style.display = "none";
    }
    window.onclick =(event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    currentClickedLocation = location;
}

let tempManualRest = {
    name: '',
    address: '',
    ratings: 0
}
const addManualRestaurant = () => {
    let modal = document.getElementById("form");
    modal.style.display = "none";

    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
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

    let marker = new google.maps.Marker({
        position: currentClickedLocation,
        map: map,
        icon: 'imgs/' + "blue" + '.png',
        title: tempManualRest.name
    });

    let contentString = `
    <h5>
        ${name}
    </h5>
`
    let infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    marker.addListener('click',() => {
        infowindow.open(map, marker);
    });
    manualRestaurants.push(tempManualRest);
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
    displayManualRestaurants();
}
