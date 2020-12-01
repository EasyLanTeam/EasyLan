﻿using EasyLan.LogicLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace EasyLan.LogicLayer.Interfaces
{
    public interface ITournamentService
    {
        TournamentDTO Find(Guid id);
        List<TournamentDTO> Get(int count, int pageNumber);
        void Create(TournamentDTO tournament);
        void Remove(TournamentDTO tournament);
        void Update(TournamentDTO tournament);
        void AddUserToTournament(string userId, Guid tournamentId);
        void Start(Guid id);
    }
}
