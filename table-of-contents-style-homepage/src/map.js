const mymap = L.map('mapid').setView([51.505, -0.09], 13);
markers = [];

function mapInit() {
	let attribution = '&copy; <a href="https://carto.com/">Carto</a>';
	let tiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png", { attribution });
	tiles.addTo(mymap);
}

function setMarkers(placesArray) {
	for (let i = 0; i < placesArray.length; i++) {
		createMarker(placesArray[i]);
	}
	removeMarkers();
	for (let i = 0; i < placesArray.length; i++) {
		mymap.addLayer(markers[i]);
	}
}

function createMarker(placeInfo) {
	if (placeInfo.latitude != 0 || placeInfo.longitude != 0) {
		let marker = new L.marker([placeInfo.latitude,placeInfo.longitude], {title: placeInfo.name})
		marker.bindPopUp(`<h3>${placeInfo.name}</h3>`);
		markers.push(marker);
	}
}

function removeMarkers() {
	markers.forEach(m => {
		map.removeLayer(m);
	});
	markers = [];
}

function setView(coordArray, zoom) {
	mymap.setView(coordArray, zoom);
}

mapInit();