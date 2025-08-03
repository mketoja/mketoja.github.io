window.onload = () => {
    let markersAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    function createMarkers(beginning_lat, beginning_lon) { 
                alert('Marker function start');
                const markers = 1;
               return markers;
            }

    el.addEventListener("gps-camera-update-position", e => {
        if(!markersAdded) {
            const initial_lat = ${e.detail.position.latitude};
            
            const initial_lon = ${e.detail.position.longitude}; 
            alert(`Got first GPS position: lon lat`);
            // Add a box to the north of the initial GPS position
        const markers = createMarkers(initial_lat, initial_lon);
        alert('Markers created!');
        markersAdded = true;
        alert markers;
            
        }

    });
};


