using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EugeneFoodScene.Services;
using GoogleMapsComponents.Maps;
using LittleHelpBook.Shared.Data;
using Microsoft.Extensions.Configuration;

namespace LittleHelpBook.Server.Services
{
    /// <summary>
    /// a bruit force airtable data caching service
    /// </summary>
    public class AirTableService : AirTableBase
    {
        private IEnumerable<Help> _helpServices;  // the higest level populated places list.
    

        public AirTableService(IConfiguration configuration) : base(configuration) {}

        public async Task<IEnumerable<Help>> GetHelpServicesAsync()
        {
            return _helpServices ??= await GetTableAsync<Help>("Help");
        }


    }
}
