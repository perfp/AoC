
namespace AOC2023;

public class Input
{

    public string[] ReadFile(string filename)
    {
        return File.ReadAllLines(filename);
    }

    public int[] ReadFileAsInt(string filename)
    {
        return ReadFile(filename).Select(s => int.Parse(s)).ToArray();
    }

    public Span<int> ReadFileAsSpanInt(string filename)
    {
        return new Span<int>(ReadFileAsInt(filename));
    }
}
