class Day3 : IDay
{
    string[] GetInput() => new []{"00100","11110","10110","10111","10101","01111","00111","11100","10000","11001","00010","01010"}; 
    ushort wordlen = 12;

    public void Solve(){
        var inputlist = GetInput();
        inputlist = InputHelper.GetInput(3);
        var input = inputlist.Select(l => Convert.ToUInt16(l, 2)).ToArray();

        int pos = wordlen - 1;
        ushort result = 0;
        while (pos >=0){
            int o =0;
            int z = 0;
            foreach (var s in input){
                if ((s>>pos & 0x1) == 1)
                    o++;
                else 
                    z++;
            }
            if (o>=z) 
                result |= (ushort)(1 << pos);
            pos--;
        }
        Console.WriteLine($"Result: {result} : {Convert.ToString(result, 2)}");
    }


    public void SolveSecond(){
        //var input = GetInput();
        var input = InputHelper.GetInput(3);
        var width = input[0].Length;
        var count = input.Length;
        var remaining = input.Select(x=>x).ToArray();
        

        for (int c=0;c<width;c++){
            Console.WriteLine($"Remaining: {string.Join('.', remaining)}");
            var c1 = remaining.Count(s => s[c] == '1');
            var filter = (c1 >= remaining.Length / 2.0) ? '1': '0';
            remaining = remaining.Where(s => s[c] == filter).ToArray();
            if (remaining.Length == 1) break;
        }

        var remainingC02 = input.Select(x=>x).ToArray();
         for (int c=0;c<width;c++){
            Console.WriteLine($"RemainingCO2: {string.Join('.', remainingC02)}");
            var c1 = remainingC02.Count(s => s[c] == '0');
            var filter = (c1 <= remainingC02.Length / 2.0) ? '0': '1';
            remainingC02 = remainingC02.Where(s => s[c] == filter).ToArray();
            if (remainingC02.Length == 1) break;
        }

        var O2 = Convert.ToInt32(remaining[0], 2);
        var CO2 = Convert.ToInt32(remainingC02[0], 2);
        Console.WriteLine($"Last: {O2} {CO2} {O2*CO2}");
    }

    public void SolveFirst()
    {
        //var input = GetInput();
        var input = InputHelper.GetInput(3);
        var width = input[0].Length;
        var zcount = new int[width];
        var onecount = new int[width];
        foreach (var s in input){
            for (int i=0;i<width;i++){
                if (s[i] - '0' == 1) {onecount[i]++;} else {zcount[i]++;}
            }
        }
        var zstring = string.Join(",", zcount.Select(z => z.ToString()));
        var ostring = string.Join(",", onecount.Select(z => z.ToString()));
        Console.WriteLine($"0Count: {zstring} 1Count: {ostring}");

        int gamma = 0;
        int epsilon = 0;
        for (int c=0;c<width;c++){
            var gammabit = (zcount[c] < onecount[c]) ? 1 : 0;
            var epsilonbit = (zcount[c] < onecount[c]) ? 0 : 1;
            gamma |= (gammabit << width-1-c);
            epsilon |= (epsilonbit << width-1-c);
            
        }
        

        Console.WriteLine($"Gamma: {gamma} Epsilon: {epsilon} Sum: {epsilon*gamma}");
    }
}