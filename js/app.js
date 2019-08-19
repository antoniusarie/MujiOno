
function init() {
    document.addEventListener('deviceready', startUp, false);
}

function startUp() {
    console.log('Loading...');
    document.addEventListener('backbutton', doClose, false);
}
    
function doClose() {
    navigator.notification.confirm(
        'Keluar dari Aplikasi ?',
    exitApps,
        'Aplikasiku',
        'Ok,Cancel'
    );
}
    
function exitApps(buttonIndex) {
    var x = confirm("Yakin Keluar ?");
    if( x == true && buttonIndex == 1){
    navigator.app.exitApp();
    }
    else {
    window.close();
    }
}

var onSuccess = function(position) {
    var element = document.getElementById('geo-map');  
    var lat = position.coords.latitude;  
    var long = position.coords.longitude;  
    // element.innerHTML = '<br /> Latitude: ' + position.coords.latitude + '<br />' + 'Longitude: ' + position.coords.longitude + '<br />' + '<hr />';  
     element.innerHTML = '<iframe class="map mb-0" src="https://maps.google.com/maps?q='+ lat +','+ long +'&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" allowfullscreen></iframe>'; 
};
// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);

var Latitude = undefined;
var Longitude = undefined;

// Get geo coordinates

function getMapLocation() {

    navigator.geolocation.getCurrentPosition
    (onMapSuccess, onMapError, { enableHighAccuracy: true });
}

// Success callback for get geo coordinates

var onMapSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;

    getMap(Latitude, Longitude);

}

// Get map by using coordinates

function getMap(latitude, longitude) {

    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);


    var latLong = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: latLong
    });

    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());
}

// Success callback for watching your changing position

var onMapWatchSuccess = function (position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

        Latitude = updatedLatitude;
        Longitude = updatedLongitude;

        getMap(updatedLatitude, updatedLongitude);
    }
}

// Error callback

function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// Watch your changing position

function watchMapPosition() {

    return navigator.geolocation.watchPosition
    (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
}