public class Day3 {
    const string priorities = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public void Solve(){
        var input = InputHelper.GetInput(3);
        //CalclateSumOfPriorities(input);
        CalculateSumOfBadgePrioritoes(input);
    }

    public void Test(){
        var input = new string[]{
            "vJrwpWtwJgWrhcsFMMfFFhFp",
            "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
            "PmmdzqPrVvPwwTWBwg",
            "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
            "ttgJtRGJQctTZtZT",
            "CrZsJsPPZsGzwwsLwLmpwMDw"
        };

        //CalclateSumOfPriorities(input);
        CalculateSumOfBadgePrioritoes(input);
    }


    private void CalculateSumOfBadgePrioritoes(string []input){
        var sum = 0;
        var index = 0; 
        while (index < input.Length){
            var item = input[index]
                .Intersect(input[index+1])
                .Intersect(input[index+2])
                .ToArray()
                .First();

            var priority = priorities.IndexOf(item);
            sum += priority;
            Console.WriteLine($"{item}: {priority}");
            index += 3;
        }
        Console.WriteLine($"Sum: {sum}");
    }

    private void CalclateSumOfPriorities(string[] input)
    {
        
        var sum = 0;
        foreach (var s in input){
            Console.WriteLine($"{s} {s.Length} {s.Length / 2}");
            var c1 = s.Substring(0, s.Length / 2);
            var c2 = s.Substring(s.Length / 2 , s.Length / 2);

            Console.WriteLine($"{c1}\n{c2}");
            
            var result = c1.Intersect(c2).ToArray().First();
            Console.WriteLine($"{result}: {priorities.IndexOf(result)}");
            sum += priorities.IndexOf(result);
        }

        Console.WriteLine($"Sum: {sum}");
    }
}