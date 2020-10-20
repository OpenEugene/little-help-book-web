
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using AirtableApiClient;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using GoogleMapsComponents.Maps;
using LittleHelpBook.Server.Services;
using LittleHelpBook.Shared.Data;
using Place = LittleHelpBook.Shared.Data.Place;

namespace LittleHelpBook.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlaceController : ControllerBase
    {
     
        private readonly ILogger<PlaceController> logger;
        private readonly AirTableService _airTableService;

        public PlaceController(ILogger<PlaceController> logger, AirTableService airTableService)
        {
            this.logger = logger;
            _airTableService = airTableService;
        }

        [HttpPost("Clear")]
        public async Task<IActionResult> Clear(string data)
        { 
            await _airTableService.Clear();
            return  Ok();
        }


        [HttpGet]
        public async Task<IEnumerable<Place>> Get()
        {

            var data = await _airTableService.GetPlacesPopulatedAsync();

            return data.ToArray();

        }

    }
}
