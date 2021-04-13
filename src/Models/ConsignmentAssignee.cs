using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace CargoXpert.WebApi.Models
{
    public class ConsignmentAssignee
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("assignedTo")]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        public string AssignedTo { get; set; }
    }
}
