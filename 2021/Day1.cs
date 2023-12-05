class Day1 : IDay{
    
    private int[] GetInput(bool test = true){
        var input = new []{199,200,208,210,200,207,240,269,260,263};
        
        if (test) return input;

       return  InputHelper.GetInputAsInt(1);
    }
    
    public void Solve()
    {
        var input = GetInput(false);
        var count = SolveSlidingWindows(input);
        Console.WriteLine($"Number of increases: {count}");
    }

    private static int SolveSlidingWindows(int[] input){
        int count = 0;
        
        int prev = input.Take(0..2).Sum();
        int i = 3;
        while (i < input.Length)
        {
            var currentWindow = input[(i-2)..i].Sum();
            if (prev < currentWindow)
                count++;
            prev = currentWindow;
            i++;
        }


        return count;
    }


    private static int SolveSingle(int[] input)
    {
        int count = 0;

        int prev = input[0];
        int i = 1;
        while (i < input.Length)
        {
            if (prev < input[i])
                count++;
            prev = input[i];
            i++;
        }

        return count;
    }
}