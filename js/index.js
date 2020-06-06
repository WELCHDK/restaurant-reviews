window.onload = function () {
  //$("#autocomplete").val("").attr("placeholder", "").css("color", "black");
  $("#autocomplete").val("");
  $("#headingNew").attr("disabled", true).css('color', "white");
  //initMap();

  if (typeof google != 'undefined') {
    console.log("google not defined");
    initMap();
    /*if (typeof google != 'undefined') {
      console.log("google not defined");
      initMap();
    }*/
  }
}


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
var starSelection = document.getElementById("headingNew");
var starOption = document.getElementById("option");
var newPhoto = document.getElementById("place-photo");
var photo = document.createElement('img');
//$("#autocomplete").on('focus', restaurantSearch);

var sv = new google.maps.StreetViewService();
var panorama = new google.maps.StreetViewPanorama(document.getElementById('streetview'));


//const service = new google.maps.places.PlacesService(map);

nearby.addEventListener('click', headingReset)
//newLocation.addEventListener('click', headingReset)

$("#nearby").on('click', nearSearch);
$("#location").on('click', locationReset);
//$("#autocomplete").on('focus', cityClear);
$("#headingNew").on('click', starSelect);
$("#nearby").on('click', nearbyReset);


function addResult(result, i) {
  let nearResults = document.getElementById('newRest');
  let list = document.createElement('p');
  list.onclick = function () {
    google.maps.event.trigger(markers[i], 'click');
    $("#addReview").attr("disabled","false");
  };
  let name = document.createTextNode(result.name);
  $(list).append(result.name + "<br>" + "<span>&bigstar;</span> " + result.rating.toPrecision(2));
  $(name).css('margin-bottom', "-10px");

  nearResults.appendChild(list);
}

function showInfoWindow() {
  //nearSearch();
  //newPhoto.removeChild(newPhoto.lastChild);

  
  /* while (newPhoto.lastChild) {
    newPhoto.parentNode.removeChild(newPhoto.lastChild);
    newPhoto.removeChild(newPhoto.lastChild);
  }*/
  //newPhoto.removeChild(newPhoto.lastChild);
  $("#place-photo").css("display","block");
  var marker = this;
  console.log(marker.position.toString());
 /*marker.onclick = function(){
    // while (newPhoto.lastChild) {
    //newPhoto.removeChild(newPhoto.lastChild);
    nearSearch();
    //places = new google.maps.places.PlacesService(map);
  },*/
  //},
  $("#official-logo").css("display", "none");
  infoReset();
  $("#modal").css("display", "none");
  $("#map").css("width", "56.5%");
  $(".reviewPanel")
  .animate({
    width: 'show',
 
 });
 
  
  /*var request = {
    placeId: 'marker.placeResult.place_id',
    fields: ['name', 'opening_hours', 'utc_offset_minutes']
};

service.getDetails(request, callback),*/

  places.getDetails({
     // location: place.geometry.location,
      placeId: marker.placeResult.place_id,
      fields: ['name', 'vicinity', 'geometry' , 'rating', 'photos', 'reviews','opening_hours','utc_offset_minutes'],
      title: name
    },
   /*

   // fields: ['opening_hours','utc_offset_minutes'],
 // },
   function (placeResult, status) {
    if (status !== 'OK') return; // something went wrong
    const isOpenAtTime = placeResult.opening_hours.isOpen(new Date('December 17, 2020 03:24:00'));
    if (isOpenAtTime) {
        // We know it's open.
    }

    const isOpenNow = placeResult.opening_hours.isOpen();
    if (isOpenNow) {
        // We know it's open.
    }*/ 


    function (place, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
      }
      infoWindow.open(map, marker);
      buildContent(place);

   
   //sv.getPanorama({location: event.latLng, radius: 50}, processSVData);
    });
}
/*const request = {
  placeId: 'marker.placeResult.place_id',
  fields: ['name', 'opening_hours', 'utc_offset_minutes']
};

const service = new google.maps.places.PlacesService(map);
service.getDetails(request, callback);

function callback(place, status) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) return;
  if (place.opening_hours && place.utc_offset_minutes) {
      console.log(`${place.opening_hours.weekday_text[0]}`);
      const isOpenNow = place.opening_hours.isOpen();
      if (isOpenNow) {
          console.log(`${place.name} is currently open.`);
      }
      const isOpenAtTime = place.opening_hours.isOpen(
          new Date('December 17, 2020 03:24:00')
      );
  
      if (isOpenAtTime) {
          console.log(`${place.name} will be open on Decemeber 17, 2020 at 03:24:00`);
      }
  }
}*/

