(function(window, document, undefined) {
  var GoogleMapView = {};
  
  // zoom level for Google Map
  var DEFAULT_ZOOM = 14;
  var STATUS_OK = 200;
  var GEOCODING_URL = "https://maps.googleapis.com/maps/api/geocode/json?address="

  /* Renders a map for the given entry into the provided $map element. */
  GoogleMapView.render = function($map, entryData) {
	  var request = new XMLHttpRequest();
	  request.addEventListener('load', function() {
		  var data = JSON.parse(request.responseText);
		  if(request.status === STATUS_OK && data.status === "OK") {
			  var setLocation = data.results[0].geometry.location;
			  createMap($map, setLocation);
		  }
		  else if(request.status === STATUS_OK) $("div.error").text(request.responseText); 
	  });
	  var address = entryData.address.trim();
	  var urlToGet = GEOCODING_URL + address.replace(/ /g, "+");
	  request.open('GET', urlToGet);
	  request.send();
  };
  // this function actually creates the map. if all the components are
  // valid in the render function then this will be called to render the
  // map.
  function createMap($map, setLocation) {
	  var mapOptions = {
		  center: setLocation, 
		  zoom: DEFAULT_ZOOM 
	  };
	  var map = new google.maps.Map($map[0], mapOptions);
	  var marker = new google.maps.Marker({
		  position: setLocation,
		  map: map,
	  });
  }


  window.GoogleMapView = GoogleMapView;
})(this, this.document);
