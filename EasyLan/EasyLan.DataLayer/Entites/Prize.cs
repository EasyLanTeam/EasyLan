using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EasyLan.DataLayer.Entites
{
    [Table("prizes")]
    public class Prize
    {
        public Guid PrizeId { get; set; }
        public string PrizeName { get; set; }
        public int Place { get; set; }
        public int PrizeCount { get; set; }
    }
}
