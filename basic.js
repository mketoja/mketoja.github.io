window.onload = () => {
    let markersAdded = false;

    function createMarkers(initial_lat, initial_lon) { 
                const markers = [{name: "a",
                                  lat: initial_lat + 0.001,
                                  lon: initial_lon },
 
                                  {name: "b", 
                                  lat: initial_lat,
                                  lon: initial_lon + 0.001 }];
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

    function calculate_distances(lat, lon, markers) {
        for (let i = 0; i < markers.length; i++) {
            Alert('Calculating marker distance');
            marker = markers[i];
            distance = distance(lat, lon, marker.lat, marker.lon);
            if (distance == 0) {
                alert('Found marker!' + marker.name);
            }
            return;
        }



    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {
        if(!markersAdded) {
            const initial_lat = e.detail.position.latitude;
            const initial_lon = e.detail.position.longitude; 
            alert(`Got first GPS position: lon ${initial_lon} lat ${initial_lat}`);
            // create markers
            markers = createMarkers(initial_lat, initial_lon);
            markersAdded = true;
            calculate_distances(e.detail.position.latitude, e.detail.position.longitude,markers);

        }

    });
};


