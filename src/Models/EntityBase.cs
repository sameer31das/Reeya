using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace CargoXpert.WebApi.Models
{
    public abstract class EntityBase
    {
        [JsonProperty("id")]
        [Required]
        [Key]
        public int Id { get; set; }

        [JsonProperty("createdOn")]
        [Required]
        public DateTime CreatedOn { get; set; }

        [JsonProperty("modifiedOn")]
        [Required]
        public DateTime ModifiedOn { get; set; }

        [JsonProperty("createdBy")]
        [Required]
        public string CreatedBy { get; set; }

        [JsonProperty("modifiedBy")]
        [Required]
        [DataParameter(DataType = DbType.String, Direction = ParameterDirection.Input, ParameterName = "@currentUserId", SqlDataType = SqlDbType.VarChar)]
        public string ModifiedBy { get; set; }

        public abstract IEnumerable<IDataParameter> GetSqlParameters();
    }
}
