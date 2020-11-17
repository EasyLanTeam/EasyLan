using System;

namespace EasyLan.Web.Models
{
    public class LocationViewModel
    {
        public Guid LocationId { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
    }
}