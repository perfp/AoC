using System.Text.RegularExpressions;

namespace AOC2023;

public class Day5 : IDay {

    string[] testdata = {
        "seeds: 79 14 55 13",
        "",
        "seed-to-soil map:",
        "50 98 2",
        "52 50 48",
        "",
        "soil-to-fertilizer map:",
        "0 15 37",
        "37 52 2",
        "39 0 15",
        "",
        "fertilizer-to-water map:",
        "49 53 8",
        "0 11 42",
        "42 0 7",
        "57 7 4",
        "",
        "water-to-light map:",
        "88 18 7",
        "18 25 70",
        "",
        "light-to-temperature map:",
        "45 77 23",
        "81 45 19",
        "68 64 13",
        "",
        "temperature-to-humidity map:",
        "0 69 1",
        "1 0 69",
        "",
        "humidity-to-location map:",
        "60 56 37",
        "56 93 4"
    };

    public void Solve()
    {
        throw new NotImplementedException();
    }

    public void Test()
    {
        var garden = new Garden();
        State state = State.None;

        foreach (var line in testdata){
            if (string.IsNullOrEmpty(line)){
                continue;
            }

            if (line.StartsWith("seeds")){
                state = State.Seeds;
                var match = Regex.Match(line, @"seeds: [(\d+)\s]+");
                foreach (Group seed in match.Groups){
                    garden.Seeds.Add(seed.Value);
                }
            }



        }   
    }
}

public enum State {
    None,
    Seeds,
    SeedToSoil,
    SoilToFertilizer,
    FertilizerToWater,
    WaterToLight,
    LightToTemperature,
    TemperatureToHumidity,
    HumidityToLocation
}

public record Garden {
    public List<string> Seeds =new List<string>();
}