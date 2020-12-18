using System;

namespace EasyLan.LogicLayer.DTOs
{
    public class PlayerTournamentDTO
    {
        public Guid TournamentId { get; set; }
        public string UserId { get; set; }
        public string Username { get; set; }
        public int ScoreInMoment { get; set; }
        public int ScoreDelta { get; set; }
    }
}