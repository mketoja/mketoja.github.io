const x = document.getElementById("demo");

function geolocation() {
x.innerHTML = "test";
let const initial_lat, initial_lon;
let markers = [];

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(success, error);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function createMarkers(initial_lat, initial_lon) { 
       markers = [{name: "a",
                   lat: initial_lat + 0.001,
                   lon: initial_lon },
 
                   {name: "b", 
                    lat: initial_lat,
                    lon: initial_lon + 0.001 }];
                x.innerHTML = "Markers added.";
            }   

function success(position) {
    
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
  if(markers.length < 1) {
        initial_lat = position.coords.latitude;
        initial_lon = position.coords.longitude;
        createMarkers(initial_lat, initial_lon);
    }  
}

function error(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

