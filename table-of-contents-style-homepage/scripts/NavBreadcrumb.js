class NavBreadcrumb {
	cities; // Stores an array of city objects
	categories; // Stores an array of category objects
	subcats; // Stores an array of subcategory objects
	places; // Stores an array of place objects
	mymap; // Stores a Leaflet map object
	// This object contains the selected options in the breadcrumb navigation.
	// NOTE: these will contain the id of the fields, not the whole object.
	focused = {city: null, category: null, subcat: null};
	availableCategories; // Stores the filtered categories
	availableSubcats; // Stores the filtered subcategories
	availablePlaces; // Stores the filtered providers based on the focused items

	// This constructor gives the option for a user to pass in a leaflet map.
	constructor(cities, categories, subcats, places, mymap = null) {
		this.cities = cities;
		this.categories = categories;
		this.subcats = subcats;
		this.places = places;
		this.mymap = mymap;
	}

	// This is a shortcut to evaluate if a value is null, zero or an empty array.
	isNullOrZero(item) {
		return item == 0 || item == null || item == [];
	}

	/*
	This will provide a coordinate set for the setView method when we want to 
	set the view of the map.
	It does this by getting the minimum and maximum of the availablePlace
	array's latitude and longitude, and then averages them out to find the
	central point between all locations on the map.
	*/
	get viewCoordinates() {
		let ap = this.availablePlaces;
		if (!this.isNullOrZero(ap)) {
			let x = () => {
				let lx = ap.map(p => p.latitude).filter(x => x != null && x != 0);
				return (Math.min(...lx) + Math.max(...lx)) / 2;
			}
			let y = () => {
				let ly = ap.map(p => p.longitude).filter(x => x != null && x != 0);
				return (Math.min(...ly) + Math.max(...ly)) / 2;
			}
			return [x(), y()];
		}
		return [44.0521,-123.0868];
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
		let fc = this.focused.city;
		return (fc != "NA" && !this.isNullOrZero(fc)) ? 
			dataset.filter(x => { return (x.city != null) ? x.city.includes(fc) : true; })
				.sort((a, b) => {
					if (a.city != null && b.city == null) {
						return -1;
					}
					if (a.city == null && b.city != null) {
						return 1;
					}
					return 0;
				}) : dataset;
	}

	// pass in an array of places, and returns a filtered version based on
	// what's stored in this.focused.category
	filterOnCategory(dataset) {
		let fc = this.focused.category;
		return (fc != "NA" && !this.isNullOrZero(fc)) ? 
			dataset.filter(x => (x.category != null) ? x.category.includes(fc) : false) : dataset;
	}

	// pass in an array of places, and returns a filtered version based on
	// what's stored in this.focused.subcat
	filterOnSubcat(dataset) {
		let fsc = this.focused.subcat;
		return (fsc != "NA" && !this.isNullOrZero(fsc)) ? 
			dataset.filter(x => { return (x.subcategory != null) ? x.subcategory.includes(fsc) : false; }) : dataset;
	}

	// This will filter out the subcategories that aren't part of the parent
	// category stored in this.focused.category
	filterSubcatOptions() {
		let fc = this.focused.category
		return (fc != "NA" && !this.isNullOrZero(fc)) ?
			this.subcats.filter(x => { return (this.categories.find(c => c.id === fc).subcategories != null) ? 
				x.id === "NA" || this.categories.find(c => c.id === fc).subcategories.includes(x.id) : false }) : this.subcats;
	}

	filterCategoryOptions() {
		let fc = this.focused.city;
		return (fc != "NA" && !this.isNullOrZero(fc)) ?
			this.categories.filter(x => x.id === "NA" || this.availablePlaces.map(x => x.category).filter(x => x != null)
				.reduce((accumulator, currentValue) => accumulator.concat(currentValue))
					.filter((value, index, self) => self.indexOf(value) === index).includes(x.id)) : this.categories;
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