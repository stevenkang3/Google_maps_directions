var x = document.getElementById("geoLocation");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}

$(document).on('click', '#getGeolocation', function(){
console.log("clicked");
getLocation();
});

//============= Map Page =========

var y = document.getElementById("map-canvas");
var mapLatitude;
var mapLongitude;
var myLatLng;

function getMapLocation() {
  console.log("getMapLocation")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showMapPosition);
    } else {
        y.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showMapPosition(position) {
    console.log("showLocation")
    mapLatitude = position.coords.latitude;
    mapLongitude = position.coords.longitude;
    myLatLng = new google.maps.LatLng(mapLatitude, mapLongitude),
    getMap();
}
var map;
function getMap() {
    console.log("getMap")
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(mapLatitude, mapLongitude),
    zoom: 12
  });

  var marker = new google.maps.Marker({
  position: myLatLng,
  map: map,
  title: 'Event Location!'
});
}

$( document ).on( "pageinit", "#mapPage", function( event ) {
  getMapLocation();
});

// ===== Directions Page ========

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var directionsMap;
var z = document.getElementById("directions-canvas");
var start;
var end;

function getDirectionLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showDirectionPosition);
    } else {
        z.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showDirectionPosition(position) {
    directionsLatitude = position.coords.latitude;
    directionsLongitude = position.coords.longitude;
    directionsLatLng = new google.maps.LatLng(directionsLatitude, directionsLongitude),
    getDirections();
}

function getDirections() {
  console.log('getdirection');
  directionsDisplay = new google.maps.DirectionsRenderer();
  // start = new google.maps.LatLng(directionsLatLng);
  var mapOptions = {
    zoom: 12,
    center: start
  }
  directionsMap = new google.maps.Map(document.getElementById("directions-canvas"), mapOptions);
  directionsDisplay.setMap(directionsMap);
  calcRoute();
}

function calcRoute() {
  // var start = document.getElementById("start").value;
  // var end = document.getElementById("end").value;
  console.log('calRoute');
  start = directionsLatLng;
  end = "11539 Amalfi Way Los Angeles, CA 91326";
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}
$( document ).on( "pageinit", "#directionsPage", function( event ) {
  getDirectionLocation();

});


// ======= DIRECTIONS =======
function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom:12,
    center: start
  });
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('right-panel'));

  var control = document.getElementById('floating-panel');
  control.style.display = 'block';
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('start').addEventListener('change', onChangeHandler);
  document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  directionsService.route({
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}


$( document ).on( "pageinit", "#directionPage", function( event ) {
  initMap();
});