function buildContent(place) {
  //console.log(results[i].geometry.location);
  //hides the streetview and adjusts location of logo
  //$("#place-photo").css("display", "block");
  $("#streetview").css("display", "none");
  $("#bluelogo2").css("margin-top", "270px")

  //adds place details to review panel heading
  $("#heading").html(place.name);
  if (place.vicinity) {
    $("#address").html(place.vicinity);
  }

  if (place.rating) {
    $("#place-rating").html(place.rating);
  }
  /*while (newPhoto.lastChild) {
    newPhoto.removeChild(newPhoto.lastChild);
  }*/
//if place photos are present, use them
   if (place.photos) {
      console.log(place.name + ": has place photos");
      //$("#streetview").empty();
    let firstPhoto = place.photos[0];
    photo.classList.add('places');
    photo.src = firstPhoto.getUrl();
    
    //$("#place-photo").append(photo);
    $(".place-images:first").append(photo);
    }
    else if(!place.photos){
      //if no place photo, show official logo
      $("#place-photo").empty();
       $("#official-logo").css("display", "block");
    }

  if (place.reviews) {
   
    $(".newReview p:nth-child(4)").html("\"" + place.reviews[4].text + "\"" + " &bigstar;" + place.reviews[4].rating + "<br>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + place.reviews[4].author_name);
    $(".newReview p:nth-child(3)").html("\"" + place.reviews[3].text + "\"" + " &bigstar;" + place.reviews[3].rating + "<br>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + place.reviews[3].author_name);
    $(".newReview p:nth-child(2)").html("\"" + place.reviews[2].text + "\"" + " &bigstar;" + place.reviews[2].rating + "<br>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + place.reviews[2].author_name);
    $(".newReview p:nth-child(1)").html("\"" + place.reviews[1].text + "\"" + " &bigstar;" + place.reviews[1].rating + "<br>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + place.reviews[1].author_name);
    $(".newReview p:last").html("\"" + place.reviews[0].text + "\"" + " &bigstar;" + place.reviews[0].rating + "<br>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + place.reviews[0].author_name);

  }
  /*while (newPhoto.lastChild) {
    newPhoto.removeChild(newPhoto.lastChild);
    //newPhoto.appendChild(newPhoto.child);
  }*/
  
}


function initMap() {
  //document.getElementById('autocomplete').style.color = "transparent";
  $("#streetview, #official-logo").css("display", "block");
 $(".reviewPanel").css("display", "none");
 

  $("#map").css("width", "78%").animate({width: 'show'});
  map = new google.maps.Map(document.getElementById('map'), {
   // center: {},
    zoom: 15,
    mapTypeControl: false,
     streetViewControl: false

  });
  infoWindow = new google.maps.InfoWindow();

jsonMarkers();


  //HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
      map.setCenter(pos);

      let marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: "Your location",
      });


  //Initial streetview is set to the user's location (if location is allowed)
  sv.getPanorama({location: pos, radius: 50}, processSVData),

 
 map.addListener('click', function(event) {
  //shows streetview based on click event
  if(event.placeId) {
    event.stop();
    //sv.getPanorama({location: event.latLng, radius: 50}, processSVData);
  
    clickMarker(event.latLng);
   }

    $("#addReview").attr("disabled", false).css("background-color" , "#00aeef");
  });
  
  var clickHandler = new ClickEventHandler(map);
    },function () {
      
      locationError();
      jsonMarkers();
      var clickHandler = new ClickEventHandler(map);
    });

  }
}
//end of initMap() */ 


function addMarker(location) {
  let marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/blue.png"
    },
  });
  markers.push(marker);

  marker.addListener('click', function() {
    var markerPanoID = data.location.pano;
    // Set the Pano to use the passed panoID.
    panorama.setPano(markerPanoID);
    panorama.setPov({
      heading: 270,
      pitch: 0
    });
    panorama.setVisible(true);
})
};

function clickMarker(location) {
  console.log("user marker addition");
  let marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green.png"
    },
  
   
  });
  markers.push(marker);

}
//If geolocation is blocked or not working locationError() runs
function locationError() {
  console.log("Location services unavailable");
  //SLC
  /*var origin = {
    lat: 40.760780,
    lng: -111.8336111,
  }*/
  var origin = {
    lat: 41.7366016,
    lng: -111.830630399,
  }
  
  
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: origin,
    mapTypeId: 'roadmap',
    mapTypeControl: false,
    streetViewControl: false
  });
  
  let marker = new google.maps.Marker({
    position: origin,
    map: map,
    title: "Default Location",
  });

  let sv = new google.maps.StreetViewService();
  panorama = new google.maps.StreetViewPanorama(document.getElementById('streetview'));

  //Streetview panorama
  sv.getPanorama({
    location: origin,
    radius: 50
  }, processSVData);

  map.addListener('click', function(event) {
    
    //place.photos = [];
    //buildContent(place);
   // newPhoto.removeChild(newPhoto);
  // $("#place-photo").css("display","none");
    //$("#place-photo").remove(photo);
    //$("#logoDiv").remove($("#place-photo"));
    //$("#official-logo").css("display", "block");
    //shows streetview based on click event
    if(event.placeId) {
      
      //$("#official-logo").css("display", "block");
     event.stop();
     //sv.getPanorama({location: event.latLng, radius: 50}, processSVData);
     clickMarker(event.latLng);
    }

   
  });
   
}
