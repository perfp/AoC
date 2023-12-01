using System.Diagnostics;

namespace AOC2023;
class Program
{
    static void Main(string[] args)
    {
        if (args.Length < 1)
        {
            Console.WriteLine("Du mangler dag!");
            return;
        }
        int dayNumber = 0;
        try
        {
            dayNumber = Int32.Parse(args[0]);
        }
        catch
        {
            Console.WriteLine("Ugyldig dag " + args[0]);
            return;
        }

        Type? type = Type.GetType($"AOC2023.Day{dayNumber}, 2023");
        if (type == null) throw new ArgumentNullException($"Implementation missing for day {dayNumber}");
        IDay day = (IDay)Activator.CreateInstance(type)!;
        Console.WriteLine("Starting");

        Stopwatch sw = Stopwatch.StartNew();
        if (args.Length > 1 && args[1] == "test")
        {
            day.Test();
        }
        else
        {
            day.Solve();
        }

        Console.WriteLine($"Done in {sw.ElapsedMilliseconds} ms");
    }
}
