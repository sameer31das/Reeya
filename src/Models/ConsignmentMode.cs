using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace CargoXpert.WebApi.Models
{
    public enum ConsignmentMode
    {
        [Description("None or invalid")]
        None,

        [Description("Prime Air")]
        PrimeAir,

        [Description("Air")]
        Air,

        [Description("Train")]
        Train,

        [Description("Express")]
        Express,

        [Description("Surface")]
        Surface,

        [Description("Ship")]
        Ship
    }
}
