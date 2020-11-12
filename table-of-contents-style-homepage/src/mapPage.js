"use strict"
$(document).ready(initData(true, true, true));

function updateDom() {
	if (nbc.mymap != null) {
        setMarkers(nbc.availablePlaces);
        if (nbc.focused.city == "NA") {
            setView(nbc.viewCoordinates, 10);
        } else {
            setView(nbc.viewCoordinates);
        }
    }
}