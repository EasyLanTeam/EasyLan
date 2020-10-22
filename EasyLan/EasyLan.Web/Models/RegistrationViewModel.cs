using System.ComponentModel.DataAnnotations;

namespace EasyLan.Web.Models
{

    public class RegistrationViewModel
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Fullname { get; set; }
        [Required]
        public string Password { get; set; }
        public string Email { get; set; }

    }

}
