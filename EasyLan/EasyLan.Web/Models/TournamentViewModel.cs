using EasyLan.DataLayer.Entites;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EasyLan.Web.Models
{
    public class TournamentViewModel
    {
        [JsonPropertyName("id")]
        public Guid TournamentId { get; set; }
        [JsonPropertyName("type")]
        public TournamentType TournamentType { get; set; }
        [JsonPropertyName("datetime")]
        public DateTime DateTimeOfStart { get; set; }
        [JsonPropertyName("location")]
        public string Location { get; set; }
        [JsonPropertyName("game")]
        public string Game { get; set; }
        [JsonPropertyName("gameFormat")]
        public string Format { get; set; }
        [Required]
        [JsonPropertyName("prizes")]
        public List<PrizeViewModel> Prizes { get; set; }
        [JsonPropertyName("minParticipants")]
        public int NumberOfTeamsStart { get; set; }
        [JsonPropertyName("maxParticipants")]
        public int NumberOfTeamsEnd { get; set; }
        [JsonPropertyName("fee")]
        public int Payment { get; set; }
        [JsonPropertyName("addditionalInfo")]
        public string Comment { get; set; }
        [JsonPropertyName("initiatorFullname")]
        public string Initiator { get; set; }
        public string InitiatorId { get; set; }


    }
}
