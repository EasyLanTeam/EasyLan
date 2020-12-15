using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyLan.Web.Models
{
    public class MatchViewModel
    {
        public Guid MatchId { get; set; }
        public Guid? NextMatchId { get; set; }
        public MatchViewModel NextMatch { get; set; }
        public int NavNumber { get; set; }
        public int Level { get; set; }
        public string PrevFirstMatchId { get; set; }
        public string PrevSecondMatchId { get; set; }
        
        public string FirstPlayerId { get; set; }
        public string FirstPlayerName { get; set; }

        public string SecondPlayerId { get; set; }
        public string SecondPlayerName { get; set; }

        public string WinnerId { get; set; }
        public string WinnerName { get; set; }
        public Guid TournamentId { get; set; }
    }
}
