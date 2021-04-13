using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace CargoXpert.WebApi.Models
{
    public struct Location
    {
        [JsonProperty("latitude")]
        [DataParameter(DataType = DbType.Double, Direction = ParameterDirection.Input, ParameterName = "@latitude", SqlDataType = SqlDbType.Float)]
        public double Latitude { get; set; }

        [JsonProperty("longitude")]
        [DataParameter(DataType = DbType.Double, Direction = ParameterDirection.Input, ParameterName = "@longitude", SqlDataType = SqlDbType.Float)]
        public double Longitude { get; set; }

        public IEnumerable<IDataParameter> GetSqlParameters()
        {
            List<IDataParameter> parameters = new List<IDataParameter>();
            var fields = this.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (var item in fields)
            {
                var attr = item.GetCustomAttribute<DataParameterAttribute>();
                parameters.Add(new SqlParameter(attr.ParameterName, attr.SqlDataType)
                {
                    DbType = attr.DataType,
                    Direction = attr.Direction,
                    Value = item.GetValue(this),
                });
            }
            return parameters;
        }
    }
}
