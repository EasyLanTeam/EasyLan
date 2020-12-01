using EasyLan.LogicLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace EasyLan.LogicLayer.Interfaces
{
    internal interface IUserScoreService
    {
        void Create(UserScoreDTO userScore);
        void Delete(UserScoreDTO userScore);
        UserScoreDTO Read(Guid userScoreId);
        void Update(UserScoreDTO userScore);
        List<UserScoreDTO> ReadAll();
    }
}
