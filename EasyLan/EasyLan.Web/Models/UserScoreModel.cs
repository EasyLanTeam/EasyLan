using AutoMapper.Configuration.Annotations;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace EasyLan.Web.Models
{
    public class UserScoreModel
    {
        [JsonIgnore]
        public Guid Id { get; set; }
        [JsonIgnore]
        public IdentityUser User { get; set; }
        public string UserName => User.UserName;
        [JsonIgnore]
        public string Region { get; set; }
        public int Score { get; set; }
    }
}
