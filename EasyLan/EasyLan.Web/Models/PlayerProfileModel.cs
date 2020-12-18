using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyLan.Web.Models
{
    public class PlayerProfileModel
    {
        public Guid Id { get; set; }
        public string PlayerId { get; set; }
        public LocationViewModel Location { get; set; }
        public string AdditionalInfo { get; set; }
        public int TournamentsCount { get; set; }
        public string Avatar { get; set; }
    }
}
