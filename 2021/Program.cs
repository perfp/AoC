// https://devblogs.microsoft.com/dotnet/announcing-net-5-0/ 
// https://devblogs.microsoft.com/dotnet/c-9-0-on-the-record/ 

// https://devblogs.microsoft.com/dotnet/announcing-net-6/
// https://devblogs.microsoft.com/dotnet/welcome-to-csharp-10/ 
using BenchmarkDotNet.Running;

if (args[0] == "-b"){
    BenchmarkRunner.Run(typeof(Program).Assembly);
} else {
    var day = args[0];
    Console.WriteLine($"Solving day {day}");

    var handle = Activator.CreateInstance("2021", $"Day{day}");
    if (handle == null) throw new ArgumentException($"Day{day} cannot be activated");
    IDay daySolver = (IDay)handle.Unwrap()!;
    daySolver.Solve();
}
public interface IDay {
    public void Solve();
}

