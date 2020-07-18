using System;
using System.Collections.Generic;
using System.Linq;
using AirtableApiClient;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using GoogleMapsComponents.Maps;
using LittleHelpBook.Server.Services;
using LittleHelpBook.Shared.Data;
using LittleHelpBook.Server.Controllers;

namespace LittleHelpBook.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SubcategoryController : ControllerBase
    {
        private readonly ILogger<SubcategoryController> logger;
        private readonly AirTableService _airTableService;

        public SubcategoryController(ILogger<SubcategoryController> logger, AirTableService airTableService)
        {
            this.logger = logger;
            _airTableService = airTableService;
        }

        [HttpGet]
        public async Task<IEnumerable<Subcategory>> Get()
        {

            var data = await _airTableService.GetSubcategoriesAsync();

            return data.OrderBy(o => o.Order).ToArray();

        }
    }
}
