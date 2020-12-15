using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyLan.LogicLayer.DTOs;
using EasyLan.LogicLayer.Interfaces;
using EasyLan.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace EasyLan.Web.Controllers
{
    public class ClubController : Controller
    {
        IClubService clubService;
        public ClubController(IClubService clubService)
        {
            this.clubService = clubService;
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
            });

            return "Ok";
        }



    }
}