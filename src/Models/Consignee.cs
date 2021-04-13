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
    public class Consignee : IComposable
    {
        [Required]
        [MaxLength(64)]
        [JsonProperty("consigneeName")]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@consigneeName", SqlDataType = SqlDbType.VarChar)]
        [RegularExpression(@"^[a-zA-Z ]+$", ErrorMessage = "The property 'consigneeName' is not valid.")]
        public string Name { get; set; }

        [MaxLength(256)]
        [Required]
        [JsonProperty("toAddress")]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@toAddress", SqlDataType = SqlDbType.VarChar)]
        [RegularExpression(@"^[#.0-9a-zA-Z\s,-]+$", ErrorMessage = "The property 'fromAddress' is not valid.")]
        public string Address { get; set; }

        [MaxLength(6)]
        [Required]
        [JsonProperty("toPincode")]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@toPincode", SqlDataType = SqlDbType.VarChar)]
        [RegularExpression(@"^[1-9]{1}[0-9]{5}$", ErrorMessage = "The property 'fromPincode' is not valid.")]
        public string Pincode { get; set; }

        [MaxLength(64)]
        [Required]
        [JsonProperty("toCity")]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@toCity", SqlDataType = SqlDbType.VarChar)]
        [RegularExpression(@"[a-zA-Z ]+$", ErrorMessage = "The property 'fromCity' is not valid.")]
        public string City { get; set; }

        [MaxLength(128)]
        [JsonProperty("consigneeEmail")]
        [EmailAddress]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@consigneeEmail", SqlDataType = SqlDbType.VarChar)]
        [DataType(DataType.EmailAddress)]
        [Required]
        public string Email { get; set; }

        [MaxLength(16)]
        [JsonProperty("consigneePhone")]
        [Phone]
        [Required]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@consigneePhone", SqlDataType = SqlDbType.VarChar)]
        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }

        public void ComposeFrom(IDataReader reader)
        {
            this.Address = reader["FromAddress"].ToString();
            this.City = reader["FromCity"].ToString();
            this.Email = reader["ConsigneeEmail"].ToString();
            this.Name = reader["ConsigneeName"].ToString();
            this.Phone = reader["ConsigneePhone"].ToString();
            this.Pincode = reader["FromPinCode"].ToString();
        }
    }
}
