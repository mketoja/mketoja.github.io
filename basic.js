window.onload = () => {
    let testEntityAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    function createmarkers(beginning_lat, beginning_lon) { 
                const markers = [
                    {lat: beginning_lat + 0.001,
                     long: beginning_long,
                     event: "x" 
                     },
                    {lat: beginning_lat,
                     long: beginning_long + 0.001
                     event: "y"
                    }
                ];
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

        }

    el.addEventListener("gps-camera-update-position", e => {
        if(!markersAdded) {
            alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
            // Add a box to the north of the initial GPS position
        const markers = createmarkers(${e.detail.position.latitude}, ${e.detail.position.longitude});
            

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
        markersAdded = true;
    });
};


