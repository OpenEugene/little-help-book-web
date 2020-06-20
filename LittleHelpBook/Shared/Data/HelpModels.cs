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
        [JsonProperty("Service Name")]
        public string Name { get; set; }
        [JsonProperty("Category")]
        public string Category { get; set; }
       
    }

  
    
}
