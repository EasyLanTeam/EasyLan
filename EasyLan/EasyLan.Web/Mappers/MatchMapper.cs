using AutoMapper;
using EasyLan.DataLayer.Entites;
using EasyLan.LogicLayer.DTOs;
using EasyLan.Web.Models;

namespace EasyLan.Web.Mappers
{
    public class MatchMapper
    {
        private static MapperConfiguration config = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<MatchViewModel, MatchDTO>();
            cfg.CreateMap<MatchDTO, MatchViewModel>();

        });
        private static IMapper mapper = config.CreateMapper();
        public static MatchViewModel Map(MatchDTO matchDTO)
        {
            var result = mapper.Map<MatchDTO, MatchViewModel>(matchDTO);
            result.FirstPlayerName = matchDTO.FirstPlayer?.UserName;
            result.SecondPlayerName = matchDTO.SecondPlayer?.UserName;
            result.WinnerName = matchDTO.Winner?.UserName;

            return result;
        }
    }
}
