# lhb-vue ("Little Help Book Vue")

This is an attempt to put together existing templates for the Little Help Book using the Vue framework.

## Database Management

Airtable holds our data and makes it available with [Airtable API](https://littlehelpbook.com/swagger/index.html) with Airtable-generated documentation [here](https://airtable.com/appj3UWymNh6FgtGR/api/docs#curl/introduction). 

Here are steps to follow when making changes in the base in order to not interrupt data entry or website usage:

* Back up the table
* Make your changes in the base
* Test the changes and check compatibility with existing code

## Maps

Note: If Airtable does not provide a latitude/longitude, or if the lat/long appears as [0, 0], do not place a marker on the map for the associated location.

## Vue

### Components

* Home
* About
* Category
* Subcategory
* Terms

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
