using EasyLan.DataLayer.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyLan.Web.Models
{
    public class TournamentViewModel
    {
        public Guid TournamentId { get; set; }
        public TournamentType TournamentType { get; set; }
        public DateTime DateTimeOfStart { get; set; }
        public LocationViewModel Location { get; set; }
        public Game Game { get; set; }
        public int Format { get; set; }
        public string PryzeType { get; set; }
        public int PryzeCount { get; set; }
        public int NumberOfTeamsStart { get; set; }
        public int NumberOfTeamsEnd { get; set; }
        public int NumberOfWinner { get; set; }
        public int Payment { get; set; }
        public string Comment { get; set; }
        public string Initiator { get; set; }
        public bool IsWithAlcohol { get; set; }
        public bool IsWithFood { get; set; }
    }
}
