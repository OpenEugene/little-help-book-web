// Mock data. This will be replaced with some sort of function to fetch data later.
const cities = [{id: "rec1", name: "Eugene"}, {id: "rec2", name: "Portland"}, {id: "rec3", name: "Wisconsin Dells"}];

function generateOptionElements(objArray) {
	let elementString = "";
	for (let i = 0; i < objArray.length; i++) {
		elementString += generateOptionElement(objArray[i]);
	}
	return elementString;
}

function generateOptionElement(obj) {
	return `<option value=${obj.id}>${obj.name}</option>`;
}

function placeOptionElements(elementId, objString) {
	document.getElementById(elementId).innerHTML = objString;
}

placeOptionElements("citySelect", generateOptionElements(cities));