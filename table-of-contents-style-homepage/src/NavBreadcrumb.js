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
		if (this.availablePlaces != null) {
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
		return null;
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

	// pass in an array of places, and returns a filtered version based on
	// what's stored in this.focused.city
	filterOnCity(dataset) {
		return (this.focused.city != null) ?
			dataset.filter(x => x.subcategorylist.map(c => c.id).includes(this.focused.city)) : dataset;
	}

	// pass in an array of places, and returns a filtered version based on
	// what's stored in this.focused.category
	filterOnCategory(dataset) {
		return (this.focused.category != null) ? 
			dataset.filter(x => x.categorylist.map(c => c.id).includes(this.focused.category)) : dataset;
	}

	// pass in an array of places, and returns a filtered version based on
	// what's stored in this.focused.subcat
	filterOnSubcat(dataset) {
		return (this.focused.subcats != null) ? 
			dataset.filter(x => x.subcategorylist.map(c => c.id).includes(this.focused.subcat)) : dataset;
	}

	// This will filter out the subcategories that aren't part of the parent
	// category stored in this.focused.category
	filterSubcatOptions() {
		return (this.focused.category != null) ?
			subcats.filter(x => categories.find(c => c.id === this.focused.category).subcategories.includes(x.id)) : subcats;
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

	// Assigns proper function to the Subcategory select box.
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