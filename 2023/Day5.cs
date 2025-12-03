using System.Security.Cryptography.X509Certificates;
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
        var input = new Input().ReadFile("./input5.txt");
         var garden = ParseGarden(input);

        FindLocations(garden);
    }

    public void Test()
    {
        var garden = ParseGarden(testdata);

        FindLocations(garden);

    }

    private static void FindLocations(Garden garden)
    {
        var minLocation = long.MaxValue;
        foreach (var seeds in garden.Seeds)
        {
            Console.WriteLine(seeds.Start);
            for (long seed = seeds.Start;seed<seeds.Start + seeds.Length;seed++){
                long soil = GetValue(garden, State.SeedToSoil, seed);
                var fertilizer = GetValue(garden, State.SoilToFertilizer, soil);
                var water = GetValue(garden, State.FertilizerToWater, fertilizer);
                var light = GetValue(garden, State.WaterToLight, water);
                var temperature = GetValue(garden, State.LightToTemperature, light);
                var humidity = GetValue(garden, State.TemperatureToHumidity, temperature);
                var location = GetValue(garden, State.HumidityToLocation, humidity);
                if (location < minLocation) minLocation = location;
            }
            //Console.WriteLine($"Seed {seed}: {soil} {fertilizer} {water} {light} {temperature} {humidity} {location}");
            
            
        }
        Console.WriteLine($"Min location: {minLocation}");
    }

    static long GetValue(Garden garden, State state, long value)
    {
        return garden.GardenMap[state].GetDestination(value);
    }

    private Garden ParseGarden(string[] input)
    {
        State state = State.None;
        var garden = new Garden();
        foreach (var line in input)
        {
            if (string.IsNullOrEmpty(line))
            {
                continue;
            }

            if (line.StartsWith("seeds"))
            {
                state = State.Seeds;
                var seedMatches = Regex.Matches(line, @"(\d+)");
                var seedNumbers = seedMatches.Select(m => long.Parse(m.Value)).ToArray();
                

                for(long i=0;i<seedNumbers.Length / 2; i++)
                {
                    long start = seedNumbers[i*2];
                    long length =seedNumbers[i*2+1];
                        garden.Seeds.Add(new Seed{Start = start, Length = length});
                    
                }
            }

            if (line.StartsWith("seed-to-soil"))
                state = State.SeedToSoil;

            if (line.StartsWith("soil-to-fertilizer"))
                state = State.SoilToFertilizer;

            if (line.StartsWith("fertilizer-to-water"))
                state = State.FertilizerToWater;

            if (line.StartsWith("water-to-light"))
                state = State.WaterToLight;

            if (line.StartsWith("light-to-temperature"))
                state = State.LightToTemperature;

            if (line.StartsWith("temperature-to-humidity"))
                state = State.TemperatureToHumidity;

            if (line.StartsWith("humidity-to-location"))
                state = State.HumidityToLocation;

            var matches = Regex.Matches(line, @"(\d+)");
            if (matches.Count == 3)
            {
                long destStart = long.Parse(matches[0].Value);
                long srcStart = long.Parse(matches[1].Value);
                long range = long.Parse(matches[2].Value);

                if (!garden.GardenMap.ContainsKey(state))
                {
                    garden.GardenMap.Add(state, new Map());
                }

                garden.GardenMap[state].MapItems.Add(new MapItem {
                        SourceStart = srcStart,
                        DestStart = destStart,
                        Length = range
                });
            }
        }

        return garden;
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
    public List<Seed> Seeds =new List<Seed>();
    public Dictionary<State, Map> GardenMap = new Dictionary<State, Map>();
    
}

public class Map {
    public State State;
    public List<MapItem> MapItems = new List<MapItem>();

    public long GetDestination(long source){
        long destination = source;
        foreach (var items in MapItems){
            if (items.InRange(source)){
                destination = source - items.SourceStart + items.DestStart;
            }
        }
        return destination;
    }
}

public class Seed {
    public long Start;
    public long Length;

    public bool InRange(long value) => value >= Start && value <= Start + Length;
}

public class MapItem {
    public long SourceStart;
    public long DestStart;
    public long Length;

    public bool InRange(long value) => value >=SourceStart && value <= SourceStart + Length - 1;
}