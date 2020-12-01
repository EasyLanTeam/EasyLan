using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EasyLan.DataLayer.Entites
{
    [Table("leaderboard")]
    public class UserScore
    {
        public Guid Id { get; set; }
        public User User { get; set; }
        public string Region { get; set; }
        public int Score { get; set; }
    }
}
