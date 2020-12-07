using System;
using System.Collections.Generic;
using System.Linq;

namespace AOC2020
{
    public class Day5 : IDay
    {

        public void Run()
        {
            var inputs = this.ReadInput();
            Solve(inputs);
        }

        public void Test()
        {
            var inputs = new string[] { "BBFFBBFRLL", "BFFFBBFRRR", "FFFBBBFRRR", "FBFBBFFRLR" };
            Solve(inputs);

        }

        private void Solve(string[] inputs)
        {
            var identies = new List<int>();

            foreach (var s in inputs)
            {
                identies.Add(FindIdentity(s));
            }
            Console.WriteLine($"Response: {identies.Max()}");
            
            var ordered = identies.OrderBy(k => k).ToList();
            
            for (int i=1;i<ordered.Count()-1;i++){
                if (ordered[i] - ordered[i-1] > 1) {
                        Console.WriteLine($"Found: {ordered[i] -1}");
                        break;
                    }
            }
        }

        private int FindIdentity(string input)
        {
            var row = FindValue(input.AsSpan().Slice(0, 7), 'F');
            var col = FindValue(input.AsSpan().Slice(7, 3), 'L'); 
            var identity = row * 8 + col;
            return identity;
        }

        private static int FindValue(ReadOnlySpan<char> input, char less)
        {
            var r = (1<<input.Length)-1;
            for (var i = 0; i < input.Length; i++)
            {
                if (input[i] == less)
                {
                    r = r - (1 << (input.Length-1) - i);
                }

                //Console.WriteLine($"{input[i]} -> {r}");
            }
            return r;
        }
    }
}