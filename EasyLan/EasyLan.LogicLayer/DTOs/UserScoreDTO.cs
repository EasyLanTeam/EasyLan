using System;
using System.Collections.Generic;
using System.Text;

namespace EasyLan.LogicLayer.DTOs
{
    public class UserScoreDTO
    {
        public Guid Id { get; set; }
        public UserDTO User { get; set; }
        public string Region { get; set; }
        public int Score { get; set; }
    }
}
