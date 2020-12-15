using EasyLan.DataLayer.Entites;
using System;
using System.Collections.Generic;
using System.Text;

namespace EasyLan.LogicLayer.DTOs
{
    public class TournamentDTO
    {
        public Guid TournamentId { get; set; }
        public TournamentType TournamentType { get; set; }
        public TournamentState TournamentState { get; set; }
        public DateTime DateTimeOfStart { get; set; }
        public string Location { get; set; }
        public string Game { get; set; }
        public string Format { get; set; }
        public List<PrizeDTO> Prizes { get; set; }
        public int NumberOfTeamsStart { get; set; }
        public int NumberOfTeamsEnd { get; set; }
        public int Payment { get; set; }
        public string Comment { get; set; }
        public string InitiatorId { get; set; }

        public string Initiator { get; set; }
        public int CurrentNumberOfParticipants { get; set; }
    }
}
