window.onload = () => {
    let markersAdded = false;

    function createMarkers(beginning_lat, beginning_lon) { 
                alert('Marker function start');
                const markers = 1;
                return markers;
            }    

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {
        if(!markersAdded) {
            const initial_lat = e.detail.position.latitude;
            const initial_lon = e.detail.position.longitude; 
            alert(`Got first GPS position: lon ${initial_lon} lat ${initial_lat}`);
            // create markers
            var markers =  createMarkers(initial_lat, initial_lon);
            alert('Markers added')
            markersAdded = true;
        }

    });
};


