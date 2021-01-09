# Little Help Book

Welcome! 

The volunteers of Open Eugene are glad you're here, we're all volunteers. This is a Code for America brigade project for a social service provider in Eugene, Oregon. White Bird Clinic has received attention lately for its ability to send social service workers to 911 distress calls, rather than police. This saves money, and it's better for people experiencing crisis. The clinic has been around a while and they have produced a resource directory that sits on the desk of social service workers throughout the city. It's called the Little Help Book — it's big! It's a big ol' three ring binder full of 8.5 x 11" pages. And they produce a PDF version that can be hand stapled and distributed. It's one of the most detailed and comprehensive guides of human and social services in the Eugene and Springfield area and a little bit beyond that. And this is expensive to produce and to update. This is where we can help. 

## Contributing

If any Issue interests you and our description alone doesn't contain all you'd need to get started, please contact us. Either comment on the Issue or join our co-working event that happens at noon every Tuesday and Thursday. We're using Discord:

Find us in the Creative Corner at the Progress Bar & Grill http://progressbarandgrill.com, Discord can be accessed in the browser or by downloading the app. The app is needed if you want to screen share. To find the Progress Bar & Grill, after you pop through that link here and click on the Discord invite link: look to the left sidebar and you'll see the circle logo with a neon sign saying Bar, click that. A screen opens with another left sidebar and that has a roll of all the channels: double-click on the Creative Corner. See you soon! 

For asynchronous communication, we're in the #proj-little-help-book channel at [eugslack.com](https://eugenetech.slack.com/).

#### Technologies Used

HTML, CSS, JavaScript, Python (and the "requests" module) <br>
Airtable - an easy-to-use relational database <br>
Human Services Data Specification - a format for writing and publishing data as CSVs and a JSON datapackage

##### JavaScript Libraries
Airtable JS <br>
Handlebars - a templating language <br>
Leaflet - JavaScript map software <br>
Carto - the tile set <br>
jQuery

## Roadmap

Our journey began with an Airtable database of human services and a public website. 

### Database 

All the information about human and social service providers in Lane County that appears in the most recent print version of the Little Help Book is in Airtable. In winter of 2020, volunteers working White Bird Clinic have called service providers to verify all the information about available services: https://airtable.com/tblfr7CYabx9CwzO3/viwt6rHXp8T7o8DeJ

### Website

Our progressive web app is a public website that interacts with the database. The website has two unique users: social service providers and people in need. You can see the work in progress hosted at Netlify, this connects to the database and allow you to see the pages without downloading the repo and, in a desktop browser, the responsive transition to tablet and mobile screen sizes: https://little-help-book.netlify.app/table-of-contents-style-homepage/index.html

### Deployment

