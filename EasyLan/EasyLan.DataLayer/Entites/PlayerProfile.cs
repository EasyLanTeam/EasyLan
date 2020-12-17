using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace EasyLan.DataLayer.Entites
{
    public class PlayerProfile
    {
        public Guid Id { get; set; }
        public IdentityUser Player { get; set; }
        public Location Location { get; set; }
        public string AdditionalInfo { get; set; } = "Древнейший сморк.";
        public int TournamentsCount { get; set; }
        public string Avatar { get; set; }
    }
}
