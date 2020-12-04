using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace EasyLan.LogicLayer.DTOs
{
    public class MatchDTO
    {
        public Guid MatchId { get; set; }
        public Guid? NextMatchId { get; set; }
        public MatchDTO NextMatch { get; set; }
        public int NavNumber { get; set; }
        public int Level { get; set; }
        public string FirstPlayerId { get; set; }
        public IdentityUser FirstPlayer { get; set; }

        public string SecondPlayerId { get; set; }
        public IdentityUser SecondPlayer { get; set; }

        public string WinnerId { get; set; }
        public IdentityUser Winner { get; set; }

        private TournamentDTO Tournament { get; set; }
        public Guid TournamentId { get; set; }
    }
}
