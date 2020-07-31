function mapInit() {
	var mymap = L.map('mapid').setView([51.505, -0.09], 13);
	var attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
	var tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution });
	tiles.addTo(mymap);
}

mapInit();