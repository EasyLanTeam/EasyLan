using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyLan.Web.Models
{
    public class MathesLevelViewModel
    {
        public int LevelNumber { get; set; }
        public List<MatchViewModel> Matches { get; set; }
    }
}
