using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using CargoXpert.WebApi.Contracts;
using Newtonsoft.Json;

namespace CargoXpert.WebApi.Models
{
    public class TrackingStatus : IComposable
    {
        [JsonProperty("fromCity")]
        public string FromCity { get; set; }
        [JsonProperty("toCity")]
        public string ToCity { get; set; }
        [JsonProperty("actualPickup")]
        public DateTime ActualPickup { get; set; }
        [JsonProperty("scheduledDelivery")]
        public DateTime? ScheduledDelivery { get; set; }

        [JsonProperty("status")]
        public ConsignmentStatus Status { get; set; } = new ConsignmentStatus();

        public void ComposeFrom(IDataReader reader)
        {
            Status.ComposeFrom(reader);
            this.FromCity = reader["FromCity"].ToString();
            this.ToCity = reader["ToCity"].ToString();
            this.ActualPickup = Convert.ToDateTime(reader["ActualPickup"]);
            ScheduledDelivery = reader["ScheduledDelivery"] != null ? Convert.ToDateTime(reader["ScheduledDelivery"]) : null;
        }
    }
}
