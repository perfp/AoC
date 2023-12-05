class Day2 : IDay
{

    public string[] GetInput() {
        //return InputHelper.GetInput(2);

        return new string[]{
            "forward 5",
            "down 5",
            "forward 8",
            "up 3",
            "down 8",
            "forward 2"
        };
    }


    public void Solve()
    {
        var input = GetInput();
        var commands = input.Select(i => {
            var cmd = i.Split(" ");
            var (dir, len) = (cmd[0], Int32.Parse(cmd[1]));
            return (dir, len);
        });

        int pos = 0;
        int depth = 0;
        int aim = 0;
        foreach (var (dir,len) in commands)
        {
            switch (dir) {
                case "forward": 
                    pos += len;
                    depth += aim*len;
                    break;
                case "down":                     
                    aim += len;
                    break;
                case "up":                     
                    aim-=len;
                    break;
            }   
            
        }
    }

    public void SolveBetter(){
        var input = GetInput();
        var commands = new (string, int)[input.Length];
        for (int i=0;i<input.Length;i++){
           var dir = input[i][..^2];
           var len = input[i][^1]-(char)'0';
            commands[i] = (dir, len);
        };

        int pos = 0;
        int depth = 0;
        int aim = 0;
        foreach (var (dir,len) in commands)
        {
            switch (dir) {
                case "forward": 
                    pos += len;
                    depth += aim*len;
                    break;
                case "down":                     
                    aim += len;
                    break;
                case "up":                     
                    aim-=len;
                    break;
            }   
            
        }
    }
}