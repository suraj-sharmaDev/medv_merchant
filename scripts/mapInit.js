const initMap = () => {
	var mapDiv = document.getElementById('map');
	mapDiv.classList.add("map");
	var directionsService = new google.maps.DirectionsService();
	var directionsDisplay = new google.maps.DirectionsRenderer();

	var map = new google.maps.Map(mapDiv, {
	    zoom: 7,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	directionsDisplay.setMap(map);

	var request = {
	    origin: {
	        lat: _localStorage.coordinates.lat,
	        lng: _localStorage.coordinates.lng
	    },
	    destination: {
	        lat: customerCoords.lat,
	        lng: customerCoords.lng
	    },
	    travelMode: google.maps.DirectionsTravelMode.DRIVING
	};

	directionsService.route(request, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	        directionsDisplay.setDirections(response);
	    }
	});
}