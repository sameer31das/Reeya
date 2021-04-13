using CargoXpert.Entity.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace CargoXpert.WebApi.Models
{
    public class ConsignmentInvoice : IComposable
    {
        [JsonProperty("invoiceNumber")]
        [MaxLength(32, ErrorMessage ="The length of the attribute 'invoiceNumber' cannot be more than 32")]
        public string InvoiceNumber { get; set; }

        [JsonProperty("invoiceDate")]
        public DateTime InvoiceDate { get; set; }

        [JsonProperty("invoiceValue")]
        public int InvoiceValue { get; set; }

        [JsonProperty("quantity")]
        public int Quantity { get; set; }

        [JsonProperty("invoiceUrl")]
        [MaxLength(40)]
        public string InvoiceUrl { get; set; }

        [JsonProperty("itemDescription")]
        [MaxLength(64, ErrorMessage = "The attribute 'itemDescription should not be more than 64.")]
        [RegularExpression(@"^[A-Za-z0-9-\. ]+$", ErrorMessage = "The attribute 'itemDescription' contains invalid characters.")]
        public string ItemDescription { get; set; }

        public void ComposeFrom(IDataReader reader)
        {
            this.InvoiceDate = Convert.ToDateTime(reader["InvoiceDate"]);
            this.InvoiceNumber = reader["InvoiceNumber"].ToString();
            this.InvoiceUrl = reader["InvoiceUrl"].ToString();
            this.InvoiceValue = Convert.ToInt32(reader["InvoiceValue"]);
            this.ItemDescription = reader["ItemDescription"].ToString();
            this.Quantity = Convert.ToInt32(reader["Quantity"]);
        }
    }
}
