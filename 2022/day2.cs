public class Day2 {

    public void Test(){
            var input = new string[]{
                "A Y",
                "B X",
                "C Z"
            };

        CalculateScore(input);
    }

    public void Solve(){
        var input = InputHelper.GetInput(2);
        CalculateScore(input);
    }

    private void CalculateScore(string[] input)
    {
        int score = 0;
        foreach (var s in input){
            var game = s.Split(" ");
            var opponent = game[0];
            var result = game[1];

            var result_val = (result[0]-'X') * 3;
            var opp_val = opponent[0] - 'A' + 1;
            var me_val = GetMyMove( result_val, opp_val );
            Console.WriteLine($"{result_val} + {me_val}");
            score += result_val + me_val;
        }
        Console.WriteLine($"Result: {score}");

    }

    private int  GetMyMove(int result, int opponent){
        if (result == 3) return opponent;
        
        if (result == 6){
            return (opponent < 3) ? opponent + 1 : 1; 
        }
        return (opponent>1) ? opponent -1 : 3;
    }
    private int Play(int o, int me)
    {
        if (o == me) return 3;
        if (o == 3 && me == 1) return 6;
        if (o == 1 && me == 3) return 0;
        return (o < me) ? 6 : 0;
    }
}