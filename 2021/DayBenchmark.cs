using BenchmarkDotNet.Attributes;

public class DayBenchmark {
    [Benchmark]
    public void Solve(){
        var day = new Day2();
        day.Solve();
    }


    [Benchmark]
     public void SolveBetter(){
        var day = new Day2();
        day.SolveBetter();
    }

}