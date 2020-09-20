
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

namespace LittleHelpBook.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AlertController : ControllerBase
    {
     
        private readonly ILogger<PlaceController> logger;
        private readonly AirTableService _airTableService;

        public AlertController(ILogger<PlaceController> logger, AirTableService airTableService)
        {
            this.logger = logger;
            _airTableService = airTableService;
        }

        [HttpGet]
        public async Task<IEnumerable<Alert>> Get()
        {

            var data = await _airTableService.GetAlertsAsync();
            var alerts = data.Where(a => DateTime.Now > a.StartDate && DateTime.Now < a.EndDate);

            return alerts.ToArray();

        }

    }
}
