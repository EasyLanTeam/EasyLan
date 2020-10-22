using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EasyLan.DataLayer.Entites
{
    [Table("users")]
    public class User
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Fullname { get; set; }
    }
}
