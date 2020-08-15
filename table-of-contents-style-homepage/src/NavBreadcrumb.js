class NavBreadcrumb {
	cities;
	categories;
	subcats;
	places;
	mymap;
	focused = {city: null, category: null, subcat: null};
	availablePlaces;

	constructor(cities, categories, subcats, places, mymap = null) {
		this.cities = cities;
		this.categories = cats;
		this.subcats = subcats;
		this.places = places;
		this.mymap = mymap;
	}

	get cities() {
		return this.cities;
	}

	get categories() {
		return this.categories;
	}

	get subcats() {
		return this.subcats;
	}

	get places() {
		return this.places;
	}

	get availablePlaces() {
		return this.availablePlaces;
	}

	/*
	This will provide a coordinate set for the setView method when we want to 
	set the view of the map.
	It does this by getting the minimum and maximum of the availablePlace
	array's latitude and longitude, and then averages them out to find the
	central point between all locations on the map.
	*/
	get viewCoordinates() {
		let x = () => {
			let lx = this.availablePlaces.map(p => p.latitude);
			return (lx.max() + lx.min()) / 2;
		}
		let y = () => {
			let ly = this.availablePlaces.map(p => p.longitude);
			return (ly.max() + ly.min()) / 2;
		}
		return [x(), y()];
	}

	// Generates multiple option elements
	generateOptionElements(objArray) {
		let elementString = "";
		for (let i = 0; i < objArray.length; i++) {
			elementString += generateOptionElement(objArray[i]);
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

	filterOnCity(dataset) {
		return (this.focused.city != null) ?
			dataset.filter(x => x.subcategorylist.map(c => c.id).includes(this.focused.city)) : dataset;
	}

	filterOnCategory(dataset) {
		return (this.focused.category != null) ? 
			dataset.filter(x => x.categorylist.map(c => c.id).contains(this.focused.category)) : dataset;
	}

	filterOnSubcat(dataset) {
		return (this.focused.subcats != null) ? 
			dataset.filter(x => x.subcategorylist.map(c => c.id).contains(this.focused.subcat)) : dataset;
	}

	// Assigns proper function to the City select box.
	assignCitySelectEvent(elementId) {
		document.getElementById(elementId).onchange((value) => {
			// find the city by id, and set the focused city to it.
			this.focused.city = this.cities.find(x => x.id === value).id;
			/*
			This function chain checks for a selected city, category and subcategory.
			It then will filter the list of places on the selected items.
			*/
			this.availablePlaces = this.filterOnSubcat(this.filterOnCategory(this.filterOnCity(this.places)));
			if (this.mymap != null) {
				setView(this.viewCoordinates)
			}
		});
	}

	// Assigns proper function to the Category select box.
	assignCategorySelectEvent(elementId) {
		document.getElementById(elementId).onchange((value) => {
			// find the category by id, and set the focused category to it.
			this.focused.category = this.categories.find(x => x.id === value).id;
			/*
			This function chain checks for a selected city, category and subcategory.
			It then will filter the list of places on the selected items.
			*/
			this.availablePlaces = this.filterOnSubcat(this.filterOnCategory(this.filterOnCity(this.places)));
			if (this.mymap != null) {
				setMarkers(this.availablePlaces);
			}
		});
	}

	assignSubcatSelectEvent(elementId) {
		document.getElementById(elementId).onchange((value) => {
			//find the subcategory by id, and set the focused subcatgory to it.
			this.focused.subcat = this.subcats.find(x => x.id === value).id;
			/*
			This function chain checks for a selected city, category and subcategory.
			It then will filter the list of places on the selected items.
			*/
			this.availablePlaces = this.filterOnSubcat(this.filterOnCategory(this.filterOnCity(this.places)));
			if (this.mymap != null) {
				setMarkers(this.availablePlaces);
			}
		});
	}
}