using EasyLan.DataLayer;
using EasyLan.DataLayer.Entites;
using EasyLan.DataLayer.Interfaces;
using EasyLan.LogicLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyLan.LogicLayer.Services
{
    public class PlayerProfileService : IPlayerProfileService
    {
        private readonly AppDbContext _dbContext;
        private readonly IconGenerator _iconGenerator;

        public PlayerProfileService(AppDbContext dbContext, IconGenerator iconGenerator)
        {
            _dbContext = dbContext;
            _iconGenerator = iconGenerator;
        }

        public async Task Create(PlayerProfile playerProfile)
        {
            playerProfile.Avatar = _iconGenerator.GenerateIconToBase64();
            await _dbContext.PlayersProfiles.AddAsync(playerProfile).ConfigureAwait(false);
            await _dbContext.SaveChangesAsync().ConfigureAwait(false);
        }

        public async Task Delete(Guid id)
        {
            var playerProfile = await _dbContext.PlayersProfiles.FindAsync(id).ConfigureAwait(false);
            if (playerProfile != null)
            {
                _dbContext.PlayersProfiles.Remove(playerProfile);
                await _dbContext.SaveChangesAsync().ConfigureAwait(false);
            }
        }

        public async Task<PlayerProfile> Read(Guid id)
        {
            return await _dbContext.PlayersProfiles.FindAsync(id).ConfigureAwait(false);
        }

        public async Task<PlayerProfile> Read(string playerId)
        {
            return await _dbContext.PlayersProfiles.FirstOrDefaultAsync(x => x.Player.Id == playerId).ConfigureAwait(false);
        }

        public async Task WeakUpdate(PlayerProfile playerProfile)
        {
            //await Task.FromResult(_dbContext.PlayersProfiles.Update(playerProfile)).ConfigureAwait(false);
            _dbContext.Entry(playerProfile).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _dbContext.Entry(playerProfile).Property(x => x.Avatar).IsModified = false;
            _dbContext.Entry(playerProfile).Property(x => x.TournamentsCount).IsModified = false;
            await _dbContext.SaveChangesAsync().ConfigureAwait(false);
        }

        public async Task StrongUpdate(PlayerProfile playerProfile)
        {
            _dbContext.PlayersProfiles.Update(playerProfile);
            await _dbContext.SaveChangesAsync().ConfigureAwait(false);
        }
    }
}
