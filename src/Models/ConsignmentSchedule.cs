using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Data;
using System.Threading.Tasks;
using CargoXpert.WebApi.Contracts;

namespace CargoXpert.WebApi.Models
{
    public class ConsignmentSchedule : IComposable
    {
        [Required]
        [JsonProperty("pickupDate")]
        [DataParameter(DataType = DbType.DateTime, Direction = ParameterDirection.Input, ParameterName = "@pickupDate", SqlDataType = SqlDbType.DateTime)]
        public DateTime PickupDate { get; set; }

        [JsonProperty("deliveryDate")]
        [DataParameter(DataType = DbType.DateTime, Direction = ParameterDirection.Input, ParameterName = "@deliveryDate", SqlDataType = SqlDbType.DateTime)]
        public DateTime? DeliveryDate { get; set; }

        [JsonProperty("pickupOn")]
        [DataParameter(DataType = DbType.DateTime, Direction = ParameterDirection.Input, ParameterName = "@pickupOn", SqlDataType = SqlDbType.DateTime)]
        public DateTime? PickupOn { get; set; }

        [JsonProperty("deliveredOn")]
        [DataParameter(DataType = DbType.DateTime, Direction = ParameterDirection.Input, ParameterName = "@deliveredOn", SqlDataType = SqlDbType.DateTime)]
        public DateTime? DeliveredOn { get; set; }

        [JsonProperty("mode")]
        [Required]
        [EnumDataType(typeof(ConsignmentMode), ErrorMessage ="The property 'mode' is not valid.")]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@mode", SqlDataType = SqlDbType.VarChar)]
        public ConsignmentMode Mode { get; set; }

        [JsonProperty("ewayBillNumber")]
        [MaxLength(16)]
        [RegularExpression(@"[0-9]{12}$", ErrorMessage = "The value of EWay bill is not valid.")]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@ewayBillNumber", SqlDataType = SqlDbType.VarChar)]
        public string EwaybillNumber { get; set; }

        public void ComposeFrom(IDataReader reader)
        {
            this.DeliveredOn = reader["DeliveredOn"] == null ? null : Convert.ToDateTime(reader["DeliveredOn"]);
            this.DeliveryDate = reader["DeliveryDate"] == null ? null : Convert.ToDateTime(reader["DeliveryDate"]);
            this.Mode = (ConsignmentMode)Enum.Parse(typeof(ConsignmentMode), reader["Mode"].ToString());
            this.PickupDate = Convert.ToDateTime(reader["PickupDate"]);
            this.PickupOn = reader["PickupOn"] == null ? null : Convert.ToDateTime(reader["PickupOn"]);
            this.EwaybillNumber = reader["EwayBillNumber"].ToString();
        }
    }
}
