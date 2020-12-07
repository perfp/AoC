using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AOC2020 {
    public class Day6 : IDay
    {
        public void Run()
        {
            var input = this.ReadInput();
            Solve(input);
        }

        public void Test()
        {
            var input = new[] { "abc", "", "a", "b", "c", "", "ab", "ac", "", "a", "a", "a", "a", "", "b" };
            Solve(input);
        }

        private static void Solve(string[] input)
        {
            var groups = new List<KV>();
            var group = new KV();
            int groupcount = 0;
            int total = 0;
            int groupsum = 0;

            foreach (var i in input)
            {

                if (i == "")
                {
                    groups.Add(group);
                    groupsum = group.Where(g => g.Value == groupcount).Sum(k => 1);
                    //Console.WriteLine($"Group count {groupcount} sum {groupsum}");
                    total += groupsum;
                    //Console.WriteLine($"Group complete: {group}");                    
                    group = new KV();
                    
                    groupcount = 0;
                    
                } else {

                    //Console.WriteLine($"Line input: {i}");

                    foreach (var c in i)
                    {
                        if (group.ContainsKey(c))                        
                            group[c] = group[c] + 1;                        
                        else
                            group[c] = 1;
                    }
                    groupcount++;
                }
            }
            groups.Add(group);
            groupsum = group.Where(g => g.Value == groupcount).Sum(k => 1);
            //Console.WriteLine($"Group sum {groupsum}");
            total += groupsum;

            var sum = groups.Sum(kv =>
            {
                //Console.WriteLine($"Group sum: {kv.Count()}");
                return kv.Count();
            });
            Console.WriteLine($"Sum is {sum}");
            Console.WriteLine($"Total is {total}");
        }
    }


    public class KV :  Dictionary<char, int> {

        public override string ToString()
        {
            var sb = new StringBuilder();
            foreach (var kv in this){
                sb.Append($"{kv.Key}:{kv.Value},");
            }
            return sb.ToString();
        }
    }
}