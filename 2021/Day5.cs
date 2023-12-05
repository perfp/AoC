class Day5 : IDay
{
    public void Solve()
    {
        var grid = new int[1000, 1000];
        var count = 0;

        foreach (var s in InputHelper.GetInput(5))
        {
            var line = s.Split(" ");
            var p1 = line[0].Split(",");
            var p2 = line[2].Split(",");
            var (x1, y1) = (Int32.Parse(p1[0]), Int32.Parse(p1[1]));
            var (x2, y2) = (Int32.Parse(p2[0]), Int32.Parse(p2[1]));
            
            Console.WriteLine($"{x1},{y1}->{x2},{y2}");
            if (x1 == x2)
            {
                // Vannrett
                 int start = Math.Min(y1, y2);
                int end = Math.Max(y1, y2);
                for (int i = start;i <= end; i++)
                {
                    grid[x1, i]++;
                    if (grid[x1, i] == 2) count++;
                }
                
            }

            if (y1 == y2)
            {
                // Loddrett
                int start = Math.Min(x1, x2);
                int end = Math.Max(x1, x2);
                for (int i = start; i <= end; i++)
                {
                    grid[i,y1]++;
                    if (grid[i, y1] == 2) count++;
                }
                
            }

            if (x1 != x2 && y1 != y2){
                int dx = x1<x2 ? 1 : -1;
                int dy = y1<y2 ? 1 : -1;

                int x = x1; 
                int y = y1;
                bool done = false;
                while (!done){
                    grid[x, y]++;
                    if (grid[x,y]==2) count++;
                    if (x==x2) done = true;
                    x+=dx;
                    y+=dy;
                
                }
            }



            
            //PrintGrid(grid);
            Console.WriteLine($"Count: {count}");
        }
        count = 0;
        for (int y=0;y<1000;y++)
            for (int x=0;x<1000;x++)
                if (grid[x,y]>=2) count++;

        //PrintGrid(grid);
        Console.WriteLine($"Count: {count}");
    }

    private static void PrintGrid(int[,] grid)
    {
        for (int y = 0; y < 10; y++)
        {
            for (int x = 0; x < 10; x++)
            {
                Console.Write(grid[x, y] == 0 ? "." : grid[x, y]);
            }
            Console.WriteLine();
        }
    }

    private string[] GetInput(int _) => new string[]{
        "0,9 -> 5,9",
        "8,0 -> 0,8",
        "9,4 -> 3,4",
        "2,2 -> 2,1",
        "7,0 -> 7,4",
        "6,4 -> 2,0",
        "0,9 -> 2,9",
        "3,4 -> 1,4",
        "0,0 -> 8,8",
        "5,5 -> 8,2"
    };
}