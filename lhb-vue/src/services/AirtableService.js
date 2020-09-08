import axios from 'axios'

// Can only fetch 100 records from Airtable.
// Only here to experiment with what Vue and Axios can do without dal.js
// Can be eliminated with direct calls to dal.js instead

// Read-only key used here
const https = axios.create({
    baseURL: 'https://api.airtable.com/v0/appj3UWymNh6FgtGR/api/',
    headers: {
        'Authorization': 'Bearer keyMmAL4mVBSORkGc'
    }
});

export default {
    getPlaces() {
        return https.get('help services');
    },
    getCategories() {
        return https.get('categories');
    }
}