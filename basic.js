window.onload = () => {
    let markersAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    function createMarkers(lat, lon) { 
                alert('Marker function start');
                var markers = 1;
                return markers;
            }

    el.addEventListener("gps-camera-update-position", async(e) => {
        if(!markersAdded) {
            const initial_lat = e.detail.position.latitude;
            const initial_lon = e.detail.position.longitude; 
            alert(`Got first GPS position: lon lat`);
            // Add a box to the north of the initial GPS position
             
        }

    });
};


