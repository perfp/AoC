using System;
using System.Diagnostics;

namespace AOC2020
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length < 1){
                Console.WriteLine("Du mangler dag!");
                return;
            }
            int dayNumber = 0;
            try {
                dayNumber = Int32.Parse(args[0]);
            } catch {
                Console.WriteLine("Ugyldig dag " + args[0] );
                return;
            }

            IDay day = (IDay)Activator.CreateInstance(Type.GetType($"AOC2020.Day{dayNumber}, 2020"));
            Console.WriteLine("Starting");
            
            Stopwatch sw = Stopwatch.StartNew();
            if (args.Length > 1 && args[1] == "test"){
                day.Test();
            } else {
                day.Run();
            }

            Console.WriteLine($"Done in {sw.ElapsedMilliseconds} ms");
        }
    }
}
