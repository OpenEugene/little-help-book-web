using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GoogleMapsComponents.Maps;
using LittleHelpBook.Services;
using LittleHelpBook.Shared.Data;
using Microsoft.Extensions.Configuration;

namespace LittleHelpBook.Server.Services
{
    /// <summary>
    /// a bruit force airtable data caching service
    /// </summary>
    public class AirTableService : AirTableBase
    {
        private IEnumerable<Help> _helpServicesPop;  // the higest level populated places list.
        private IEnumerable<Help> _helpServices;  // the higest level populated places list.
        private IEnumerable<Category> _categories;
        private IEnumerable<Subcategory> _subcategories;

        public AirTableService(IConfiguration configuration) : base(configuration) {}

        public async Task<IEnumerable<Help>> GetHelpServicesAsync()
        {
            return _helpServices ??= await GetTableAsync<Help>("Help Services");
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

        public async Task<IEnumerable<Help>> GetHelpServicesPopulatedAsync()
        {
            if (_helpServicesPop != null)
            {
                return _helpServicesPop;
            }
            var helps = await GetHelpServicesAsync();

            // populate lookups
            foreach (var help in helps)
            {
                if (help.Categories != null)
                {
                    foreach (var id in help.Categories)
                    {
                        help.CategoryList.Add(await GetCategoryAsync(id));
                    }

                    help.Categories = null; // remove from payload after hydration.
                }
                if (help.Subcategories != null)
                {
                    foreach (var id in help.Subcategories)
                    {
                        help.SubcategoryList.Add(await GetSubcategoryAsync(id));
                    }

                    help.Subcategories = null;
                }
            }
            _helpServicesPop = helps.ToArray();
            return _helpServicesPop;

        }

    }
}
