using CargoXpert.WebApi.Contracts;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace CargoXpert.WebApi.Models
{
    public class StateOrCounty : IComposable
    {
        [JsonProperty("id")]
        [Required]
        [Key]
        public int Id { get; set; }

        [JsonProperty("name")]
        [RegularExpression("^[a-zA-Z]*$", ErrorMessage = "The value of this field does not match the required criteria.")]
        [Required]
        [MaxLength(64, ErrorMessage = "The length should not be more than 64.")]
        public string Name { get; set; }

        [JsonProperty("type")]
        [EnumDataType(typeof(StateTypeEnum))]
        public StateTypeEnum Type { get; set; }

        [JsonProperty("code")]
        [MaxLength(3, ErrorMessage = "The length should not be more than 3.")]
        [Required]
        public string Code { get; set; }

        [JsonProperty("zone")]
        [Required]
        [MaxLength(1, ErrorMessage = "The length should not be more than 1.")]
        public string Zone { get; set; }

        public void ComposeFrom(IDataReader reader)
        {
            Code = reader["Code"].ToString();
            Id = Convert.ToInt32(reader["Id"]);
            Name = reader["Name"].ToString();
            Type = (StateTypeEnum)Enum.Parse(typeof(StateTypeEnum), reader["Type"].ToString());
            Zone = reader["Zone"].ToString();
        }
    }
}
