public class Day01
{
    public void Solve()
    {
        var input = InputHelper.GetInput(1);
        CalculateMaxCalories(input);

    }

    public void Test()
    {
        var input = new string[]{
            "1000",
            "2000",
            "3000",
            "",
            "4000",
            "",
            "5000",
            "6000",
            "",
            "7000",
            "8000",
            "9000",
            "",
            "10000"
        };

        CalculateMaxCalories(input);

    }

    private void CalculateMaxCalories(string[] input)
    {
        var elves = new List<int>();
        int elf = 0;
        foreach (string s in input){
            
            if  (!string.IsNullOrEmpty(s)){
                elf += int.Parse(s);
            } else {
                elves.Add(elf);
                elf = 0;
            }
        }
        elves.Add(elf);
        Console.WriteLine(elves.Max());
        Console.WriteLine(elves.OrderByDescending(e => e).Take(3).Sum());
    }
}