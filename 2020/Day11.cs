using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;

namespace AOC2020 {
    public class Day11 : IDay
    {
        public void Run()
        {
            var input = this.ReadInput();
            Solve(input);
        }

        public void Test()
        {
            var input = new[] {
                "L.LL.LL.LL",
                "LLLLLLL.LL",
                "L.L.L..L..",
                "LLLL.LL.LL",
                "L.LL.LL.LL",
                "L.LLLLL.LL",
                "..L.L.....",
                "LLLLLLLLLL",
                "L.LLLLLL.L",
                "L.LLLLL.LL"
            };

            Solve(input);
        }

        private static void Solve(string[] input)
        {
            var output = new string[input.Length];
            Array.Copy(input, output, input.Length);

            int count = 0;
           while(true)
            {
                for (int r = 0; r < input.Length; r++)
                {
                    for (int c = 0; c < input[r].Length; c++)
                    {
                        var s = input[r][c];
                        //Console.WriteLine($"{r}{c}{s}");
                        var ajacent = FindAjacent(input, r, c);
                        if (s == 'L')
                        {
                            // Empty
                            if (!ajacent.Contains('#'))
                            {
                                var newRow = output[r].ToCharArray();
                                newRow[c] = '#';
                                output[r] = new string(newRow);
                            }
                        }
                        if (s == '.')
                        {
                            // Flooor
                        }
                        if (s == '#')
                        {
                            // Occupied
                            if (ajacent.Count(c => c == '#') >= 4)
                            {
                                var newRow = output[r].ToCharArray();
                                newRow[c] = 'L';
                                output[r] = new string(newRow);
                            }

                        }
                    }
                }
                //for (int r=0;r<output.Length;r++){
                //    Console.WriteLine($"{input[r]} {output[r]}");
                //}
                var done = (string.Join("", input) == string.Join("", output));

                //Console.WriteLine($"Done: {done}\n");
                if (done) break;
                Array.Copy(output, input, input.Length);
                count++;
            }
            Console.WriteLine($"Count: {count}");
            for (int r=0;r<output.Length;r++){
                Console.WriteLine(output[r]);
            }
            Console.WriteLine($"Occupied: {output.Sum(r => r.Count(c => c == '#'))}");
        }

        private static string FindVisible (string [] input , int r, int c){
            
            return "";
        }
        private static string FindAjacent(string[] input, int r, int c)
        {
            var ajacent = new List<char>();

            for (int y = r - 1; y <= r + 1; y++)
            {
                for (int x = c - 1; x <= c + 1; x++)
                {
                    if (!(x == c && y == r)){
                        if ( y >= 0 && y < input.Length)
                        {
                            if ( x >= 0 && x < input[y].Length)
                            {
                                //Console.WriteLine($"{y}{x}");
                                ajacent.Add(input[y][x]);
                            
                            }

                        }
                    }
                }
            }
            var result = string.Join("", ajacent);
            //Console.WriteLine(result);
            return result;
        }

        public struct Pos {
            public int x;
            public int y;

            public void Add(){
                x++;
                y++;
            }
        }
    }
}