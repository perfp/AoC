namespace AOC2023;

public class Day1 : IDay
{
    string[] testinput = {
        "1abc2",
        "pqr3stu8vwx",
        "a1b2c3d4e5f",
        "treb7uchet"
    };
    string[] testinput2 = {
        "two1nine",
        "eightwothree",
        "abcone2threexyz",
        "xtwone3four",
        "4nineeightseven2",
        "zoneight234",
        "7pqrstsixteen"
    };
    string[] testinput3 = {"3jrjkxvhctzmkmqccrmbrvlcvsjnqjjb"};

    char[] digits = {'1', '2', '3', '4', '5', '6', '7', '8', '9'};
    List<string> stringDigits = new List<string>{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};

    public void Solve()
    {
        var input = new Input();
        var calibrationData = input.ReadFile("input1.txt");
        CalcluateCalibrationSum2(calibrationData);
    }

    public void Test()
    {
        CalcluateCalibrationSum2(testinput3);

    }

    private void CalcluateCalibrationSum2(string[] input){
         int total = 0;
        foreach (string line in input)
        {
            var firstIndex = line.Length;
            var firstDigit = '*';

            for (int digit = 0;digit < 9; digit++){
                // Check words
                var index = line.IndexOf(stringDigits[digit]);
                if (index != -1 && index < firstIndex){
                    firstIndex = index;
                    firstDigit = digits[digit];                    
                }

                // Check numbers
                index = line.IndexOf(digits[digit]);
                if (index != -1 && index < firstIndex){
                    firstIndex = index;
                    firstDigit = digits[digit];                    
                };
            }

            var lastIndex = -1;
            var lastDigit = '*';
            for (int digit = 0;digit < 9; digit++){
                // Check words
                var index = line.LastIndexOf(stringDigits[digit]);
                if (index != -1 && index > lastIndex){
                    lastIndex = index;
                    lastDigit = digits[digit];
                }

                // Check numbers

                index = line.LastIndexOf(digits[digit]);
                if (index != -1 && index > lastIndex){
                    lastIndex = index;
                    lastDigit = digits[digit];
                }
            }
            
            int lineSum = Int32.Parse(firstDigit.ToString() + lastDigit.ToString());
            Console.WriteLine($"Line `{line}` : {lineSum}");
            total += lineSum;
        }

        Console.WriteLine($"Total : {total}");

    }


    private void CalcluateCalibrationSum(string[] input)
    {
        int total = 0;
        foreach (string line in input)
        {
            int firstIndex = line.IndexOfAny(digits);
            char firstDigit = firstIndex > -1 ? line[firstIndex] : '*';
            int digitIndex = 0;
            int index = 0;
            foreach (var digit in stringDigits){
                index = line.IndexOf(digit);                                
                if (firstIndex == -1 && index > -1) {
                    firstDigit = digits[index];
                    firstIndex = index;
                }
                if (index != -1 && index < firstIndex) {
                    firstDigit = digits[digitIndex];
                    firstIndex = index;
                }
                digitIndex++;
            }
                        
            char lastDigit = '*';
            int lastIndex = line.LastIndexOfAny(digits);
            if (lastIndex < 0){
                lastIndex = 0;
            } else {
                lastDigit = line[lastIndex];
            }
            

            digitIndex = 0;
            index = line.Length - 1;
            foreach (var digit in stringDigits){
                index = line.IndexOf(digit, lastIndex);
                if (index >= lastIndex) {
                    lastDigit = digits[digitIndex];
                    lastIndex  = index;
                }
                digitIndex++;
            }


            int lineSum = Int32.Parse(firstDigit.ToString() + lastDigit.ToString());
            Console.WriteLine($"Line `{line}` : {lineSum}");
            total += lineSum;
        }

        Console.WriteLine($"Total : {total}");
    }
}