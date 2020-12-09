using System;
using System.Collections.Generic;

namespace AOC2020{
    public class Day8 : IDay
    {
        public void Run()
        {
            var input = this.ReadInput();
            Solve2(input);
        }

        public void Test()
        {
            var input = new[]{
                "nop +0",
                "acc +1",
                "jmp +4",
                "acc +3",
                "jmp -3",
                "acc -99",
                "acc +1",
                "jmp -4",
                "acc +6"
            };

            Solve2(input);
        }

        private static void Solve2(string[] input)
         {
            
            int i =0;
            while (i<input.Length){
                var exit = 0;
                int ip = 0;
                var visited = new List<int>();
                int acc = 0;
                
                if (input[i].Contains("nop")){
                    input[i] = input[i].Replace("nop", "jmp");
                } else {
                    input[i] = input[i].Replace("jmp", "nop");
                }
                

                while (exit==0)
                {
                    if (ip >= input.Length || visited.Contains(ip))
                    {
                        //Console.WriteLine($"Done: {ip} {acc}");
                        exit = ip;
                        break;
                    }
                    
                    var next = input[ip].Split(" ");
                    var op = next[0];
                    var arg = Int32.Parse(next[1]);
                    visited.Add(ip);
                    //Console.WriteLine($"{ip}:{op} -> {arg}");

                    if (op == "jmp")
                    {
                        ip += arg;
                    }
                    else
                    {
                        ip++;
                    }

                    if (op == "acc")
                    {
                        acc += arg;
                    }
                }

                if (input[i].Contains("nop")){
                    input[i] = input[i].Replace("nop", "jmp");
                } else {
                    input[i] = input[i].Replace("jmp", "nop");
                }
                i++;
                if (exit >= input.Length) {
                    Console.WriteLine($"Done: {ip}:{acc}");
                    return;
                }
            }
        }

        private static void Solve(string[] input)
        {
            int ip = 0;
            var visited = new List<int>();
            int acc = 0;
            while (true)
            {

                if (visited.Contains(ip))
                {
                    Console.WriteLine($"Done: {ip} {acc}");
                    return;
                }
                var next = input[ip].Split(" ");
                var op = next[0];
                var arg = Int32.Parse(next[1]);
                visited.Add(ip);
                Console.WriteLine($"{ip}:{op} -> {arg}");

                if (op == "jmp")
                {
                    ip += arg;
                }
                else
                {
                    ip++;
                }

                if (op == "acc")
                {
                    acc += arg;
                }
            }
        }
    }
}
