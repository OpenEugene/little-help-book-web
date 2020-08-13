const mymap = L.map('mapid').setView([51.505, -0.09], 13);

function mapInit() {
	let attribution = '&copy; <a href="https://carto.com/">Carto</a>';
	let tiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png", { attribution });
	tiles.addTo(mymap);
}

function setMarkers(placesArray) {
	for (int i = 0; i < placeArray.length; i++) {
		setMarker(placesArray[i]);
	}
}

function setMarker(placeInfo) {
	if (placeInfo.latitude != 0 || placeInfo.longitude != 0) {
		L.marker([placeInfo.latitude,placeInfo.longitude], {title: placeInfo.name}).addTo(mymap);	
	}
}

function setView(coordArray, zoom) {
	mymap.setView(coordArray, zoom);
}

mapInit();