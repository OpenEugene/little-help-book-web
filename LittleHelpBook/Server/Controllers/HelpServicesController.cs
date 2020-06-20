
using System;
using System.Collections.Generic;
using System.Linq;
using AirtableApiClient;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using EugeneFoodScene.Services;
using GoogleMapsComponents.Maps;
using LittleHelpBook.Server.Services;
using LittleHelpBook.Shared.Data;

namespace EugeneFoodScene.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HelpServicesController : ControllerBase
    {
     
        private readonly ILogger<HelpServicesController> logger;
        private readonly AirTableService _airTableService;

        public HelpServicesController(ILogger<HelpServicesController> logger, AirTableService airTableService)
        {
            this.logger = logger;
            _airTableService = airTableService;
        }

        [HttpGet]
        public async Task<IEnumerable<Help>> Get()
        {

            var places = await _airTableService.GetHelpServicesAsync();

            return places.ToArray();

        }

    }
}
