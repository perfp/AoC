
class Day4 : IDay
{
    public void Solve()
    {
        var boards = GetBoards(GetInput()[2..]);
        bool done = false;
        int sumUnmarked = 0;
        int lastValue = 0;
        foreach (var val in GetNumbers()){
            Console.WriteLine($"Numnber drawn: {val}");
            foreach (var b in boards.Where(b => b.StillInPlay)){  
                done = b.Play(val);
                b.PrintBoard();
                if (done){
                    Console.WriteLine("Bingo! Bingo! Bingo! Bingo! Bingo! Bingo! Bingo! Bingo! Bingo! Bingo! ");
                    sumUnmarked = b.SumUnmarked();
                    lastValue = Int32.Parse(val);
                }
                //Thread.Sleep(600);       
            }

            if (done)
                if (boards.Any(b => b.StillInPlay)) {
                    done = false;
                } else 
                {
                    break;
                }
        }
        Console.WriteLine($"Result: {sumUnmarked}x{lastValue}={sumUnmarked*lastValue}");
    }

    IList<Board> GetBoards(string[] boardInput){
        var boards = new List<Board>();
        int pos = 0;
        while (pos<=boardInput.Length){
            boards.Add(new Board(boardInput[pos..(pos+5)]));
            pos +=6;
        }
        return boards;
    }

    string[] GetNumbers(){
        return GetInput()[0].Split(",");
    }

    string[] GetInput(){
        return InputHelper.GetInput(4);
        /*
        return new []{
            "7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1",
            "",
            "22 13 17 11  0",
            "8  2 23  4 24",
            "21  9 14 16  7",
            "6 10  3 18  5",
            "1 12 20 15 19",
            "",
            "3 15  0  2 22",
            "9 18 13 17  5",
            "19  8  7 25 23",
            "20 11 10 24  4",
            "14 21 16 12  6",
            "",
            "14 21 17 24  4",
            "10 16 15  9 19",
            "18  8 23 26 20",
            "22 11 13  6  5",
            "2  0 12  3  7"
        };
        */
    }

    class Board {
        string[,] _boardValues;
        bool[,] _boardChecked;
        public bool StillInPlay = true;
        public bool Play(string val){
            for (int r=0;r<5;r++){
                for (int c=0;c<5;c++){
                    if (_boardValues[r, c] == val){
                        _boardChecked[r,c] = true;

                        if ((_boardChecked[r, 0] && _boardChecked[r, 1] && _boardChecked[r, 2] && _boardChecked[r, 3] && _boardChecked[r, 4]) ||
                            (_boardChecked[0,c] && _boardChecked[1,c] && _boardChecked[2, c] && _boardChecked[3, c] && _boardChecked[4, c])){
                            StillInPlay = false;
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        public Board(string[] boardInput){
            _boardValues = new string[5,5];
            _boardChecked = new bool[5,5];

            int r=0;
            foreach(var s in boardInput){
                var values = s.Split(" ");
                int c=0;
                foreach (var val in values){
                    _boardValues[r,c] = val;
                    if (val != "") c++;
                }
                r++;
            }
        }

        public void PrintBoard()
        {
            for (int r=0;r<5;r++){
                for (int c=0;c<5;c++){
                    if (_boardChecked[r,c]) Console.Write("\x1b[1;31m");
                    Console.Write(_boardValues[r,c].PadLeft(2));
                    if (_boardChecked[r,c]) Console.Write("\x1b[0m");
                    Console.Write(" ");
                }
                Console.WriteLine();
            }
            Console.WriteLine();
        }

        public int SumUnmarked(){
            int sum = 0;
            for (int r=0;r<5;r++){
                for (int c=0;c<5;c++){
                    if (_boardChecked[r,c]==false){
                        sum += Int32.Parse(_boardValues[r,c]);
                    }
                }
             }
             return sum;
        }
    }
}