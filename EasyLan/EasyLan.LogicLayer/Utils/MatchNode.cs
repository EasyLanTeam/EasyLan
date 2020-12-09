using EasyLan.DataLayer.Entites;

namespace EasyLan.LogicLayer.Utils
{
    public class MatchNode
    {
        public Match Match { get; set; }
        public MatchNode NextMatchNode { get; set; }
        public MatchNode PrevLeftMatchNode { get; set; }
        public MatchNode PrevRightMatchNode { get; set; }

        public override string ToString()
        {
            return $@"{Match.NavNumber}, Next:{NextMatchNode.Match.NavNumber}";
        }
    }
}