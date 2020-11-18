using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EasyLan.DataLayer.Entites
{
    [Table("locations")]
    public class Location
    {
        public Guid LocationId { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
    }
}
