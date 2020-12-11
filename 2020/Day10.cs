using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AOC2020
{
    public class Day10 : IDay
    {
        private int[] input;
        private int count; 

        public void Run()
        {
            var input = this.ReadInput();
            Solve2(input);
        }

        public void Test()
        {
            var simpleInput = new[]{"16","10","15","5","1","11","7","19","6","12","4"};
            var input = new[] { "28", "33", "18", "42", "31", "14", "46", "20", "48", "47", "24", "23", "49", "45", "19", "38", "39", "11", "1", "32", "25", "35", "8", "17", "7", "9", "4", "2", "34", "10", "3" };
            Solve2(simpleInput);
            Solve2(input);
        }

        private void Solve2(string []input){
            count = 0;
            var inputList = new List<int>();
            inputList.Add(0);
            var intInput = input.Select(s => int.Parse(s)).OrderBy(s => s).ToArray();
            inputList.AddRange(intInput);
            inputList.Add(intInput.Last()+3);
            

            
            Console.WriteLine(string.Join(",", inputList));
            this.input = inputList.ToArray();
            CountPaths(0);
            //if (intInput[1] <= 3) CountPaths(1);
            //if (intInput[2] <= 3) CountPaths(2); 
            Console.WriteLine($"Paths found: {count}");

        }
        int [] counter = new []{1,2,3};

        private void CountPaths(int start) {
            var me = input[start];
            
            //Console.Write($"{string.Join(",", input.Take(start))},{me},");

            if (start == input.Length-1){
                this.count++;
            }
            Parallel.ForEach(counter, c => {
            //foreach (var c in counter){
                if (input.Length - 1 >= start + c && input[start+c] <= me+3)
                {
                    CountPaths(start+c);
                }
            }
            );
        }


        private static void Solve(string[] input)
        {
            var intInput = input.Select(s => int.Parse(s)).OrderBy(s => s).ToArray();
            intInput = intInput.Append(intInput.Last() + 3).ToArray();
            int prev = 0;
            int count1 = 0;
            int count3 = 0;
            foreach (var i in intInput)
            {
                if (i - prev == 1) count1++;
                if (i - prev == 3) count3++;
                prev = i;
            }
            Console.WriteLine($"1: {count1} 3: {count3} Result: {count1 * count3}");
        }
    }
}