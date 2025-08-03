window.onload = () => {
    let markersAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    function createMarkers(beginning_lat, beginning_lon) { 
                alert('Marker function start');
                const markers = 1;
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

    function calculate_distances(lon, lat, markers) {
        for (let i = 0; i < markers.length; i++) {
            Alert('Calculating marker distance');
            marker = markers[i];
            distance = distance(lat, lon, marker.lat, marker.lon);
            if (distance == 0) {
                alert('Found marker!' + marker.name);
            }
            return;
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
            

const entity = document.createElement("a-box");
            entity.setAttribute("scale", {
                x: 20, 
                y: 20,
                z: 20
            });
            entity.setAttribute('material', { color: 'red' } );
            entity.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude + 0.001,
                longitude: e.detail.position.longitude
            });
            document.querySelector("a-scene").appendChild(entity);
        }

    });
};


