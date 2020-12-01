using System;
using System.Diagnostics;

namespace AOC2020
{
    class Program
    {
        static void Main(string[] args)
        {
            Stopwatch sw = Stopwatch.StartNew();
            
            Console.WriteLine("Starting");
            IDay day = new Day1();
            if (args.Length > 0 && args[0] == "test"){
                day.Test();
            } else {
                day.Run();
            }

            Console.WriteLine($"Done in {sw.ElapsedMilliseconds} ms");
        }
    }
}
