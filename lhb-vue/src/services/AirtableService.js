import axios from 'axios'

// Read-only key
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