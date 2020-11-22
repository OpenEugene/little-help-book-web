const mockCities = [
	{"id": "rec1", "name": "Atlantis"}, 
	{"id": "rec2", "name": "Barra"}
];

const mockCategories = [
	{"id": "rec1", "name": "Basic Needs", "subcategories": ["rec3", "rec4", "rec5"]},
	{"id": "rec2", "name": "Legal", "subcategories": ["rec6", "rec7", "rec8"]},
	{"id": "rec3", "name": "Education", "subcategories": ["rec9", "rec10"]}
];

const mockSubcats = [
	{"id": "rec3", "name": "Shelter"},
	{"id": "rec4", "name": "Clothing"},
	{"id": "rec5", "name": "Food Pantry"},
	{"id": "rec6", "name": "Immigration Services"},
	{"id": "rec7", "name": "Housing Services"},
	{"id": "rec8", "name": "General Legal Council"},
	{"id": "rec9", "name": "Enrollment Sevices"},
	{"id": "rec10", "name": "Educational Accomidation"}
];

const mockPlaces = [
	{"id": "rec1", "name": "Glenda's Day Shelter", "categorylist": [{"id": "rec1", "name": "Basic Needs"}], "subcategorylist": [{"id": "rec1", "name": "Atlantis"},{"id": "rec3", "name": "Shelter"},{"id": "rec4", "name": "Clothing"},{"id": "rec5", "name": "Food Pantry"}]},
	{"id": "rec2", "name": "Immigration Advocacy Association", "categorylist": [{"id": "rec2", "name": "Legal"},{"id": "rec3", "name": "Education"}], "subcategorylist": [{"id": "rec2", "name": "Barra"},{"id": "rec6", "name": "Immigration Services"},{"id": "rec10", "name": "Educational Accomidation"}]},
	{"id": "rec3", "name": "Home for All", "categorylist": [{"id": "rec1", "name": "Basic Needs"},{"id": "rec2", "name": "Legal"}], "subcategorylist": [{"id": "rec2", "name": "Barra"},{"id": "rec7", "name": "Housing Services"},{"id": "rec8", "name": "General Legal Council"},{"id": "rec3", "name": "Shelter"}]},
	{"id": "rec4", "name": "JP School District", "categorylist": [{"id": "rec3", "name": "Education"}], "subcategorylist": [{"id": "rec1", "name": "Atlantis"},{"id": "rec9", "name": "Enrollment Sevices"},{"id": "rec10", "name": "Educational Accomidation"}]}
];