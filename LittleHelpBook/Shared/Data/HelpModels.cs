using System.Collections;
using System.Collections.Generic;
using System.Linq;
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
    public class Help : IAirtable
    {
        public string Id { get; set; }
        public string Name { get; set; }
        [JsonProperty("Phone Number")]
        public string Phone { get; set; }
        [JsonProperty("Physical Address")]
        public string Address { get; set; }

        [JsonProperty("Category")] public IEnumerable<string> Categories { get; set; }
        public string CategoryName => CategoryList?.FirstOrDefault()?.Name;
        public List<Category> CategoryList { get; set; } = new List<Category>();
    }

    public class Category : IAirtable
    {
        public string Id { get; set; }
        public string Name { get; set; }
       
    }

}
