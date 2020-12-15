using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EasyLan.DataLayer.Entites
{
    public enum TournamentType
    {
        Individual,
        Command
    }

    public enum Game
    {
        Dota2,
    }

    public enum TournamentState
    {
        //В ожидании начала
        Pending,
        //Идущий в данный момент
        Ongoing,
        //Завершенный
        Finished
    }

    [Table("tournaments")]
    public class Tournament
    {
        public Guid TournamentId { get; set; }
        public TournamentType TournamentType { get; set; }
        public TournamentState TournamentState { get; set; }
        public DateTime DateTimeOfStart { get; set; }
        public string Location { get; set; }
        public string Game { get; set; }
        public string Format { get; set; }
        public List<Prize> Prizes { get; set; }
        public int NumberOfTeamsStart { get; set; }
        public int NumberOfTeamsEnd { get; set; }
        public int Payment { get; set; }
        public string Comment { get; set; }
        public string InitiatorId { get; set; }
        public string Initiator { get; set; }
        public List<PlayerTournament> Players { get; set; }
    }
}
