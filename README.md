# Little Help Book

Welcome! 

The volunteers of Open Eugene are glad you're here, we're all volunteers. This is a Code for America brigade project for a social service provider in Eugene, Oregon. White Bird Clinic has received attention lately for its ability to send social service workers to 911 distress calls, rather than police. This saves money, and it's better for people experiencing crisis. The clinic has been around a while and they have produced a resource directory that sits on the desk of social service workers throughout the city. It's called the Little Help Book — it's big! It's a big ol' three ring binder full of 8.5 x 11" pages. It's one of the most detailed and comprehensive guides of human and social services in the Eugene and Springfield area and a little bit beyond that. And this is expensive to produce and to update. This is where we can help. 

With an online version we can make it easier for providers to update and customize the information about their resources. They can keep their stuff updated, in a flexible format that allows them to include all they think is important. We'll create a basic card of their info that's currently in the Little Help Book: name, address, phone, hours, and description. We'll include a small map there. And we can include a button for the provider to update their info. The expanded information fields will follow the Referral Platform example that White Bird provided (see the Docs section of our Notion for this project [https://www.notion.so/Little-Help-Book-Readme-9fde68230ea443128fc15f5f863a0eb6]), and then it'll include one extra tab to allow them the flexibility to include more pages if they like. This will be responsive design, allowing the site to also be accessed by intended recipients of these services on their own devices—if they have one. The website has two unique users: social service providers and people in need. 

White Bird created a short video to introduce their work and how we can help: https://whitebirdclinic.org/white-birds-help-book-has-been-hacked/ 

When this guide is accessible online, social service providers in other cities can more easily access and add to it. We can create the features that Alan talks about in the video, making it possible for people to update it, expanding the information about human and social service agencies locally and even beyond. With your help we can bring this resource to people who've never had access to this information. White Bird provided us with a list of their primary project goals:

- **Accessibility:** Having a mobile-phone friendly app/website based on the local, in-depth information of the HELP book will facilitate access to critical human services information.
- **Update-ability:** Information changes frequently and we want to make it easy for staff to make edits, also see the date that an entry was last updated. Would also like to have the ability to display or hide agency information. For example, some places are closed now but we will want them listed again after they re-open.
- **Easy to find information:** We want a simple search engine to find information by categories and subcategories.
- **Maps:** A map of the address embedded in the agency page when you click on it would be great.
- **Save to CSV:** Paper copies are still essential for many clients. We would like to have the ability to download the site content so we can general a printable copy to put out twice annually.

From a survey response (also in the Docs), it's clear that the site will be mucho mejor with a Spanish language version. Google Translate of the website and some of our team's basic understanding of the language can do an okay job—but to really create a good translation, we will work with native Spanish speakers. This is kinda circular, because if you clicked through the Notion, you saw that's also a README, a README inside of README but wait! Go back to that and read the project roles, and at the bottom there you'll see a link to the PDF of the actual Little Help Book. That will really give you an idea of the information we're putting online, the Table of Contents, the information architecture is all there. Let's make it easy to access and use online. Thanks for your help! 

Lane County social service providers need a strong community referral network. In building a network, the regional social service providers are looking at how to make multiple systems effective and functional. 

The goal: a **universal data source**, so that providers **in a multi-system network** can update their information in one place and it's updated everywhere. Please see the Open Referral Initiative: Executive Summary: https://docs.google.com/document/d/1xjXYN0zzUVWK3GdINP3erO-Jm0LUz75962SyRF0ggIA/edit

A regional council with different working groups may begin convening, and one of those groups could deal with technology and interoperability of platforms, both technical and legal issues.

## Database Management

Airtable holds our data and makes it available with [Airtable API](https://littlehelpbook.com/swagger/index.html) with Airtable-generated documentation [here](https://airtable.com/appj3UWymNh6FgtGR/api/docs#curl/introduction). 

Here are steps to follow when making changes in the base in order to not interrupt data entry or website usage:

* Back up the table
* Make your changes in the base
* Test the changes and check compatibility with existing code

