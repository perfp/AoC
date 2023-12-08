
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
namespace AOC2023;

public class Day4 : IDay
{

    string []testdata = {
        "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53", //4 8
        "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19", //2 2
        "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1", //2 2
        "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83", //1 1
        "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36", //1 1
        "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11" //0 0

    };

    // Implement IDay interface methods here
    public void Solve()
    {
        string[] input = new Input().ReadFile("./input4.txt");
       var cards = CalculateCardScore(input);
       CountCards(cards);
    }

    public void Test()
    {
        var cards = CalculateCardScore(testdata);
        CountCards(cards);
    }

    private static void CountCards(List<Card> cards)
    {
        var map = new Dictionary<int, int>();
        foreach (var c in cards)
        {
            map[c.Number] = 1;
        }
        bool cardsAdded = true;
        while (cardsAdded)
        {
            cardsAdded = false;
            foreach (var c in cards)
            {
                if (c.Score > 0)
                {
                    for (int n = 0; n < map[c.Number]; n++)
                    {
                        for (int i = c.Number + 1; i <= c.Number + c.CountWinningNumbers; i++)
                        {
                            map[i]++;
                        }
                    }

                }
                else
                {
                    //   Console.WriteLine($"No cards for {c.Number}");
                }
            }
            Console.WriteLine($"Total number of cards: {map.Sum(kv => kv.Value)}");
        }
    }

    private List<Card> CalculateCardScore(string[] input)
    {
        var cards = new List<Card>();
        foreach (var line in input)
        {
            var match = Regex.Match(line, @"Card\s+(\d+): ([ \d+]+)\|([ \d+]+)");
            var card = new Card
            {
                Number = int.Parse(match.Groups[1].Value)
            };
            card.WinningNumbers = match.Groups[2].Value.Trim().Split(" ").Where(s => !string.IsNullOrEmpty(s)).Select(s => int.Parse(s)).ToList();
            card.MyNumbers = match.Groups[3].Value.Trim().Split(" ").Where(s => !string.IsNullOrEmpty(s)).Select(s => int.Parse(s)).ToList();
            cards.Add(card);
        }
        Console.WriteLine($"Sum: {cards.Sum(c => c.Score)}");
        return cards;
        
    }
}

public record Card {
    public required int Number;
    public List<int> WinningNumbers = new List<int>();
    public List<int> MyNumbers = new List<int>();

    public int CountWinningNumbers => MyNumbers.Intersect(WinningNumbers).Count();
    public int Score => CountWinningNumbers switch {
        <= 1 => CountWinningNumbers,
        >1 => 1 << CountWinningNumbers-1
    };

}
