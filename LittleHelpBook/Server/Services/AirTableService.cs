using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GoogleMapsComponents.Maps;
using LittleHelpBook.Services;
using LittleHelpBook.Shared.Data;
using Microsoft.Extensions.Configuration;
using Place = LittleHelpBook.Shared.Data.Place;

namespace LittleHelpBook.Server.Services
{
    /// <summary>
    /// a bruit force airtable data caching service
    /// </summary>
    public class AirTableService : AirTableBase
    {
        private IEnumerable<Place> _placesPop;  // the highest level populated places list.
        private IEnumerable<Place> _places;  
        private IEnumerable<Category> _categories;
        private IEnumerable<Subcategory> _subcategories;

        public AirTableService(IConfiguration configuration) : base(configuration) {}

        public async Task<IEnumerable<Place>> GetPlacesAsync()
        {
            return _places ??= await GetTableAsync<Place>("Help Services");
        }

        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            return _categories ??= await GetTableAsync<Category>("Categories");
        }

        public async Task<Category> GetCategoryAsync(string id)
        {
            _categories ??= await GetCategoriesAsync();

            return _categories.FirstOrDefault(c => c.Id == id);
        }

        public async Task<IEnumerable<Subcategory>> GetSubcategoriesAsync()
        {
            return _subcategories ??= await GetTableAsync<Subcategory>("Subcategories");
        }

        public async Task<Subcategory> GetSubcategoryAsync(string id)
        {
            _subcategories ??= await GetSubcategoriesAsync();

            return _subcategories.FirstOrDefault(c => c.Id == id);
        }

        public async Task<IEnumerable<Place>> GetPlacesPopulatedAsync()
        {
            if (_placesPop != null)
            {
                return _placesPop;
            }
            var places = await GetPlacesAsync();

            // populate lookups
            foreach (var place in places)
            {
                if (place.Categories != null)
                {
                    foreach (var id in place.Categories)
                    {
                        place.CategoryList.Add(await GetCategoryAsync(id));
                    }

                    place.Categories = null; // remove from payload after hydration.
                }
                if (place.Subcategories != null)
                {
                    foreach (var id in place.Subcategories)
                    {
                        place.SubcategoryList.Add(await GetSubcategoryAsync(id));
                    }

                    place.Subcategories = null;
                }
            }
            _placesPop = places.ToArray();
            return _placesPop;

        }

    }
}
