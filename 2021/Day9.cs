class Day9 : IDay
{
    private string[] input;
    private int height;
    private int width;

    public void Solve()
    {
        input = InputHelper.GetInput(9);
        height = input.Length;
        width = input[0].Length;
        var lowpoints = new List<Point>();
        string? previousRow = null;
        foreach (int r in Enumerable.Range(0,height)){           
           string currentRow = input[r];
           string? nextRow = (r<input.Length-1) ? input[r+1] : null;
           for (int i=0;i<width;i++){               
               var val = currentRow[i];
               if (i == 0 || (currentRow[i-1] > val)){
                   if ((i == width-1) || (val < currentRow[i+1]) ){
                       if (previousRow == null || val < previousRow[i])
                        if (nextRow == null || nextRow[i] > val) {
                            lowpoints.Add(new Point {row =r, index = i});
                        } 
                   }
               }
               
           }
           previousRow = currentRow;
       }
       var sumRisk = 0;
       lowpoints.ForEach(p => {
           
           var r=p.row; 
           var i=p.index;
           var risk = input[r][i];

           sumRisk += (risk-'0') + 1;
       });

       Console.WriteLine($"Risk: {sumRisk}");

    var sizes = new List<int>();
       foreach(var p in lowpoints){
            var size = GetBasinSize(p);
            sizes.Add(size);
            Console.WriteLine($"Basin size: {size}");
       }
       Console.WriteLine($"Result: {sizes.OrderByDescending(s=>s).Take(3).Sum()}"); 
    }

    record Point {
        public int row;
        public int index;
    }
    int GetBasinSize(Point p, Point[] visited = new Point[1]){
        Console.WriteLine($"{p.row}{p.index}:");
        if (visited.Contains(p)){
            Console.WriteLine("Visited before");
            return 0;
        }
        if (input[p.row][p.index] == '9') return 0;

        var n = (p.row>0) ? new Point{row = p.row-1, index = p.index} : null;
        if (visited.Contains(n)) n = null;
        var s = (p.row<height-1) ? new Point{row = p.row+1, index = p.index} : null;
        if (visited.Contains(s)) s=null;
        var e = (p.index>0) ? new Point{row = p.row, index = p.index-1} : null;
        if (visited.Contains(e)) e=null;
        var w = (p.index<width-1) ? new Point{row = p.row, index = p.index+1} : null;
        if (visited.Contains(w)) w = null;
        var sum = 0;
        visited = visited.Append(p).ToArray();
        if (n != null) sum += GetBasinSize(n, visited);
        if (s != null) sum += GetBasinSize(s, visited);
        if (e != null) sum += GetBasinSize(e, visited);
        if (w != null) sum += GetBasinSize(w, visited);
        return sum;
        
    }
    string[] GetInput() => new string[]{
        "2199943210",
        "3987894921",
        "9856789892",
        "8767896789",
        "9899965678"
        };
}