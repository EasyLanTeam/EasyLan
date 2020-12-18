using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using EasyLan.Web.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EasyLan.Web.Controllers
{
    public class ClubController : Controller
    {
        IClubService clubService;
        UserManager<IdentityUser> userManager;
        public ClubController(IClubService clubService, UserManager<IdentityUser> userManager)
        {
            this.clubService = clubService;
            this.userManager = userManager;
        }

        [HttpGet]
        [Route("club")]
        public IActionResult FeedbackForm()
        {
            return View();
        }

        [HttpPost]
        [Route("club/send")]
        public string FeedbackForm([FromForm]ClubFeedbackViewModel feedbackForm)
        {
            clubService.Create(new ClubRequestDTO
            {
                Address = feedbackForm.Address,
                Name = feedbackForm.Name,
                PhoneNumber = feedbackForm.PhoneNumber,
                Password = feedbackForm.Password, 
                UserName = feedbackForm.UserName,                
            });

            return "Ok";
        }



    }
}