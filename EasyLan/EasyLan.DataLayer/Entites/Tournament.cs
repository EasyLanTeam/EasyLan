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

    [Table("tournaments")]
    public class Tournament
    {
        public Guid TournamentId { get; set; }
        public TournamentType TournamentType { get; set; }
        public DateTime DateTimeOfStart { get; set; }
        public Location Location { get; set; }
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
