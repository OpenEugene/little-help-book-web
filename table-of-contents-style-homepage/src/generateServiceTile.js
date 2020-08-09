const places = [{id: "rec1", name: "Department of Human services", address: "2101 W. 11 th Ave., Eugene, OR 97402", phone: "541-686-7722", website: "https://www.dcfoffices.org/office/west-eugene-dhs-office", description: "State- and federally-funded services. Food benefits (SNAP), employment services, cash assistance (TANF), domestic violence services, child welfare services, health benefits (OHP), senior citizens services. Also, apply for free phones, search for jobs, bathrooms. Apply for services by paper or by computers provided.", hours: "M-F 7AM - 6PM"}];
const places2 = [{"id":"rec0KEybPLVxeNQ21","name":"Eugene Police non-emergency line","nameSpanish":null,"phone":"541 682-5111","address":null,"categories":null,"categoryName":"Information","categoryList":[{"id":"recVOvYENdFBUNQip","name":"Information","nameSpanish":"Información","subcategories":["recHUTQxrnDpIYLN9","recGw7WjXZB0LFEKp"],"subcategoryList":[{"id":"recHUTQxrnDpIYLN9","name":"Crisis Lines / Hotlines","nameSpanish":"Líneas de crisis/Líneas de calor","order":1},{"id":"recGw7WjXZB0LFEKp","name":"Referral and Information Services","nameSpanish":"Servicios de Referencia e Información","order":2}],"order":8}],"subcategories":null,"subcategoryName":"Crisis Lines / Hotlines","subcategoryList":[{"id":"recHUTQxrnDpIYLN9","name":"Crisis Lines / Hotlines","nameSpanish":"Líneas de crisis/Líneas de calor","order":1}],"latitude":0,"longitude":0,"url":null,"email":null,"hours":"24/7","description":"Eugene Police non-emergency line"}]

function generateServiceTiles(objArray) {
	let objString = "";
	for (let i = 0; i < objArray.length; i++) {
		objString += generateServiceTile(objArray[i]);
	}
	return objString;
}

function generateServiceTile(obj) {
	return `<div class="tile" id=${obj["id"]}>
                <div class="provider-name">${obj["name"]}</div>
                <div class="provider-address">${obj["address"]}</div>
                <div class="provider-phone">${obj["phone"]}</div>
                <div class="provider-website"><a target="_blank" href="${obj["url"]}">${obj["url"]}</a></div>
                <div class="provider-description">${obj["description"]}</div>
                <div class="last-line">
                    <div class="provider-hours">Hours:  ${obj["hours"]}</div>
                    <div class="legend-icons"> <i class="ri-earth-fill"></i><i class="ri-wheelchair-fill"></i></div>
                </div>
            </div>`
}

function placeServiceTiles(elementId, objString) {
	document.getElementById(elementId).innerHTML = objString;
}