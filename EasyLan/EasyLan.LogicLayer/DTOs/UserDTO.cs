using System;

namespace EasyLan.LogicLayer.DTOs
{
    public class UserDTO
    {
        public Guid Id { get; set; }
        public string Fullname { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
