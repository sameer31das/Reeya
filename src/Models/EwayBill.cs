using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CargoXpert.WebApi.Models
{
    public class EwayBill
    {
        [JsonProperty("consignmentId")]
        public int ConsignmentId { get; set; }
        [JsonProperty("carrier")]
        public string Carrier { get; set; }
        [JsonProperty("BillUrl")]
        public string BillUrl { get; set; }
    }
}
