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
    public class ConsignmentContent : IComposable
    {
        [JsonProperty("photoUrl")]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@photoUrl", SqlDataType = SqlDbType.VarChar)]
        [MaxLength(40)]
        public string PhotoUrl { get; set; }

        //[Required]
        //[JsonProperty("value")]
        //[DataParameter(DataType = DbType.Int32, Direction = ParameterDirection.Input, ParameterName = "@value", SqlDataType = SqlDbType.Int)]
        //public int Value { get; set; }

        [JsonProperty("itemsCount")]
        [Required]
        [DataParameter(DataType = DbType.Int32, Direction = ParameterDirection.Input, ParameterName = "@itemsCount", SqlDataType = SqlDbType.Int)]
        public int ItemsCount { get; set; }

        [Required]
        [JsonProperty("declaredWeight")]
        [DataParameter(DataType = DbType.Int32, Direction = ParameterDirection.Input, ParameterName = "@declaredWeight", SqlDataType = SqlDbType.Int)]
        public int DeclaredWeight { get; set; }

        [JsonProperty("actualWeight")]
        [DataParameter(DataType = DbType.Int32, Direction = ParameterDirection.Input, ParameterName = "@actualWeight", SqlDataType = SqlDbType.Int)]
        public int ActualWeight { get; set; }

        [JsonProperty("category")]
        [MaxLength(32)]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@declaredMaterial", SqlDataType = SqlDbType.VarChar)]
        public string Category { get; set; }

        [JsonProperty("consignmentNote")]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@consignmentNote", SqlDataType = SqlDbType.VarChar)]
        [MaxLength(16, ErrorMessage ="The field 'consignmentNote' cannot be more than 16 length.")]
        [RegularExpression(@"^[0-9]*$", ErrorMessage = "The property 'consignmentNote' is not valid.")]
        public string ConsignmentNote { get; set; }

        public void ComposeFrom(IDataReader reader)
        {
            this.ActualWeight = Convert.ToInt32(reader["ActualWeight"]);
            this.Category = reader["DeclaredMaterial"].ToString();
            this.DeclaredWeight = Convert.ToInt32(reader["DeclaredWeight"]);
            this.ItemsCount = Convert.ToInt32(reader["ItemsCount"]);
            this.PhotoUrl = reader["PhotoUrl"].ToString();
            //this.Value = Convert.ToInt32(reader["Value"]);
            this.ConsignmentNote = reader["ConsignmentNote"].ToString();
        }
    }
}
