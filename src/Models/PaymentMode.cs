using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace CargoXpert.WebApi.Models
{
    public enum PaymentModes
    {
        [Description("None or invalid")]
        None,

        [Description("Payment done")]
        Paid,

        [Description("To pay")]
        ToPay,

        [Description("To bill to Consignor")]
        ToBillConsignor,

        [Description("To bill to Consignee")]
        ToBillConsignee,

        [Description("To bill to Third Party")]
        ToBillThirdParty
    }
}
