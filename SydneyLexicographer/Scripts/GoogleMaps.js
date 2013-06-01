var markersArray = [];
var map = null;

function initialize() {
    var mapOptions = {
        // Centre of sydney
        center: new google.maps.LatLng(-33.869, 151.2082),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);

    var latLongLocation = new google.maps.LatLng(gMaps.answerLatitude,
        gMaps.answerLongitude,
        true);
    
    // Marker for the correct location
    var marker = new google.maps.Marker({
        position: latLongLocation,
        map: map
    });

    markersArray.push(marker);

    marker.setVisible(false);

    google.maps.event.addListener(map, 'click', function (event) {
        locationSelected(event.latLng);
    });
}

function locationSelected(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Your Guess'
    });

    // Clear out previous markers from the map
    clearMarkers();

    markersArray.push(marker);
}

function clearMarkers() {
    if (markersArray.length > 1) {
        for (var i = 1; i < markersArray.length; i++) {
            markersArray[i].setMap(null);
            markersArray.pop();
        }
    }
}

function showAnswer() {
    if (markersArray.length > 0) {
        var correctPosition = markersArray[0];
        correctPosition.setVisible(true);

        // Build up info window for marker
        var correctLocationContent = '<div id="content">' +
            '<h2>This is the correct location</h2>' +
            '<p>Add info about the place here</p>';

        var correctLocationWindow = new google.maps.InfoWindow({
            content: correctLocationContent
        });
        correctLocationWindow.open(map, correctPosition);

        map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        map.setZoom(16);
        // Need to make this the center of the two markers
        //map.setCenter(location);
    }
}

function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBIdcGud1iJTvo7V4GxwPVP-fh_7cD9slQ&sensor=false&callback=initialize";
    document.body.appendChild(script);
}

window.onload = loadScript;