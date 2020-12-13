using EasyLan.DataLayer.Entites;
using System;
using System.Collections.Generic;
using System.Text;

namespace EasyLan.LogicLayer.DTOs
{
    public class ClubRequestDTO
    {
        public Guid ClubRequestId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public Status Status { get; set; }
        public bool IsCompleted { get; set; }
    }
}
