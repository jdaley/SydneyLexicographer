function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(-33.869, 151.2082),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);

    var latLongLocation = new google.maps.LatLng(gMaps.answerLatitude,
        gMaps.answerLongitude,
        true);

    var marker = new google.maps.Marker({
        position: latLongLocation,
        map: map
    });

    var correctLocationContent = '<div id="content">' +
        '<h2>This is the correct location</h2>' +
        '<p>Add info about the place here</p>';

    var correctLocationWindow = new google.maps.InfoWindow({
        content: correctLocationContent
    });

    marker.setVisible(false);

    google.maps.event.addListener(map, 'click', function (event) {
        locationSelected(event.latLng, map, marker, correctLocationWindow);
    });
}

function locationSelected(location, map, correctPosition, infoWindow) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Your Guess'
    });

    correctPosition.setVisible(true);
    infoWindow.open(map, correctPosition);

    map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    map.setZoom(15);
    map.setCenter(location);
}

function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBIdcGud1iJTvo7V4GxwPVP-fh_7cD9slQ&sensor=false&callback=initialize";
    document.body.appendChild(script);
}

window.onload = loadScript;