using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace CargoXpert.WebApi.Models
{
    public enum InquiryType
    {
        [Description("None or invalid")]
        None,
        [Description("Customer")]
        Customer,
        [Description("Franchisee")]
        Franchisee,
        [Description("Employment")]
        Employment
    }
}
