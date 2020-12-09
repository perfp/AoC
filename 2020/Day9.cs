using System;
using System.Collections.Generic;
using System.Linq;

namespace AOC2020
{
    public class Day9 : IDay
    {
        public void Run()
        {
           var input = this.ReadInput().Select(s => long.Parse(s)).ToArray();
           var invalid = Solve(input, 25 );
           FindSum(input, invalid);
        }

        public void Test()
        {
            var input = new[] { "5", "20", "15", "25", "47", "40", "62", "55", "65", "95", "102", "117", "150", "182", "127", "219", "299", "277", "309", "576" };
            var intInput = input.Select(s => long.Parse(s)).ToArray();
            var preamble = 5;

            var invalid = Solve(intInput, preamble);
            FindSum(intInput, invalid);
        }

        private void FindSum(long[] intInput, long invalid)
        {
            int start = 0;
            while (start < intInput.Length){
                //Console.WriteLine($"Start: {start}");
                long sum = 0;
                var from = start++;
                long min = long.MaxValue;
                long max = 0;
                for (int to=from;to<intInput.Length - from; to++){
                    long currentValue = intInput[to];
                    sum += currentValue;
                    if (currentValue < min) min = currentValue;
                    if (currentValue > max) max = currentValue;
                    //Console.WriteLine($"{currentValue} : {sum}");                    
                    if (sum > invalid) break;
                    if (sum == invalid){
                        Console.WriteLine($"Found: {min}+{max} Sum={min+max}");
                        return;
                    }
                }
            }
        }

        private static long Solve(long[] intInput, int preamble)
        {
            int current = 0;
            while (current < intInput.Length)
            {
                //Console.WriteLine($"Current: {current}");
                if (current >= preamble)
                {

                    var consider = intInput.Skip(current - preamble).Take(preamble).ToArray();
                    //Console.WriteLine($"Consider: {string.Join(",", consider)}");
                    var target = intInput[current];
                    bool valid = false;
                    for (var i = 0; i < preamble; i++)
                    {
                        if (consider.Contains(target - consider[i]))
                        {
                            valid = true;
                        }
                    }
                    if (!valid)
                    {
                        Console.WriteLine($"Invalid: {target}");
                        return target;
                    }
                }
                current++;
            }
            return 0;
        }
    }

}