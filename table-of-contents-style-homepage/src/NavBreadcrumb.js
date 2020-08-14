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

	// Assigns proper function to the City select box.
	assignCitySelectEvent(elementId) {
		document.getElementById(elementId).onchange((value) => {
			this.focused.city = this.cities.find(x => x.id === value);
			if (mymap != null) {
				setView([city.latitude,city.longitude], 5);
			}
		});
	}

	// Assigns proper function to the Category select box.
	assignCategorySelectEvent(elementId) {
		document.getElementById(elementId).onchange((value) => {
			this.focused.category = this.categories.find(x => x.id === value);
			availablePlaces = this.places.filter(x => x.categorylist.includes(this.focused.category));
			// if there's a selected subcategory, filter the availablePlaces on it.
			availablePlaces = (this.focused.subcats != null) ? availablePlaces.filter(x => {
				for (let i = 0; i < categorylist.length; i++) {
					if (categorylist[i].subcategories.contains(this.focused.subcat.id)) {
						return true;
					}
				}
				return false;
			}) : availablePlaces;
			if (mymap != null) {
				setMarkers()
			}
		});
	}

	assignSubcatSelectEvent(elementId) {
		document.getElementById(elementId).onchange((value) => {
			this.focused.subcat = this.subcats.find(x => x.id === value);
			// if there's a selected category, filter the availablePlaces on it.
			let availablePlaces = this.places.filter(x => x.categorylist.includes(this.focused.category));
			availablePlaces = (this.focused.subcats != null) ? availablePlaces.filter(x => {
				for (let i = 0; i < categorylist.length; i++) {
					if (categorylist[i].subcategories.contains(this.focused.subcat.id)) {
						return true;
					}
				}
				return false;
			}) : availablePlaces;
			if (mymap != null) {
				setMarkers()
			}
		});	
	}
}