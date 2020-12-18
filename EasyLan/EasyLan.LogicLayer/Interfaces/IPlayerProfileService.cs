using EasyLan.DataLayer.Entites;
using System;
using System.Threading.Tasks;

namespace EasyLan.LogicLayer.Interfaces
{
    public interface IPlayerProfileService
    {
        Task Create(PlayerProfile playerProfile);
        Task Delete(Guid id);
        Task<PlayerProfile> Read(Guid id);
        Task<PlayerProfile> Read(string playerId);
        Task WeakUpdate(PlayerProfile playerProfile);
    }
}