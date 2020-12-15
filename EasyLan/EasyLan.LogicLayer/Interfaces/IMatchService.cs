using EasyLan.DataLayer.Entites;
using EasyLan.LogicLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace EasyLan.LogicLayer.Interfaces
{
    public interface IMatchService
    {
        void InitilizeFirstMatches(Guid tournamentId);
        void SetWinner(Guid matchId, string userId);
        // void CreateNext(Guid firstMatchId, Guid secondMatchId);
        List<List<MatchDTO>> Get(Guid tournamentId);
    }
}
