using EasyLan.LogicLayer.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyLan.Web.Controllers
{
    public class AdminController : Controller
    {
        IClubService clubService;
        UserManager<IdentityUser> userManager;        
        public AdminController(IClubService clubService, UserManager<IdentityUser> userManager)
        {
            this.userManager = userManager;
            this.clubService = clubService;
        }
        [HttpGet]
        [Route("admin")]
        public IActionResult AdminPanel()
        {
            ViewBag.Requests = clubService.Get();
            return View();
        }
        [HttpGet]
        [Route("admin/applyRequest/{id}")]
        public string ApplyRequest(Guid id)
        {
            var request = clubService.Find(id);
            var newUser = new IdentityUser(request.UserName);
            userManager.CreateAsync(newUser, request.Password);
            userManager.AddToRoleAsync(newUser, "initiator");
            clubService.MarkAsApplyed(id);
            return "Ok";
        }
    }
}