using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace EasyLan.DataLayer.Entites
{
    public class Match
    {
        public Guid MatchId { get; set; }
        public Guid? NextMatchId { get; set; }
        public Match NextMatch { get; set; }
        public int NavNumber { get; set; }
        public int Level { get; set; }
        public string FirstPlayerId { get; set; }
        public IdentityUser FirstPlayer { get; set; }
        
        public string SecondPlayerId { get; set; }
        public IdentityUser SecondPlayer { get; set; }

        public string WinnerId { get; set; }
        public IdentityUser Winner { get; set; }

        public Tournament Tournament { get; set; }
        public Guid TournamentId { get; set; }
    }
}
