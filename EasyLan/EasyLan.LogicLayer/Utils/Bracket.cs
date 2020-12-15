using System;
using System.Collections.Generic;
using System.Linq;
using EasyLan.DataLayer.Entites;

namespace EasyLan.LogicLayer.Utils
{
    public class Bracket
    {
        public static MatchNode Create(List<PlayerTournament> players)
        {
            var playersCount = players.Count;
            if (playersCount < 2)
            {
                throw new ArgumentException("players count must be >= 2");
            }

            var levelsCount = (int) Math.Ceiling(Math.Log2(playersCount));
            var binaryTree = CreateBinaryTreeMatches(levelsCount);
            var firstMatches = binaryTree[1];
            FillFirstMatches(players, firstMatches);
            BalancingMatches(firstMatches);

            return binaryTree[levelsCount].FirstOrDefault();
        }

        private static void BalancingMatches(List<MatchNode> firstMatches)
        {
            for (int i = 0; i < firstMatches.Count - 1; i += 2)
            {
                var firstMatch = firstMatches[i];
                var secondMatch = firstMatches[i + 1];

                if (firstMatch.Match.SecondPlayerId == null)
                {
                    firstMatch.NextMatchNode.Match.FirstPlayerId = firstMatch.Match.FirstPlayerId;
                    firstMatch.Match.FirstPlayerId = null;
                }

                if (secondMatch.Match.SecondPlayerId == null)
                {
                    secondMatch.NextMatchNode.Match.SecondPlayerId = secondMatch.Match.FirstPlayerId;
                    secondMatch.Match.FirstPlayerId = null;
                }
            }

            foreach (var match in firstMatches)
            {
                var currentMatch = match;
                while (currentMatch.Match.FirstPlayerId == null && currentMatch.Match.SecondPlayerId == null)
                {
                    if (currentMatch.NextMatchNode.PrevLeftMatchNode == currentMatch)
                        currentMatch.NextMatchNode.PrevLeftMatchNode = null;
                    if (currentMatch.NextMatchNode.PrevRightMatchNode == currentMatch)
                        currentMatch.NextMatchNode.PrevRightMatchNode = null;

                    var temp = currentMatch.NextMatchNode;
                    currentMatch.NextMatchNode = null;
                    currentMatch = temp;
                }
            }
        }

        private static void FillFirstMatches(List<PlayerTournament> players, List<MatchNode> firstMatches)
        {
            var nextMatchIndex = 0;
            foreach (var player in players)
            {
                if (nextMatchIndex >= firstMatches.Count)
                    nextMatchIndex = 0;
                var matchNode = firstMatches[nextMatchIndex];
                if (matchNode.Match.FirstPlayerId == null)
                    matchNode.Match.FirstPlayerId = player.UserId;
                else
                    matchNode.Match.SecondPlayerId = player.UserId;
                nextMatchIndex++;
            }
        }

        private static Dictionary<int, List<MatchNode>> CreateBinaryTreeMatches(int levelsCount)
        {
            var binaryTree = new Dictionary<int, List<MatchNode>>();
            var navNumber = (int) Math.Pow(2, levelsCount);
            var queue = new Queue<MatchNode>();
            queue.Enqueue(new MatchNode
            {
                Match = new Match
                {
                    NavNumber = --navNumber,
                    Level = levelsCount
                }
            });

            while (queue.Count > 0)
            {
                var currentMatch = queue.Dequeue();
                var currentLevel = currentMatch.Match.Level;
                if (!binaryTree.ContainsKey(currentLevel))
                {
                    binaryTree[currentLevel] = new List<MatchNode>();
                }

                binaryTree[currentLevel].Add(currentMatch);

                if (currentLevel - 1 == 0)
                    continue;

                var prevLeftMatch = new MatchNode
                {
                    Match = new Match
                    {
                        NavNumber = --navNumber,
                        Level = currentLevel - 1
                    },
                    NextMatchNode = currentMatch,
                };
                var prevRightMatch = new MatchNode
                {
                    Match = new Match
                    {
                        NavNumber = --navNumber,
                        Level = currentLevel - 1
                    },
                    NextMatchNode = currentMatch,
                };
                currentMatch.PrevLeftMatchNode = prevLeftMatch;
                currentMatch.PrevRightMatchNode = prevRightMatch;

                queue.Enqueue(prevLeftMatch);
                queue.Enqueue(prevRightMatch);
            }

            return binaryTree;
        }
    }
}