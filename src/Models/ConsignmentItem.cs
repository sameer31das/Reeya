using CargoXpert.Entity.Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace CargoXpert.WebApi.Models
{
    public class ConsignmentItem : IComposable
    {
        [JsonProperty("lengthInch")]
        public int LengthInch { get; set; }
        [JsonProperty("widthInch")]
        public int WidthInch { get; set; }
        [JsonProperty("heightInch")]
        public int HeightInch { get; set; }

        public void ComposeFrom(IDataReader reader)
        {
            this.HeightInch = Convert.ToInt32(reader["HeightInch"]);
            this.LengthInch = Convert.ToInt32(reader["LengthInch"]);
            this.WidthInch = Convert.ToInt32(reader["WidthInch"]);
        }
    }
}
