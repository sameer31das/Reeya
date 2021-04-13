using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace CargoXpert.WebApi.Models
{
    [AttributeUsage(AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
    public class DataParameterAttribute : Attribute
    {
        public string ParameterName { get; set; }
        public ParameterDirection Direction { get; set; }
        public SqlDbType SqlDataType { get; set; }
        public DbType DataType { get; set; }
    }
}
