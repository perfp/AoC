using System.Text.RegularExpressions;

namespace AOC2022
{
    public class Day5 : IDay
    {
        public void Solve()
        {
            var input = new Input().ReadFile("input5.txt");
            FindTopOfStacks(input);
        }

        public void Test()
        {
            var input = new string[]{
                "    [D]    ",
                "[N] [C]    ",
                "[Z] [M] [P]",
                " 1   2   3 ",
                "",
                "move 1 from 2 to 1",
                "move 3 from 1 to 3",
                "move 2 from 2 to 1",
                "move 1 from 1 to 2",
            };

        FindTopOfStacks(input);
           
    }

    public void FindTopOfStacks(string []input){
         int divider = 0;
            foreach (var l in input){
                if (string.IsNullOrWhiteSpace(l))break;
                divider++;
            }

            var initial = input.Take(divider).ToArray();
            var rearragement = input.Skip(divider+1).ToArray();

            var stackCount = initial.Last().Split(" ").Where(s => !string.IsNullOrWhiteSpace(s) ).Select(s => int.Parse(s)).Max();
            var stacks = new Dictionary<int, Stack<char>>();
            
            foreach (var line in initial.Reverse().Skip(1)){
                for(int i=1;i<=stackCount;i++){
                    char c = line[1 + (i-1)*4];
                    if (!stacks.ContainsKey(i)) stacks[i] = new Stack<char>();
                    if (c != ' ') stacks[i].Push(c);
                }
            }

            var stack = new Stack<char>();
            
            int moves = 0;
            foreach (var move in rearragement){
                Console.WriteLine($"Move {moves++}");
                var matches = Regex.Match(move, @"move (\d+) from (\d+) to (\d+)");
                var count = Int32.Parse(matches.Groups[1].Value);
                var from = Int32.Parse(matches.Groups[2].Value);
                var to = Int32.Parse(matches.Groups[3].Value);

                
                for (int i=0;i<count; i++){    
                    var c = stacks[from].Pop();
                    stack.Push(c);
                }
                while (stack.Any()){
                    var c = stack.Pop();
                    stacks[to].Push(c);
                }
                
            }

            string top = "";
            foreach( var s in stacks.Keys){
                top += stacks[s].First();
            }
            Console.WriteLine($"Top: {top}");
        }
    }
}
