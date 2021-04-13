using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace CargoXpert.WebApi.Models
{
    public class RescheduleRequest
    {
        [JsonProperty("status")]
        [Required]
        public ConsignmentStatus Status { get; set; }
        [JsonProperty("deliveryDate")]
        [DataParameter(DataType = DbType.DateTime, Direction = ParameterDirection.Input, ParameterName ="@rescheduledDate", SqlDataType = SqlDbType.DateTime)]
        [Required]
        public DateTime DeliveryDate { get; set; }
    }
}
