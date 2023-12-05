using System.Text.RegularExpressions;

public class Day4 : IDay
{

    private string[] input = new string[]{
        "2-4,6-8",
        "2-3,4-5",
        "5-7,7-9",
        "2-8,3-7",
        "6-6,4-6",
        "2-6,4-8"
    };

    public void Test()
    {
        FindOverlappingWork(input);
    }

    public void Solve()
    {
        var input = InputHelper.GetInput(4);
         FindOverlappingWork(input);
    }

    private void FindOverlappingWork(string[] input){
        // Expand arrays
        int fullyContained = 0;
        foreach (var pair in input)
        {
            var elves = pair.Split(",");
            // Create array 
            var elf1 = CreateArray(elves[0]);
            var elf2 = CreateArray(elves[1]);
            

            if (elf1.Intersect(elf2).Count() > 0){
                Console.WriteLine($"{elves[1]}  contaned in {elves[0]}");
                fullyContained++;
            }
            else 
            if (elf2.Intersect(elf1).Count() > 0){
                Console.WriteLine($"{elves[0]}  contaned in {elves[1]}");
                fullyContained++;
            }
            Console.WriteLine();
        }
        Console.WriteLine($"Fully contained: {fullyContained}");
    }

    private static int[] CreateArray(string elf)
    {
        Console.Write($"{elf}: ");
        var match = Regex.Match(elf, @"(\d+)-(\d+)");
        int start = Int32.Parse(match.Groups[1].Value);
        int end = int.Parse(match.Groups[2].Value);
        int count = end-start+1;

        var elfwork = Enumerable.Range(start, count)
            .ToArray();

        Console.WriteLine(string.Join(",", elfwork));
        return elfwork;
    }
}