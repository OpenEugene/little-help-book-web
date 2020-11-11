"use strict"
$(document).ready(initData(true, true, true));

function updateDom() {
	if (nbc.mymap != null) {
        setMarkers(nbc.availablePlaces);
    }
}