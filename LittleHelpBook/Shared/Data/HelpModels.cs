using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using Newtonsoft.Json;

namespace LittleHelpBook.Shared.Data
{

    // Places, Categories, Cuisines, Delivery Services, Order Delivery Links

    /// <summary>
    /// interface for hoisting Airtable IDs into data objests
    /// </summary>
    public interface IAirtable
    {
        public string Id { get; set; }
    }


    /// <summary>
    /// Name, Category, Phone, URL, Address, Notes, Order Delivery Links, Menu,
    /// </summary>
    public class Place : IAirtable
    {
        public string Id { get; set; }
        public string Name { get; set; }
        [JsonProperty("Name-ES")]
        public string NameSpanish { get; set; }
        [JsonProperty("Phone Number")]
        public string Phone { get; set; }
        [JsonProperty("Physical Address")]
        public string Address { get; set; }

        [JsonProperty("Category")] public IEnumerable<string> Categories { get; set; }
        public string CategoryName => CategoryList?.FirstOrDefault()?.Name;
        public List<Category> CategoryList { get; set; } = new List<Category>();
        [JsonProperty("Subcategory")] public IEnumerable<string> Subcategories { get; set; }
        public string SubcategoryName => SubcategoryList?.FirstOrDefault()?.Name;
        public List<Subcategory> SubcategoryList { get; set; } = new List<Subcategory>();

        public double Latitude { get; set; }
        public double Longitude { get; set; }
        [JsonProperty("Web Address")]
        public string URL { get; set; }
        [JsonProperty("Email Address")]
        public string Email { get; set; }
        [JsonProperty("Hours of Operation")]
        public string Hours { get; set; }

        public string Description { get; set; }
    }

    public class Category : IAirtable
    {
        public string Id { get; set; }
        public string Name { get; set; }
        [JsonProperty("Name-ES")]
        public string NameSpanish { get; set; }
        public int Order { get; set; }

        [JsonProperty("Subcategories")]
        public List<string> Subcategories { get; set; } = new List<string>();
        public List<Subcategory> SubcategoryList { get; set; } = new List<Subcategory>();
       
    }

    public class Subcategory : IAirtable
    {
        public string Id { get; set; }
        public string Name { get; set; }
        [JsonProperty("Name-ES")]
        public string NameSpanish { get; set; }

    }

    public class Alert : IAirtable
    {
        public string Id { get; set; }
        public string Name { get; set; }
       
        public string Notes { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }

    public class Info : IAirtable
    {
        public string Id { get; set; }
        public string Name { get; set; }
       
        public string Content { get; set; }

        [JsonProperty("Category")] public IEnumerable<string> Categories { get; set; }
        public string CategoryName => CategoryList?.FirstOrDefault()?.Name;
        public List<Category> CategoryList { get; set; } = new List<Category>();

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }


}
