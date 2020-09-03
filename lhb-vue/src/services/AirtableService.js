import axios from 'axios'

const https = axios.create({
    baseURL: "https://api.airtable.com/v0/appj3UWymNh6FgtGR",
    headers: {
        'Authorization': ''
    }
})