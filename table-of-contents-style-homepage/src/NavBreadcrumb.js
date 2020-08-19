class NavBreadcrumb {
	cities;
	categories;
	subcats;
	places;
	mymap;
	// This object contains the selected options in the breadcrumb navigation.
	// NOTE: these will contain the id of the fields, not the whole object.
	focused = {city: null, category: null, subcat: null};
	availableSubcats;
	availablePlaces;

	constructor(cities, categories, subcats, places, mymap = null) {
		this.cities = cities;
		this.categories = categories;
		this.subcats = subcats;
		this.places = places;
		this.mymap = mymap;
	}

	/*
	This will provide a coordinate set for the setView method when we want to 
	set the view of the map.
	It does this by getting the minimum and maximum of the availablePlace
	array's latitude and longitude, and then averages them out to find the
	central point between all locations on the map.
	*/
	get viewCoordinates() {
		if (this.availablePlaces != null || this.availablePlaces != "") {
			let x = () => {
				let lx = this.availablePlaces.filter(x => x.latitude != 0).map(p => p.latitude);
				return (Math.min(...lx) + Math.max(...lx)) / 2;
			}
			let y = () => {
				let ly = this.availablePlaces.filter(x => x.longitude != 0).map(p => p.longitude);
				return (Math.min(...ly) + Math.max(...ly)) / 2;
			}
			return [x(), y()];	
		}
		return null;
	}

	get selectsAreChecked() {
		return this.focused.city != null &&
			this.focused.category != null &&
			this.focused.subcat != null;
	}

	// Generates multiple option elements
	generateOptionElements(objArray) {
		let elementString = "";
		for (let i = 0; i < objArray.length; i++) {
			elementString += this.generateOptionElement(objArray[i]);
		}
		return elementString;
	}

	// Generates a single option element
	generateOptionElement(obj) {
		return `<option value=${obj.id}>${obj.name}</option>`;
	}

	// Writes an element string (objString) the element's innerHTML (elementId)
	placeOptionElements(elementId, objString) {
		document.getElementById(elementId).innerHTML = objString;
	}

	// pass in an array of places, and returns a filtered version based on
	// what's stored in this.focused.city
	filterOnCity(dataset) {
		return (this.focused.city != null && this.focused.city != "") ?
			dataset.filter(x => x.subcategorylist.map(c => c.id).includes(this.focused.city)) : dataset;
	}

	// pass in an array of places, and returns a filtered version based on
	// what's stored in this.focused.category
	filterOnCategory(dataset) {
		return (this.focused.category != null && this.focused.city != "") ? 
			dataset.filter(x => x.categorylist.map(c => c.id).includes(this.focused.category)) : dataset;
	}

	// pass in an array of places, and returns a filtered version based on
	// what's stored in this.focused.subcat
	filterOnSubcat(dataset) {
		return (this.focused.subcat != null && this.focused.subcat != "") ? 
			dataset.filter(x => x.subcategorylist.map(c => c.id).includes(this.focused.subcat)) : dataset;
	}

	// This will filter out the subcategories that aren't part of the parent
	// category stored in this.focused.category
	filterSubcatOptions() {
		return (this.focused.category != null && this.focused.category != "") ?
			this.subcats.filter(x => this.categories.find(c => c.id === this.focused.category).subcategories.includes(x.id)) : this.subcats;
	}

	// Assigns proper function to the City select box.
	assignCitySelectEvent(elementId, newEvent) {
		document.getElementById(elementId).addEventListener("change", newEvent);
	}

	// Assigns proper function to the Category select box.
	assignCategorySelectEvent(catElementId, newEvent) {
		document.getElementById(catElementId).addEventListener("change", newEvent);
	}

	// Assigns proper function to the Subcategory select box.
	assignSubcatSelectEvent(elementId, newEvent) {
		document.getElementById(elementId).addEventListener("change", newEvent);
	}
}