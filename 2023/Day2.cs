using System.Collections;
using System.Diagnostics.Contracts;
using System.Text.RegularExpressions;
using Microsoft.VisualBasic;

namespace AOC2023;

public class Day2 : IDay
{
    string[] testdata = {
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
        "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
    };

    public void Solve()
    {
        var input = new Input().ReadFile("./input2.txt");
         List<Game> games = GenerateGames(input);
        foreach (var game in games){
            Console.Write ($"Game {game.Number}: ");
            //Console.Write($"Red: {game.SumRed} Green: {game.SumGreen} Blue: {game.SumBlue}");
            //bool possible = game.SumRed <= 12 && game.SumGreen <= 13 && game.SumBlue <=14;
            //Console.WriteLine($" Possible: {possible}");

            
            List<string> draws = new List<string>();
            foreach (var lap in game.Laps){
                List<string> colors = new List<string>();
                foreach (var draw in lap.Draws){
                    if (draw.Red > 0) colors.Add($"{draw.Red} red");
                    if (draw.Green > 0) colors.Add($"{draw.Green} green");
                    if (draw.Blue > 0) colors.Add($"{draw.Blue} blue");
                }
                draws.Add(string.Join(", ", colors));
            }
            
            if (draws.Count > 0)
                Console.WriteLine(string.Join("; ", draws));
        }
        int sumid = CalculateSum(games);

        Console.WriteLine($"Sum of IDs: {sumid}");
        Console.WriteLine($"Sum of Powers: {games.Sum(g => g.Power)}");
    }

    public void Test()
    {
        List<Game> games = GenerateGames(testdata);

        int sumid = CalculateSum(games);

        Console.WriteLine($"Sum of IDs: {sumid}");

        foreach (var game in games){
            Console.WriteLine($"Game {game.Number}: Power {game.Power}");
            foreach (var lap in game.Laps){
                Console.WriteLine($"R{lap.MinRed} G{lap.MinGreen} B{lap.MinBlue}");
            }
        }
        Console.WriteLine($"Sum of Powers: {games.Sum(g => g.Power)}");
    }

    private static int CalculateSum(List<Game> games)
    {
        var possibleGames = games.Where(g => g.Possible);
        var sumid = possibleGames.Sum(g => g.Number);
        return sumid;
    }

    private List<Game> GenerateGames(string[] testdata)
    {
        var games = new List<Game>();

        foreach (var line in testdata)
        {
            var gameparts = line.Split(":");
            var gameno = Regex.Match(gameparts[0], @"Game (\d+)").Groups[1].Value;
            var game = new Game
            {
                Number = int.Parse(gameno)
            };
            games.Add(game);

            var laps = gameparts[1].Split(";");
            foreach (var lap in laps)
            {
                var newlap = new Lap();
                var matches = Regex.Matches(lap, @"(\d+) (\w+)");
                
                foreach (Match m in matches)
                {
                    int red = 0, green = 0, blue = 0;
                    int colorcount = int.Parse(m.Groups[1].Value);
                    
                    switch (m.Groups[2].Value)
                    {
                        case "red":
                            red = colorcount;
                            break;
                        case "blue":
                            blue = colorcount;
                            break;
                        case "green":
                            green = colorcount;
                            break;
                    }
                    var draw = new Draw{
                        Red = red,
                        Green = green,
                        Blue = blue
                    };
                    newlap.Draws.Add(draw);

                }

                
                game.Laps.Add(newlap);

            }
        }

        return games;
    }
}

public record Game
{
    public required int Number;
    public List<Lap> Laps = new List<Lap>();
    public bool Possible => Laps.All(l => l.Possible);

    public int SumRed => Laps.Sum(l => l.SumRed);
    public int SumGreen => Laps.Sum(l => l.SumGreen);
    public int SumBlue => Laps.Sum(l => l.SumBlue);

     public int MinRed => Laps.Max(l => l.MinRed);
     public int MinGreen => Laps.Max(l => l.MinGreen);
     public int MinBlue => Laps.Max(l => l.MinBlue);
     public int Power => MinRed * MinGreen *  MinBlue;
}

public record Lap {
    public List<Draw> Draws = new List<Draw>();
    public bool Possible => SumRed <= 12 && SumGreen <= 13 && SumBlue <=14;
     public int SumRed => Draws.Sum(l => l.Red);
    public int SumGreen => Draws.Sum(l => l.Green);
    public int SumBlue => Draws.Sum(l => l.Blue);

    public int MinRed => Draws.Max(d => d.Red);
    public int MinGreen => Draws.Max(d => d.Green);
    public int MinBlue => Draws.Max(d => d.Blue);

   
}

public record Draw
{
    public required int Red;
    public required int Green;
    public required int Blue;
}
