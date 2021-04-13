using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace CargoXpert.WebApi.Models
{
    public enum StatusEnum
    {
        [Description("Invalid")]
        Invalid = 0,
        [Description("Booked")]
        Booked,
        [Description("Pickup rescheduled")]
        PickupRescheduled,
        [Description("Picked up")]
        PickedUp,
        [Description("Dispatched")]
        Dispatched,
        [Description("In transit")]
        InTransit,
        [Description("Out for delivery")]
        OutForDelivery,
        [Description("Delivery rescheduled")]
        DeliveryRescheduled,
        [Description("Delivered")]
        Delivered,
    }
}
