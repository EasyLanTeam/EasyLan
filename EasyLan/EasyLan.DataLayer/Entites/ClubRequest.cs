using System;
using System.Collections.Generic;
using System.Text;

namespace EasyLan.DataLayer.Entites
{
    public enum Status
    { 
        Proccessing,
        Proccesed
    }

    public class ClubRequest
    {
        public Guid ClubRequestId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public Status Status { get; set; }
        public bool IsCompleted { get; set; }

        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