With the help and guidance of MVP Studio (https://mvpstudio.org/), we're preparing to serve our website to the people of Lane County.

### Qualitative Research

Also known as User Research, this work will span a number of meetings online, with different people, enough to gather insights into how the site can be improved. If you’re a UX researcher or interested in this work, please contact us.

### Backend

We’re thinking to continue to use Airtable for data entry and pull that into a MariaDB to improve the performance of the site—and to practice and learn backend technology.

### Single Page Application

After the backend project and many months have passed, ideally we’ve gained significant insights into how to improve the public website—through qualitative research and the evolution of our team and any additional knowledge contributed by new members. Rather than simply copying the HTML/CSS/JavaScript site, this project is the opportunity to roll in the insights gained. Looking at either Vue or React, and with the number of jobs available for React developers, leaning that direction. https://github.com/OpenEugene/little_help_book_react

### Interoperability 

Lane County social service providers need a strong public information network. In building a network, the regional social service providers are looking at how to make multiple systems effective and functional. This work is more organizational than technical, it involves coordination among people at various organizations. The goal: a **universal data source**, so that providers **in a multi-system network** can update their information in one place and it's updated everywhere. Please see the Open Referral Initiative: Executive Summary: https://docs.google.com/document/d/1xjXYN0zzUVWK3GdINP3erO-Jm0LUz75962SyRF0ggIA/edit

Code for America fellows in 2013 developed an application programming interface for a database that had previously only been used to print a resource directory. A member of the team, Greg Bloom, published Towards a Community Data Commons [https://beyondtransparency.org/chapters/part-5/towards-a-community-data-commons/]. Then in 2014, with the co-sponsorship of Code for America, Bloom initiated Open Referral [https://openreferral.org/]. 

The Human Services Data Specification is a format for writing and publishing information about social services that can be read and used by other providers. In 2017, Open Referral developed protocols for real-time human resource data exchange. Both the Human Services Data Specification and the API have been formally recommended by the Alliance of Information and Referral Systems for resource directory data exchange. A regional council for referral networks in Lane County with different working groups may begin convening, and one of those groups could deal with technology and interoperability of platforms, both technical and legal issues. 

## Database Management

Airtable holds our data and makes it available with [Airtable API](https://littlehelpbook.com/swagger/index.html) with Airtable-generated documentation [here](https://airtable.com/appj3UWymNh6FgtGR/api/docs#curl/introduction). 

Here are steps to follow when making changes in the base in order to not interrupt data entry or website usage:

* Back up the table by [taking a snapshot](https://support.airtable.com/hc/en-us/articles/202584799-Taking-and-Restoring-Base-Snapshots) in case changes need to be rolled back/undone
* Make your changes in the base
* Test the changes and check compatibility with existing code

### Data Access Layer (DAL)

Todo: Document DAL

### Compiled Data

A static asset. This compiles data for including in the project when deployed. It's a build-time static asset. It's like JAM-Stack that way.
There are two options for accessing the Airtable data: with and without the static data. 

Without the static asset, the data is accessed from Airtable everytime you go to a page. The advantage is that you get the most up-to-date version of the data. The disadvantage is that it takes longer for the page to load. 

With the static asset, you get the version of the data from the last time the compiled data was created. Pro: faster load. Con: out-of-date data. 

To switch between options, edit the `useCache` variable at the top of `sripts/dal.js` (`true` uses cache, `false` doesn't). 

To be able to update the static asset, first make sure you can run Python:
- Make sure you have Python installed.
- You'll also need pip. To check if you have pip and for how to install: https://pip.pypa.io/en/stable/installing/ 
- Using pip, add the "requests" module: (`pip install requests`) 

Then each time you want to update the data, run the `sripts/getTable.py` Python script: 
- Open a terminal. 
- Change directory (`cd`) to the `scripts` folder. 
- Run the command `./get_table.py`. 

**Technical details:** The compiled data is stored in a javascript file called `cachedInlineTables.js`. This contains one JSON variable for each table (Help Services, Cities, and so on). The `getTable.py` script uses http requests to pull the tables from Airtable, and then creates the `cachedInlineTables.js` file. 

**The static data and the repo:** 
- Let's keep `useCache` set to `true`. In other words, if you change it to `false` while doing work (probably because you want to get immediate feedback about changes to Airtable) then set it back to `true` before merging your branch into develop. 
- Note that  `cachedInlineTables.js` is a file that is part of the repo. If you run `getTable.py` to update it, then, assuming you are happy with its update, `git add` it to your repo, and push it to the repo. Ideally, an update to the static data (i.e. `cachedInlineTables.js`) should be done as a separate commit from other work. 

### Data Verification

**Note on Longitude/Latitude pulled from Airtable**

For locations outside of Lane County and the crisis lines without a physical address, longitude and latitude both default to [0, 0], and no markers are displayed on the map.

Upon entering a new provider's street address, if you don't have access to ESRI software for geocoding, you can find the latitude and longitude by using a free service online, a process called "forward geocoding." Place the street address in the required parameters "Search query" field, and the map responds with a pin. You can source the latitude and longitude by clicking on the pin and copying them from the card that pops up: https://locationiq.com/sandbox/geocoding/forward
