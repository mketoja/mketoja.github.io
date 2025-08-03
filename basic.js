window.onload = () => {
    let markersAdded = false;

    function createMarkers(initial_lat, initial_lon) { 
                markers = [{      name: a,
                                  lat: 1,
                                  lon: 2 },
 
                                  {name: b, 
                                  lat: 1,
                                  lon: 2 }];
                alert('Markers added');
                return markers;
            }   

    function distance(lat1, lon1, lat2, lon2) {
        const r = 6371; // km
        const p = Math.PI / 180;

        const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                  (1 - Math.cos((lon2 - lon1) * p)) / 2;

        return 2 * r * Math.asin(Math.sqrt(a));
        } 



    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {
        if(!markersAdded) {
            const initial_lat = e.detail.position.latitude;
            const initial_lon = e.detail.position.longitude; 
            alert(`Got first GPS position: lon ${initial_lon} lat ${initial_lat}`);
            // create markers
            markers = createMarkers(initial_lat, initial_lon);
            alert('Markers added');
            markersAdded = true;

        }

    });
};


