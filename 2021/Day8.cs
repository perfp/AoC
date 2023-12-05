class Day8 : IDay
{
    public void Solve()
    {
        var inputList = InputHelper.GetInput(8);
        //var inputList = GetInput();
        var sum = 0;
        foreach (var s in inputList)
        {
            var p = s.Split("|");
            var signal = p[0].Split(" ").Where(d => d != "").ToArray();
            var output = p[1].Split(" ").Where(d => d != "").ToArray();
            //Console.WriteLine($"output: {string.Join(',', output)}");
            //countUnique += output.Count(d => d.Length == 2 || d.Length == 3 || d.Length == 4 || d.Length == 7);
            string[] segments = new string[10];

            foreach (var sn in signal){
                if (sn.Length == 2) segments[1] = sn;
                if (sn.Length == 3) segments[7] = sn;
                if (sn.Length == 4) segments[4] = sn;
                if (sn.Length == 7) segments[8] = sn;                
            }
            foreach (var sn in signal.Where(x => x.Length == 5)){
                // 2 or 5 or 3
                if (!segments[1].All(x => sn.Contains(x)) && sn.Count(x => segments[4].Contains(x)) == 3) segments[5] = sn; 
                if (!segments[1].All(x => sn.Contains(x)) && sn.Count(x => segments[4].Contains(x)) == 2) segments[2] = sn; 
                if (segments[1].All(x => sn.Contains(x))) segments[3] = sn; 
            }
            foreach (var sn in signal.Where(x => x.Length == 6))
            {
                // 6 or 0 or 9
                if (segments[3].All(x => sn.Contains(x))) segments[9] = sn; 
                if (!segments[7].All(x => sn.Contains(x))) segments[6] = sn; 
                if (!segments[5].All(x => sn.Contains(x))) segments[0] = sn; 
            }
            //Console.WriteLine($"segments: {string.Join(',', segments)}");
            var result = 0;
            var e = 3;
            foreach (var o in output){
                var digit = -1;
                for (var i=0;i<10;i++){
                    if (o.All(x => segments[i].Contains(x)) && segments[i].All(x => o.Contains(x))){
                        digit = i;
                        break;
                    }   
                }
                Console.Write (digit);
                result += (int)Math.Pow(10, e) * digit;
                e--;
            }
            Console.WriteLine();
            //Console.WriteLine($"result {result}");
            sum += result;
        }

        Console.WriteLine($"Sum: {sum}") ;
    }


    
    Dictionary<int, string> CreateMap() {
        var map = new Dictionary<int, string>();
        map[0] = "abcefg";
        map[1] = "cf";
        map[2] = "acdeg";
        map[3] = "acdfg";
        map[4] = "bcdf";
        map[5] = "abdfg";
        map[6] = "abdefg";
        map[7] = "acf";
        map[8] = "abcdefg";
        map[9] = "abcdfg";
        return map;
    }

    string [] GetInput() => new []{
        "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
        "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
        "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg",
        "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
        "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea",
        "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb",
        "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe",
        "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef",
        "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb",
        "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce"
    };
}