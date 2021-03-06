﻿using EasyLan.LogicLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace EasyLan.LogicLayer.Interfaces
{
    public interface IClubService
    {
        void Create(ClubRequestDTO clubRequestDTO);
        List<ClubRequestDTO> Get();
        ClubRequestDTO Find(Guid id);
        void MarkAsApplyed(Guid id);
    }
}
