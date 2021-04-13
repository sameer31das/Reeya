using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using CargoXpert.WebApi.Contracts;

namespace CargoXpert.WebApi.Models
{
    public class ConsignmentStatus : IComposable
    {
        [Required]
        [JsonProperty("latitude")]
        [DataParameter(DataType = DbType.Double, Direction = ParameterDirection.Input, ParameterName = "@latitude", SqlDataType = SqlDbType.Float)]
        public double Latitude { get; set; }

        [Required]
        [JsonProperty("longitude")]
        [DataParameter(DataType = DbType.Double, Direction = ParameterDirection.Input, ParameterName = "@longitude", SqlDataType = SqlDbType.Float)]
        public double Longitude { get; set; }

        [JsonProperty("status")]
        [Required]
        [EnumDataType(typeof(StatusEnum), ErrorMessage ="The proeprty 'status' is not valid.")]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@status", SqlDataType = SqlDbType.VarChar)]
        public StatusEnum Status { get; set; } = StatusEnum.Invalid;

        [JsonProperty("reason")]
        [MaxLength(64)]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@reason", SqlDataType = SqlDbType.VarChar)]
        [RegularExpression(@"^[a-zA-Z0-9 ]+$", ErrorMessage ="The property 'reason' is not valid.")]
        public string Reason { get; set; }

        [JsonProperty("ewayBillUrl")]
        [MaxLength(40)]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName ="@ewayBillUrl", SqlDataType = SqlDbType.VarChar)]
        public string EwayBillUrl { get; set; }

        [JsonProperty("carrier")]
        [MaxLength(32, ErrorMessage = "The length of the property 'carrier' is more than expected.")]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@carrier", SqlDataType = SqlDbType.VarChar)]
        [RegularExpression(@"^[#.0-9a-zA-Z\s,-]+$", ErrorMessage = "The property 'carrier' is not valid.")]
        public string Carrier { get; set; }

        [JsonProperty("updatedOn")]
        [DataType(DataType.DateTime)]
        public DateTime UpdatedOn { get; set; }

        public void ComposeFrom(IDataReader reader)
        {
            this.Carrier = reader["Carrier"].ToString();
            this.EwayBillUrl = reader["EwayBillUrl"].ToString();
            this.Latitude = Convert.ToDouble(reader["Latitude"]);
            this.Longitude = Convert.ToDouble(reader["Longitude"]);
            this.Reason = reader["Reason"].ToString();
            this.Status = (StatusEnum)Enum.Parse(typeof(StatusEnum), reader["Status"].ToString());
            this.UpdatedOn = Convert.ToDateTime(reader["ModifiedOn"]);
        }
    }
}
