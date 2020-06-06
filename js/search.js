var map, places, infoWindow;
var markers = [];
var autocomplete;
var countries = {
  'us': {
    center: {
      lat: 37.1,
      lng: -95.7
    },
    zoom: 3
  }
}


var nearby = document.getElementById('nearby');
// var newLocation = document.getElementById('location');


// Search for restaurants in the selected city, within the viewport of the map.
function search() {
  
  var search = {
    
    bounds: map.getBounds(),
    types: ['restaurant'],
    radius: 5000
  };

  places.nearbySearch(search, function (results, status) {
    

    if (status === google.maps.places.PlacesServiceStatus.OK) {
      clearResults();
      clearMarkers();

      //console.log(results);

      results.forEach(place => {
        const marker = new google.maps.Marker({
          map,
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          },
          title: place.name,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue.png"
          }
        });

       

        document.querySelector('#newRest').innerHTML += `<p>${place.name}<br><span>★</span> ${place.rating}</p>`
      })

      
      // Create a marker for each restaurant found, and change the marker color
      // for (var i = 0; i < results.length; i++) {
      //  /* while (newPhoto.lastChild) {
      //     newPhoto.removeChild(newPhoto.lastChild);
      //   }*/
      //     const jsonp = JSON.stringify(results[i]);
      //     const googleRestaurant = JSON.parse(jsonp);
        

      //   markers[i] = new google.maps.Marker({
      //   position: {
      //     lat: results[i].geometry.location.lat(),
      //     lng: results[i].geometry.location.lng()
      //   },
      //     title: googleRestaurant.name,
      //     icon: {
      //       url: "http://maps.google.com/mapfiles/ms/icons/blue.png"
      //     }

      //   });
      //   //console.log(results[i].geometry.location);
      //   markers[i].setMap(map);

      //   // If the user clicks a restaurant marker, show the details of that restaurant
      //   markers[i].placeResult = googleRestaurant;
      //   google.maps.event.addListener(markers[i], 'click', showInfoWindow);
      //  addResult(googleRestaurant, i);
      // // addResult(markers[i].placeResult);
      
      //   const lte = results[i].geometry.location.lat();
      //   const lde = results[i].geometry.location.lng();
      //   //console.log(googleRestaurant.name + " (" + lte + "," + lde + ")");
 
      
      //   //$("#place-photo").html
      //   $(".place-images:last").html(`<img src="https://maps.googleapis.com/maps/api/streetview?size=330x240&location=${lte},${lde}&key=AIzaSyA-uoX06n_IgxRQxKcyHQ6Th2CIDqhLqxQ">`);
       
       
  
      // }
      
      markerReset();
      
      $("#headingNew").attr("disabled", false).css('color', "gold");
    }
    
  });
  
}

function nearSearch() {

  // console.log("Getting nearby restaurants");
  //$("#autocomplete").attr("placeholder", "Enter a City").css("color", "white");
  $("#modal").css("display", "none");
  $("#headingNew").attr("disabled", false).css('color', "gold");

  places = new google.maps.places.PlacesService(map);

  // autocomplete.addListener('place_changed', onPlaceChanged);
  search();
  
}