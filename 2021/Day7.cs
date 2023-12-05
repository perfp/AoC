class Day7 : IDay
{
    public void Solve()
    {
        var inputList = GetInput()[0].Split(",").Select(s => Int32.Parse(s)).ToArray();
        var max = inputList.Max();
        var min = inputList.Min();
        int[]fuel = new int[max-min+1];
        foreach (int i in Enumerable.Range(min, max-min+1)){
            var sum = inputList.Select(v => {
                var fuel = 0;
                var steps = Math.Abs(v - i);
                    for (int c=1;c<=steps;c++){
                        fuel += c;
                    }
                return fuel;
            }).Sum();

            fuel[i] = sum;
        }
        Console.WriteLine($"Min fuel: {fuel.Min()}");
    }

    string[] GetInput() => new[]{"16,1,2,0,4,2,7,1,2,14"};

}