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

	filterOnCity(dataset) {
		return (this.focused.city != null) ? dataset.filter(x => {
			for (let i = 0; i < x.categorylist.length) {
				if (x.categorylist[i].subcategories.includes(this.focused.city.id)) {
					return true;
				}
			}
			return false;
		}) : dataset;
	}

	filterOnCategory(dataset) {
		return (this.focused.category != null) ? dataset.filter(x => x.id === value) : dataset;
	}

	filterOnSubcat(dataset) {
		return (this.focused.subcats != null) ? dataset.filter(x => {
				for (let i = 0; i < x.categorylist.length; i++) {
					if (x.categorylist[i].subcategories.contains(this.focused.subcat.id)) {
						return true;
					}
				}
				return false;
			}) : dataset;
	}

	// Assigns proper function to the City select box.
	assignCitySelectEvent(elementId) {
		document.getElementById(elementId).onchange((value) => {
			// find the city by id, and set the focused city to it.
			this.focused.city = this.cities.find(x => x.id === value);
			this.availablePlaces = this.filterOnSubcat(this.filterOnCategory(this.filterOnCity(this.places)));
			if (this.mymap != null) {
				setView([city.latitude,city.longitude], 5);
			}
		});
	}

	// Assigns proper function to the Category select box.
	assignCategorySelectEvent(elementId) {
		document.getElementById(elementId).onchange((value) => {
			// find the category by id, and set the focused category to it.
			this.focused.category = this.categories.find(x => x.id === value);
			this.availablePlaces = this.filterOnSubcat(this.filterOnCategory(this.filterOnCity(this.places)));
			if (this.mymap != null) {
				setMarkers(this.availablePlaces);
			}
		});
	}

	assignSubcatSelectEvent(elementId) {
		document.getElementById(elementId).onchange((value) => {
			//find the subcategory by id, and set the focused subcatgory to it.
			this.focused.subcat = this.subcats.find(x => x.id === value);
			this.availablePlaces = this.filterOnSubcat(this.filterOnCategory(this.filterOnCity(this.places)));
			if (this.mymap != null) {
				setMarkers()
			}
		});
	}
}