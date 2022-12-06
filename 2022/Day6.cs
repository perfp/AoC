namespace AOC2022
{
    public class Day6 : IDay
    {
        public void Solve()
        {
            var input = new Input().ReadFile("input6.txt");
            FindSolution(input[0]);
        }

        public void Test()
        {
            var input = new string[]{
                "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
                "bvwbjplbgvbhsrlpgdmjqwftvncz",
                "nppdvjthqldpwncqszvftbrmjlhg",
                "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
                "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"
            };
            foreach( var s in input) {
                FindSolution(s);
                };
        }


        void FindSolution(string input){
            var span = input.AsSpan();
            for (int i=13;i<input.Length;i++){                
                var slice = span.Slice(i-13, 14);
                Console.WriteLine(slice.ToString());
                if (slice.ToArray().Distinct().Count() == slice.Length){
                    Console.WriteLine($" unique. index = {i+1}");
                    return;
                }
            }
        }
    }
}