using CargoXpert.WebApi.Contracts;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CargoXpert.WebApi.Models
{
    public class City : EntityBase, IComposable
    {
        [MaxLength(128, ErrorMessage = "The length of Name should not be more than 128.")]
        [JsonProperty("name")]
        [RegularExpression("^[A-Za-z]*$", ErrorMessage = "The value of this field does not match the required criteria.")]
        [Required]
        [DataParameter(ParameterName = "@name", DataType = DbType.String, SqlDataType = SqlDbType.VarChar, Direction = ParameterDirection.Input)]
        public string Name { get; set; }

        [Required]
        [JsonProperty("state")]
        public StateOrCounty State { get; set; }

        [JsonProperty("pinCode")]
        [MaxLength(6, ErrorMessage = "The length should not be more than 6.")]
        [RegularExpression("^[1-9]{1}[0-9]{5}$", ErrorMessage = "The value of Pin Code field does not match the required criteria.")]
        [Required]
        [DataParameter(ParameterName = "@pinCode", DataType = DbType.String, SqlDataType = SqlDbType.VarChar, Direction = ParameterDirection.Input)]
        public string PinCode { get; set; }

        [JsonProperty("location")]
        [Required]
        public Location Location { get; set; }

        public void ComposeFrom(IDataReader reader)
        {
            CreatedBy = string.Empty;
            CreatedOn = DateTime.MinValue;
            Id = Convert.ToInt32(reader["Id"]);
            Location = new Location
            {
                Latitude = Convert.ToDouble(reader["Latitude"]),
                Longitude = Convert.ToDouble(reader["Longitude"])
            };
            ModifiedBy = string.Empty;
            ModifiedOn = DateTime.MinValue;
            Name = reader["Name"].ToString();
            PinCode = Convert.ToString(reader["PinCode"]);
            State = new StateOrCounty
            {
                Id = Convert.ToInt32(reader["StateId"]),
                Name = reader["State"].ToString(),
                Type = (StateTypeEnum)Enum.Parse(typeof(StateTypeEnum), Convert.ToString(reader["StateType"])),
                Code = Convert.ToString(reader["StateCode"]),
                Zone = Convert.ToString(reader["StateZone"])
            };
        }

        public override IEnumerable<IDataParameter> GetSqlParameters()
        {
            var parameters = new List<IDataParameter>();
            parameters.AddRange(this.ComposeParameters());
            parameters.AddRange(Location.GetSqlParameters());
            parameters.Add(new SqlParameter
            {
                ParameterName = "@stateId",
                SqlDbType = SqlDbType.Int,
                DbType = DbType.Int32,
                Direction = ParameterDirection.Input,
                Value = State.Id
            });
            parameters.Add(new SqlParameter("@currentUserId", SqlDbType.UniqueIdentifier)
            {
                DbType = DbType.Guid,
                Direction = ParameterDirection.Input,
                Value = ModifiedBy
            });
            return parameters;
        }
    }
}
