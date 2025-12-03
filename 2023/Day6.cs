using System.Text.RegularExpressions;

namespace AOC2023;

public class Day6 : IDay
{
    string[] testdata = {
        "Time:      7  15   30",
        "Distance:  9  40  200"
    };

    public void Solve()
    {
        var input = new Input().ReadFile("./input6.txt");
        FindNumberOfWins(input);
    }

    public void Test()
    {

        FindNumberOfWins(testdata);
    }
    private static void FindNumberOfWins(string[] input)
    {
        var timesMatched = Regex.Matches(input[0].Replace(" ",""), @"(\d+)");
        var distancesMatched = Regex.Matches(input[1].Replace(" ",""), @"(\d+)");
        var times = timesMatched.Select(m => long.Parse(m.Value)).ToArray();
        var distances = distancesMatched.Select(m => long.Parse(m.Value)).ToArray();
        int wins = 0;
        int win = 0;

        for (int i = 0; i < times.Length; i++)
        {
            win = 0;
            var duration = times[i];
            var distance = distances[i];

            for (int speed = 0; speed < duration; speed++)
            {
                if (speed * (duration - speed) > distance) win++;
            }

            if (wins == 0)
                wins = win;
            else
                wins *= win;

            Console.WriteLine($"Wins: {win}");
        }
        Console.WriteLine($"Wins: {wins}");
    }
}