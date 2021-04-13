using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace CargoXpert.WebApi.Models
{
    internal static class EntityExtension
    {
        internal static IEnumerable<IDataParameter> ComposeParameters(this EntityBase entity)
        {
            List<IDataParameter> parameters = new List<IDataParameter>();
            var fields = entity.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (var item in fields)
            {
                var attr = item.GetCustomAttribute<DataParameterAttribute>();
                if (attr == null) continue;
                object sqlValue;
                if (item.PropertyType.IsEnum)
                {
                    sqlValue = item.GetValue(entity).ToString();
                }
                else
                {
                    sqlValue = item.GetValue(entity) ?? DBNull.Value;
                }
                parameters.Add(new SqlParameter(attr.ParameterName, attr.SqlDataType)
                {
                    DbType = attr.DataType,
                    Direction = attr.Direction,
                    Value = sqlValue
                });
            }
            return parameters;
        }

        internal static IEnumerable<IDataParameter> GetSqlParameters(object entity)
        {
            List<IDataParameter> parameters = new List<IDataParameter>();
            var fields = entity.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (var item in fields)
            {
                var attr = item.GetCustomAttribute<DataParameterAttribute>();
                if (attr == null) continue;
                object sqlValue;
                if (item.PropertyType.IsEnum)
                {
                    sqlValue = item.GetValue(entity).ToString();
                }
                else
                {
                    sqlValue = item.GetValue(entity) ?? DBNull.Value;
                }
                parameters.Add(new SqlParameter(attr.ParameterName, attr.SqlDataType)
                {
                    DbType = attr.DataType,
                    Direction = attr.Direction,
                    Value = sqlValue
                });
            }
            return parameters;
        }

    }
}
