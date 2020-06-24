using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Threading.Tasks;
using GoogleMapsComponents.Maps;
using LittleHelpBook.Shared.Data;
using Radzen;

namespace LittleHelpBook.Client.Services
{
    public class ClientCache : BaseCache
    {
        //places data
        private IEnumerable<Help> _allHelpServices;
        private IEnumerable<Help> _foundHelpServices;

        //lookups
        private IEnumerable<Category> _categories;
        private IEnumerable<Subcategory> _subcategories;

        // filters
        private string[] _selectedCategories;
        private string[] _selectedSubcategories;
        private string _searchWords;

        private NotificationService _notificationService;
 

        public ClientCache(HttpClient http, NotificationService notificationService ) : base(http)
        {
            _notificationService = notificationService;
        }

        public IEnumerable<Help> AllHelpServices
        {
            get => _allHelpServices;
            set => SetField(ref _allHelpServices, value);
        }

        public IEnumerable<Help> FoundHelpServices
        {
            get => _foundHelpServices;
            set => SetField(ref _foundHelpServices, value);
        }

        public IEnumerable<Category> Categories
        {
            get => _categories;
            set => SetField(ref _categories, value);
        }

        public IEnumerable<Subcategory> Subcategories
        {
            get => _subcategories;
            set => SetField(ref _subcategories, value);
        }

        public async Task<IEnumerable<Help>> GetAllHelpServices()
        {
            return _allHelpServices ??= await Http.GetFromJsonAsync<IEnumerable<Help>>("Help");
        }

        public async Task<IEnumerable<Help>> GetFoundHelpServices()
        {
            return _foundHelpServices ??= await GetAllHelpServices();
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            return _categories ??= await Http.GetFromJsonAsync<IEnumerable<Category>>("Category");
        }

        public async Task<IEnumerable<Subcategory>> GetSubcategories()
        {
            return _subcategories ??= await Http.GetFromJsonAsync<IEnumerable<Subcategory>>("Subcategory");
        }

        public async Task Clear()
        {
            _categories = null;
            _subcategories = null;
            _searchWords = null;
        }
        public async Task Reset()
        {
            await Clear();
            await GetCategories();
            await GetSubcategories();
        }

        public async Task<Help> GetHelp(string Id)
        {
            await GetAllHelpServices();
            var place = AllHelpServices.SingleOrDefault(p => p.Id == Id); ;
            return place;
        }

        public async Task Search(string words)
        {
            _searchWords = words;
            await ApplyFilters();
        }

        public async Task FilterCategory(string[] selectedCategories)
        {
            _selectedCategories = selectedCategories;
            await ApplyFilters();
        }

        public async Task FilterSubcategory(string[] selectedSubcategories)
        {
            _selectedSubcategories = selectedSubcategories;
            await ApplyFilters();
        }

        private async Task ApplyFilters()
        {
            await GetAllHelpServices();

            var query = from p in AllHelpServices select p;


            if (_selectedCategories?.Length > 0)
            {
                query = from p in query
                    where p.CategoryList.Any(c => _selectedCategories.Contains(c.Id))
                    select p;
            }

            if (_selectedSubcategories?.Length > 0)
            {
                query = from p in query
                        where p.SubcategoryList.Any(c => _selectedSubcategories.Contains(c.Id))
                        select p;
            }

            if (_searchWords != null)
            {
                query = query.Where(p => p.Name.Contains(_searchWords, StringComparison.OrdinalIgnoreCase)).ToList();
            }

            var list = query.ToList();  // deferred execution
            if (list.Count == 0)
            {
                var msg = new NotificationMessage()
                {
                    Severity = NotificationSeverity.Info, 
                    Summary = "No matches", 
                    Detail = "Nothing found with those filters, showing everything.",
                    Duration = 4000
                };
                _notificationService.Notify(msg);
                FoundHelpServices = AllHelpServices;
            }
            else
            {
                var msg = new NotificationMessage()
                {
                    Severity = NotificationSeverity.Info,
                    Summary = "Matches!",
                    Detail = $"Found {list.Count} matching places.",
                    Duration = 4000
                };
                _notificationService.Notify(msg);
                FoundHelpServices = list;
            }

            OnCacheUpdated();
        }

    }
}
