// Generates multiple option elements
function generateOptionElements(objArray) {
	let elementString = "";
	for (let i = 0; i < objArray.length; i++) {
		elementString += generateOptionElement(objArray[i]);
	}
	return elementString;
}

// Generates a single option element
function generateOptionElement(obj) {
	return `<option value=${obj.id}>${obj.name}</option>`;
}

// Writes an element string (objString) the element's innerHTML (elementId)
function placeOptionElements(elementId, objString) {
	document.getElementById(elementId).innerHTML = objString;
}