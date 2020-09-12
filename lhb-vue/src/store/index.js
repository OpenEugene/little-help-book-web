import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    places: [],
    categories: [],
    cities: [],
    activePlace: {
      id: '',
      name: '',
      nameSpanish: '',
      phone: '',
      address: '',
      categories: [],
      subcategories: [],
      latitude: 0,
      longitude: 0,
      url: '',
      email: '',
      hours: '',
      description: ''
    },
    activeCity: '',
    activeCategory: '',
    activeSubcategory: '',
    inSpanish: false
  },
  mutations: {
    SET_ACTIVE_PLACE(state, data) {
      state.activePlace = data;
    },
    SET_PLACES(state, data) {
      state.places = data;
    },
    SET_CATEGORIES(state, data) {
      state.categories = data;
    },
    SET_CITIES(state, data) {
      state.cities = data;
    },
    SET_ACTIVE_CITY(state, data) {
      state.activeCity = data;
    },
    TOGGLE_LANGUAGE(state, data) {
      state.inSpanish = data;
    }
  },
  strict: true
})
