window.onload = () => {
    let markersAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {
        if(!markersAdded) {
            const initial_lat = e.detail.position.latitude;
            const initial_lon = e.detail.position.longitude; 
            alert(`Got first GPS position: lon ${initial_lon} lat ${initial_lat}`);
            // Add a box to the north of the initial GPS position

        }
        markersAdded = true;
    });
};


