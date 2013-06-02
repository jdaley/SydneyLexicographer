var markersArray = [];
var map = null;
var gMaps = {
    answerLatitude: '',
    answerLongitude: ''
}

function initialize() {
    var mapOptions = {
        // Centre of sydney
        center: new google.maps.LatLng(-33.869, 151.2082),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);

    google.maps.event.addListener(map, 'click', function (event) {
        locationSelected(event.latLng);
    });
}

function initializeMapMarkers() {
    // clear map markers
    clearAllMarkers();

    var latLongLocation = new google.maps.LatLng(gMaps.answerLatitude,
        gMaps.answerLongitude,
        true);

    // Marker for the correct location
    var marker = new google.maps.Marker({
        position: latLongLocation,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });

    markersArray.push(marker);
    marker.setVisible(false);
}

function locationSelected(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Your Guess'
    });

    // Clear out previous markers from the map
    clearLastMarker();

    markersArray.push(marker);
}

function clearAllMarkers() {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }

    markersArray = [];
}

// Clears markers except the first one, ecause it is the answer one.
// Allows multiple clicks but only stores the last.
function clearLastMarker() {
    if (markersArray.length > 1) {
        markersArray[1].setMap(null);
        markersArray.pop();
    }
}

function showAnswer() {
    if (markersArray.length > 0) {
        var correctPosition = markersArray[0];
        correctPosition.setVisible(true);

        markersArray[0].setMap(map);

        // Center the map between the two points
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markersArray.length; i++) {
            bounds.extend(markersArray[i].position);
        }

        map.fitBounds(bounds);
    }
}

// Returns distance in km
function distanceDelta() {
    if (markersArray && markersArray.length === 2) {
        return distanceBetweenMarkers(markersArray[0], markersArray[1]);
    }

    return null;
}


function distanceBetweenMarkers(marker1, marker2) {
    var height = marker1.position.lng() - marker2.position.lng();
    var width = marker1.position.lat() - marker2.position.lat();
    
    var R = 6371; // km
    var dLat = (width).toRad();
    var dLon = (height).toRad();
    var lat1 = marker2.position.lat().toRad();
    var lat2 = marker1.position.lat().toRad();

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c;
}

google.maps.event.addDomListener(window, 'load', initialize);
