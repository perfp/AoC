using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace AOC2020
{
    public class Day7 : IDay
    {
        public void Run()
        {
            Console.WriteLine("Running...");
            var input = this.ReadInput();
            Solve2(input);
        }

        public void Test()
        {
            Console.WriteLine("Testing,,,");
            var input = new[]{
                "light red bags contain 1 bright white bag, 2 muted yellow bags.",
                "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
                "bright white bags contain 1 shiny gold bag.",
                "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.",
                "shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
                "dark olive bags contain 3 faded blue bags, 4 dotted black bags.",
                "vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.",
                "faded blue bags contain no other bags.",
                "dotted black bags contain no other bags."
            };
            var input2 = new []{
                "shiny gold bags contain 2 dark red bags.",
                "dark red bags contain 2 dark orange bags.",
                "dark orange bags contain 2 dark yellow bags.",
                "dark yellow bags contain 2 dark green bags.",
                "dark green bags contain 2 dark blue bags.",
                "dark blue bags contain 2 dark violet bags.",
                "dark violet bags contain no other bags."
            };

            Solve2(input);
            Solve2(input2);


        }

        private void Solve2(string[] input)
        {
            Dictionary<string, Bag> bags = new Dictionary<string, Bag>();
            foreach (var i in input) Parse(i, bags);

            var children = CountChildren(bags, bags["shiny gold"]);
            Console.WriteLine($"Count: {children-1} ");

        }

        private int CountChildren(Dictionary<string, Bag> bags, Bag bag)
        {
            if (!bag.Contains.Any()) return 1;
            var childCount = 0;
            foreach (var c in bag.Contains){
                //Console.WriteLine($"{bag.Name} contains {c.Count} {c.Bag.Name}");
                childCount += c.Count * CountChildren(bags, c.Bag);
            }
            //Console.WriteLine($"{bag.Name} {childCount}");
            return childCount + 1;
        }

        private void Solve(string[] input)
        {
            var bags = new Dictionary<string, Bag>();
            foreach (var i in input)
            {
                Parse(i, bags);
            }
            var parents = new Dictionary<string, Bag>();
            Traverse(parents, bags, "shiny gold");
            foreach (var p in parents)
            {
                Console.WriteLine($"{p.Key}");
            }
            Console.WriteLine($"Antall: {parents.Count()}");
        }

        private void Traverse(Dictionary<string, Bag> parentBags, Dictionary<string, Bag> bags, string v)
        {
            Console.WriteLine($"Finding parents of {v}");
            var parents = bags.Values
                .Where(b => b.Contains.Any(bc => bc.Bag.Name == v))
                .ToList();
            parents.ForEach(b => 
                {
                    if (!parentBags.ContainsKey(b.Name))
                    {
                        parentBags.Add(b.Name, b);
                    }             
                    Traverse(parentBags, bags, b.Name);
                });   
        }

        private static void Parse(string test, Dictionary<string, Bag> bags)
        {
            var color = test.Substring(0, test.IndexOf(" bags contain"));
            if (!bags.ContainsKey(color))
            {
                bags.Add(color, new Bag{Name = color});
            }
            var contains = test.Substring(test.IndexOf(" bags contain ") + " bags contain ".Length);
            //Console.WriteLine(contains);
            var matches = Regex.Matches(contains, @"(\d+) ([\w\s]+) bags?");

            foreach (Match m in matches)
            {

                var count = m.Groups[1].Value;
                var col = m.Groups[2].Value;
                Bag childbag;
                if (bags.ContainsKey(col))
                {
                    childbag = bags[col];
                }
                else
                {
                    childbag = new Bag { Name = col };
                    bags[col] = childbag;
                }

                bags[color].Contains.Add(new BagContainer
                {
                    Count = Int32.Parse(count),
                    Bag = childbag
                });

                //Console.WriteLine($"{color}: {count} {col}");
            }
        }
    }

    public class Bag {
        public string Name {get;set;}
        public List<BagContainer> Contains {get;set;} = new List<BagContainer>();
        
    }
    public class BagContainer {
        public int Count {get;set;}
        public Bag Bag {get;set;}
    }
}