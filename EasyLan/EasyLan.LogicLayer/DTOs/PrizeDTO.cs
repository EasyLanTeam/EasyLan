using System;

namespace EasyLan.LogicLayer.DTOs
{
    public class PrizeDTO
    {
        public Guid PrizeId { get; set; }
        public string PrizeName { get; set; }
        public int PrizeCount { get; set; }
        public int Place { get; set; }
    }
}
