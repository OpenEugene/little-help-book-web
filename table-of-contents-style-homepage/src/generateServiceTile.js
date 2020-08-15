function generateServiceTiles(objArray) {
	let objString = "";
	for (let i = 0; i < objArray.length; i++) {
		objString += generateServiceTile(objArray[i]);
	}
	return objString;
}

function generateServiceTile(obj) {
	let urlTemplate = (obj["url"] != null) ? `<a target="_blank" href="${obj["url"]}">${obj["url"]}</a>` : "No website provided";
	return `<div class="tile" id=${obj["id"]}>
                <div class="provider-name">${obj["name"]}</div>
                <div class="provider-address">${ (obj["address"] != null) ? obj["address"] : "No address provided" }</div>
                <div class="provider-phone">${ (obj["phone"] != null) ? obj["phone"] : "No phone number provided" }</div>
                <div class="provider-website">${urlTemplate}</div>
                <div class="provider-description">${ (obj["description"] != null) ? obj["description"] : "No description provided" }</div>
                <div class="last-line">
                    <div class="provider-hours">Hours:  ${ (obj["hours"] != null) ? obj["hours"] : "Not provided" }</div>
                    <div class="legend-icons"><i class="ri-earth-fill"></i><i class="ri-wheelchair-fill"></i></div>
                </div>
            </div>`
}

function placeServiceTiles(elementId, objString) {
	document.getElementById(elementId).innerHTML = objString;
}