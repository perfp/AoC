using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace AOC2023;

public class Day3 : IDay
{

    string[] testdata = {
        "467..114..",
        "...*......",
        "..35..633.",
        "......#...",
        "617*......",
        ".....+.58.",
        "..592.....",
        "......755.",
        "...$.*....",
        ".664.598.."
    };

    public void Test()
    {
        Board board = GenerateBoard(testdata);

        FindValidParts(board);

        FindGears(board);

        FindAdjacentParts(board);

        Console.WriteLine($"Sum of PartNumbers: {board.Sum}");
        Console.WriteLine($"Sum of gear ratios: {board.SumRatio}");

    }

    private static void FindAdjacentParts(Board board)
    {
        foreach (var gear in board.Gears)
        {
            var adjacentParts = board.Parts.Where(p =>
                (p.Y >= gear.Y - 1 && p.Y <= gear.Y + 1) && // Adjacent row
                ((p.X >= gear.X - 1 && p.X <= gear.X + 1) || // First letter in range
                 (p.X + p.Length - 1 >= gear.X - 1 && p.X + p.Length - 1 <= gear.X + 1)) // Last letter in range
            ).ToList();
            if (adjacentParts.Count == 2)
            {
                gear.AdjacentParts.AddRange(adjacentParts.Select(p => p.PartNumber));
            }
        }
    }

    public void FindGears(Board board)
    {

        for (int y = 0; y < board.Data.Length; y++)
        {
            for (int x = 0; x < board.Data[0].Length; x++)
            {
                if (board.Data[y][x] == '*')
                {
                    var gear = new Gear
                    {
                        X = x,
                        Y = y
                    };
                    board.Gears.Add(gear);
                }
            }
        }
    }



    private static void FindValidParts(Board board)
    {
        foreach (var part in board.Parts)
        {
            int x = part.X;
            int y = part.Y;

            bool hasAdjacentSymbol = false;
            for (int ly = y - 1; ly <= y + 1; ly++)
            {
                for (int lx = x - 1; lx < x + part.PartNumber.Length + 1; lx++)
                {
                    if (!((ly < 0) ||
                        (ly >= board.Height) ||
                        (lx < 0) ||
                        (lx >= board.Width)))
                    {


                        char testchar = board.Data[ly][lx];
                        if (testchar != '.' && (testchar < '0' || testchar > '9'))
                        {
                            hasAdjacentSymbol = true;

                            Console.WriteLine($"Valid PartNumber: {part.PartNumber}");
                        }
                    }
                }
            }
            part.IsPartNumber = hasAdjacentSymbol;

        }
    }

    private Board GenerateBoard(string[] boarddata)
    {
        var board = new Board
        {
            Width = boarddata[0].Length,
            Height = boarddata.Length,
            Data = boarddata
        };

        int y = 0;
        foreach (var line in boarddata)
        {
            var matches = Regex.Matches(line, @"\d+");
            foreach (Match match in matches)
            {
                var part = new Part
                {
                    PartNumber = match.Value,
                    X = match.Index,
                    Y = y,
                    Length = match.Value.Length
                };
                board.Parts.Add(part);
            }
            y++;
        }

        return board;
    }

    public void Solve()
    {
        var input = new Input().ReadFile("./input3.txt");
        Board board = GenerateBoard(input);

        FindValidParts(board);
        FindGears(board);
        FindAdjacentParts(board);

        Console.WriteLine($"Sum of PartNumbers: {board.Sum}");
        Console.WriteLine($"Sum of gear ratios: {board.SumRatio}");
    }
}

public record Board
{
    public int Height;
    public int Width;
    public required string[] Data;

    public List<Part> Parts = new List<Part>();
    public List<Gear> Gears = new List<Gear>();
    public int Sum => Parts.Where(p => p.IsPartNumber).Sum(p => int.Parse(p.PartNumber));

    public int SumRatio => Gears.Sum(g => g.Ratio);
}

public record Part
{
    public required string PartNumber;
    public required int X;
    public required int Y;
    public required int Length;
    public bool IsPartNumber = false;
}

public record Gear
{
    public required int X;
    public required int Y;

    public List<string> AdjacentParts = new List<string>();

    public int Ratio => AdjacentParts.Count > 0 ? int.Parse(AdjacentParts[0]) * int.Parse(AdjacentParts[1]) : 0;
}



// .....part
// ....*.....
// part......
// ..part....

// gx 3..5
// px 5..8
// px 0..3
// px 3..6

// px < gx2 && px2 >gx1