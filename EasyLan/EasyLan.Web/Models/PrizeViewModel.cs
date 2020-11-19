using System;
using System.Text.Json.Serialization;

namespace EasyLan.Web.Models
{
    public class PrizeViewModel
    {
        public Guid PrizeId { get; set; }
        [JsonPropertyName("prize")]
        public string PrizeName { get; set; }
        public int PrizeCount { get; set; }
        public int Place { get; set; }
    }
}
