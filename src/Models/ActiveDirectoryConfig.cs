using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CargoXpert.WebApi.Models
{
    public class ActiveDirectoryConfig
    {
        public string AadInstance { get; set; }
        public string ClientId { get; set; }
        public string Tenant { get; set; }
        public string AppKey { get; set; }
        public string GraphEndpoint { get; set; }
    }
}
