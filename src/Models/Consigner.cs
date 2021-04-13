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
    public class Consigner : IComposable
    {
        [Required]
        [MaxLength(64)]
        [JsonProperty("consignerName")]
        [DataParameter(SqlDataType = SqlDbType.VarChar, Direction = ParameterDirection.Input, ParameterName = "@consignerName", DataType = DbType.String )]
        [RegularExpression(@"^[a-zA-Z ]+$", ErrorMessage = "The property 'consignerName' should contain only alphabetic characters.")]
        public string Name { get; set; }

        [MaxLength(256)]
        [Required]
        [JsonProperty("fromAddress")]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@fromAddress", SqlDataType = SqlDbType.VarChar)]
        [RegularExpression(@"^[#.0-9a-zA-Z\s,-]+$", ErrorMessage = "The property 'fromAddress' is not valid.")]
        public string Address { get; set; }

        [MaxLength(6)]
        [Required]
        [JsonProperty("fromPincode")]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@fromPincode", SqlDataType = SqlDbType.VarChar)]
        [RegularExpression(@"^[1-9]{1}[0-9]{5}$", ErrorMessage = "The property 'fromPincode' is not valid.")]
        public string Pincode { get; set; }

        [MaxLength(64)]
        [Required]
        [JsonProperty("fromCity")]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@fromCity", SqlDataType = SqlDbType.VarChar)]
        [RegularExpression(@"[a-zA-Z ]+$", ErrorMessage = "The property 'fromCity' is not valid.")]
        public string City { get; set; }

        [MaxLength(128)]
        [JsonProperty("consignerEmail")]
        [EmailAddress]
        [Required]
        [DataType(DataType.EmailAddress)]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@consignerEmail", SqlDataType = SqlDbType.VarChar)]
        public string Email { get; set; }

        [MaxLength(16)]
        [JsonProperty("consignerPhone")]
        [Phone]
        [Required]
        [DataType(DataType.PhoneNumber)]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@consignerPhone", SqlDataType = SqlDbType.VarChar)]
        public string Phone { get; set; }

        public void ComposeFrom(IDataReader reader)
        {
            this.Address = reader["ToAddress"].ToString();
            this.City = reader["ToCity"].ToString();
            this.Email = reader["ConsignerEmail"].ToString();
            this.Name = reader["ConsignerName"].ToString();
            this.Phone = reader["ConsignerPhone"].ToString();
            this.Pincode = reader["ToPinCode"].ToString();
        }
    }
}
