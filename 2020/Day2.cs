using System;
using System.Text.RegularExpressions;

namespace AOC2020 {
    public class Day2 : IDay
    {
        public void Run()
        {
            var input = this.ReadInput();
            Solve2(input);
        }

        public void Test()
        {
            var input = new[] { "1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc" };
            Solve2(input);
           
        }

        void Solve(string[] input){
             var entries = ParseInput(input);

            int count = 0;
            foreach (var e in entries){
                var m = Regex.Matches(e.Password, e.Char.ToString());
                if (m.Count >= e.Min && m.Count <=e.Max){
                    Console.WriteLine($"Valid: {e.Min}-{e.Max} {e.Char}: {e.Password}");
                    count++;
                }
            }
            Console.WriteLine($"Total valid: {count}");

        }

        void Solve2(string[] input){
             var entries = ParseInput(input);
            int count = 0;
            foreach (var e in entries){
                if (e.Password[e.Min-1] == e.Char ^ e.Password[e.Max-1] == e.Char){
                    count++;
                }
            }
            Console.WriteLine($"Total valid: {count}");

        }

        private static Entry[] ParseInput(string[] input)
        {
            var entries = new Entry[input.Length];

            for (int i = 0; i < input.Length; i++)
            {
                var line = input[i];
                var match = Regex.Match(line, @"(\d+)-(\d+)\s(\w):\s(\w+)");
                var e = new Entry
                {
                    Min = Int32.Parse(match.Groups[1].Value),
                    Max = Int32.Parse(match.Groups[2].Value),
                    Char = match.Groups[3].Value[0],
                    Password = match.Groups[4].Value
                };
                entries[i] = e;
            }
            return entries;
        }
    }

    record Entry {
        public int Min;
        public int Max;
        public char Char;
        public string Password;

    }
}