using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using EasyLan.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Cryptography;
using System.Text;

namespace EasyLan.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private IUserService userService;
        public RegistrationController(IUserService userServ)
        {
            userService = userServ;
        }
        // GET: api/Registration
        [HttpPost]
        public IActionResult Post(RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (userService.GetUser(model.Username) != null)
            {
                return UnprocessableEntity(ModelState);
            }
            
            var sha256 = new SHA256Managed();
            var userDto = new UserDTO
            {
                Id = Guid.NewGuid(),
                Fullname = model.Fullname,
                Username = model.Username,
                Password = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(model.Password))),
            };
            userService.Add(userDto);
            return Ok();
        }
    }
}
