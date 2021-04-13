using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Data;

namespace CargoXpert.WebApi.Models
{
    public class InquiryForm : EntityBase
    {
        [JsonProperty("fullName")]
        [MaxLength(64)]
        [RegularExpression(@"^[a-zA-Z ]+$", ErrorMessage ="Invalid input for name.")]
        [Required]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@fullName", SqlDataType = SqlDbType.VarChar)]
        public string FullName { get; set; }

        [JsonProperty("contactNumber")]
        [Phone]
        [MaxLength(11, ErrorMessage ="The length of contact number is not allowed beyond 11.")]
        [DataType(DataType.PhoneNumber)]
        [RegularExpression(@"^[0-9]+$", ErrorMessage = "The property 'contactNumber' is not valid.")]
        [Required]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@contactNumber", SqlDataType = SqlDbType.VarChar)]
        public string ContactNumber { get; set; }

        [JsonProperty("inquiryType")]
        [Required]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@inquiryType", SqlDataType = SqlDbType.VarChar)]
        public InquiryType InquiryType { get; set; }

        [JsonProperty("emailAddress")]
        [EmailAddress]
        [MaxLength(128, ErrorMessage = "Email address cannot have length more than 128.")]
        [DataType(DataType.EmailAddress)]
        [Required]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@emailAddress", SqlDataType = SqlDbType.VarChar)]
        public string EmailAddress { get; set; }

        [JsonProperty("origin")]
        public Location Origin { get; set; }

        [JsonProperty("isWhatsAppEnabled")]
        [Required]
        [DataParameter(DataType = DbType.Boolean, SqlDataType = SqlDbType.Bit, Direction = ParameterDirection.Input, ParameterName = "@isWhatsAppEnabled")]
        public bool IsWhatsAppEnabled { get; set; }

        public override IEnumerable<IDataParameter> GetSqlParameters()
        {
            List<IDataParameter> sqlparameters = new List<IDataParameter>();
            sqlparameters.AddRange(this.ComposeParameters());
            sqlparameters.AddRange(this.Origin.GetSqlParameters());
            return sqlparameters;
        }
    }
}
