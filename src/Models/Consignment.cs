using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Data;
using CargoXpert.WebApi.Models;
using CargoXpert.WebApi.Contracts;
using System.Data.SqlClient;

namespace CargoXpert.WebApi.Models
{
    public class Consignment : EntityBase, IComposable
    {
        [MaxLength(64)]
        [JsonProperty("customerName")]
        [Required]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@customerName", SqlDataType = SqlDbType.VarChar)]
        [RegularExpression(@"^[a-zA-Z ]+$", ErrorMessage ="The property 'customerName' is not valid.")]
        public string CustomerName { get; set; }

        [MaxLength(16)]
        [JsonProperty("trackingId")]
        public string TrackingId { get; set; }

        [JsonProperty("consigner")]
        [Required]
        public Consigner Consigner { get; set; } = new Consigner();

        [JsonProperty("consignee")]
        [Required]
        public Consignee Consignee { get; set; } = new Consignee();

        [JsonProperty("status")]
        [Required]
        public ConsignmentStatus Status { get; set; } = new ConsignmentStatus();

        [JsonProperty("schedule")]
        [Required]
        public ConsignmentSchedule Schedule { get; set; } = new ConsignmentSchedule();

        [JsonProperty("billAmount")]
        [DataParameter(DataType = DbType.Int32, Direction = ParameterDirection.Input, ParameterName = "@billAmount", SqlDataType = SqlDbType.Int)]
        public int BillAmount { get; set; } = 0;

        [JsonProperty("content")]
        [Required]
        public ConsignmentContent Content { get; set; } = new ConsignmentContent();

        [JsonProperty("invoices")]
        [Required]
        public IEnumerable<ConsignmentInvoice> Invoices { get; set; }

        [JsonProperty("items")]
        [Required]
        public IEnumerable<ConsignmentItem> Items { get; set; }

        [JsonProperty("payment")]
        [Required]
        public ConsignmentPayment Payment { get; set; }

        [JsonProperty("remarks")]
        [MaxLength(64, ErrorMessage ="The remarks cannot be more than 64 in length.")]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@remarks", SqlDataType = SqlDbType.VarChar)]
        [RegularExpression(@"^[a-zA-Z ]+$", ErrorMessage = "The property 'remarks' is not valid.")]
        public string Remarks { get; set; }

        public void ComposeFrom(IDataReader reader)
        {
            this.BillAmount = reader["BillAmount"] == null ? 0 : Convert.ToInt32(reader["BillAmount"]);
            this.Consignee.ComposeFrom(reader);
            this.Consigner.ComposeFrom(reader);
            this.Content.ComposeFrom(reader);
            this.CreatedBy = reader["CreatedBy"].ToString();
            this.CreatedOn = Convert.ToDateTime(reader["CreatedOn"]);
            this.CustomerName = reader["CustomerName"].ToString();
            this.Id = Convert.ToInt32(reader["Id"]);
            this.ModifiedBy = reader["ModifiedBy"].ToString();
            this.ModifiedOn = Convert.ToDateTime("ModifiedOn");
            this.Schedule.ComposeFrom(reader);
            this.Status.ComposeFrom(reader);
            this.TrackingId = reader["TrackingId"].ToString();
        }

        public override IEnumerable<IDataParameter> GetSqlParameters()
        {
            var parameters = new List<IDataParameter>();
            parameters.AddRange(this.ComposeParameters());
            parameters.AddRange(EntityExtension.GetSqlParameters(this.Consignee));
            parameters.AddRange(EntityExtension.GetSqlParameters(this.Consigner));
            parameters.AddRange(EntityExtension.GetSqlParameters(this.Content));
            parameters.AddRange(EntityExtension.GetSqlParameters(this.Schedule));
            parameters.AddRange(EntityExtension.GetSqlParameters(this.Status));
            parameters.AddRange(EntityExtension.GetSqlParameters(this.Payment));
            parameters.Add(GetInvoiceParamter());
            parameters.Add(GetBoxesParameter());
            return parameters;
        }

        private IDataParameter GetInvoiceParamter()
        {
            DataTable dt = new();
            //Add columns  
            dt.Columns.Add(new DataColumn("InvoiceNumber", typeof(string)));
            dt.Columns.Add(new DataColumn("InvoiceDate", typeof(DateTime)));
            dt.Columns.Add(new DataColumn("InvoiceValue", typeof(int)));
            dt.Columns.Add(new DataColumn("Quantity", typeof(int)));
            dt.Columns.Add(new DataColumn("ItemDescription", typeof(string)));
            dt.Columns.Add(new DataColumn("InvoiceUrl", typeof(string)));
            //Add rows  
            foreach(var item in Invoices)
            {
                dt.Rows.Add(item.InvoiceNumber, item.InvoiceDate, item.InvoiceValue, item.Quantity, item.ItemDescription, item.InvoiceUrl);
            }
            return new SqlParameter("@invoices", dt);
        }

        private IDataParameter GetBoxesParameter()
        {
            DataTable dt = new();
            dt.Columns.Add(new DataColumn("Length", typeof(int)));
            dt.Columns.Add(new DataColumn("Width", typeof(int)));
            dt.Columns.Add(new DataColumn("Height", typeof(int)));

            foreach(var item in Items)
            {
                dt.Rows.Add(item.LengthInch, item.WidthInch, item.HeightInch);
            }
            return new SqlParameter("@boxes", dt);
        }
    }
}
