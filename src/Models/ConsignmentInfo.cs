using CargoXpert.WebApi.Contracts;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace CargoXpert.WebApi.Models
{
    public class ConsignmentInfo : IComposable
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("trackingId")]
        public string TrackingId { get; set; }
        [JsonProperty("pickupTime")]
        public DateTime PickupDate { get; set; }
        [JsonProperty("deliveryTime")]
        public DateTime DeliveryDate { get; set; }
        //[JsonProperty("customerName")]
        //public string CustomerName { get; set; }
        [JsonProperty("fromCity")]
        public string FromCity { get; set; }
        [JsonProperty("toCity")]
        public string ToCity { get; set; }
        [JsonProperty("status")]
        public string Status { get; set; }
        [JsonProperty("photoUrl")]
        public string PhotoUrl { get; set; }
        [JsonProperty("ewayBillUrl")]
        public string EwayBillUrl { get; set; }
        [JsonProperty("latitude")]
        public double Latitude { get; set; }
        [JsonProperty("longitude")]
        public double Longitude { get; set; }

        public void ComposeFrom(IDataReader reader)
        {
            this.Id = Convert.ToInt32(reader["Id"]);
            this.DeliveryDate = Convert.ToDateTime(reader["DeliveryDate"]);
            this.EwayBillUrl = reader["EwayBillUrl"].ToString();
            this.FromCity = reader["FromCity"].ToString();
            this.PhotoUrl = reader["PhotoUrl"].ToString();
            this.PickupDate = Convert.ToDateTime(reader["PickupDate"]);
            this.Status = reader["Status"].ToString(); //((StatusEnum)Enum.Parse(typeof(StatusEnum), reader["Status"].ToString())).ToString();
            this.ToCity = reader["ToCity"].ToString();
            this.TrackingId = reader["TrackingId"].ToString();
            this.Latitude = Convert.ToDouble(reader["Latitude"]);
            this.Longitude = Convert.ToDouble(reader["Longitude"]);
        }
    }
}
