using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using CargoXpert.Entity.Common;
using System.Data;

namespace CargoXpert.WebApi.Models
{
    public class ConsignmentPayment : IComposable
    {
        [JsonProperty("paymentMode")]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@paymentMode", SqlDataType = SqlDbType.VarChar)]
        public PaymentModes PaymentMode { get; set; }

        [JsonProperty("billingParty")]
        [MaxLength(256)]
        [RegularExpression(@"^[a-zA-Z ]+$", ErrorMessage = "The property 'billingParty' is not valid.")]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@billingParty", SqlDataType = SqlDbType.VarChar)]
        public string BillingParty { get; set; }

        public void ComposeFrom(IDataReader reader)
        {
            this.BillingParty = reader["BillingParty"]?.ToString();
            this.PaymentMode = (PaymentModes)Enum.Parse(typeof(PaymentModes), reader["PaymentMode"].ToString());
        }
    }
}
