using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyLan.Web.Models
{
    public class UserScoreModel
    {
        public Guid Id { get; set; }
        public UserViewModel User { get; set; }
        public string Region { get; set; }
        public int Score { get; set; }
    }
}
