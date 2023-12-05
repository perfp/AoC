class Day6 : IDay
{
    
    public void Solve()
    {
        var schoolInput = InputHelper.GetInput(6)[0].Split(",").Select(s => Int32.Parse(s)).ToArray();
        
        long[] school = new long[9];
        Array.Fill(school, 0);
        for (int i=0;i<schoolInput.Length;i++){
            school[schoolInput[i]]++;
        }
        foreach (int i in Enumerable.Range(0,256)){
            var newcount = school[0];
            school[0] = school[1];
            school[1] = school[2];
            school[2] = school[3];
            school[3] = school[4];
            school[4] = school[5];
            school[5] = school[6];
            school[6] = school[7];
            school[7] = school[8];
            school[8] = newcount;
            school[6] += newcount;
            Console.WriteLine($"School: {string.Join(",", school)} {school.Sum()}"); 
        }
        Console.WriteLine($"School: {string.Join(",", school)} {school.Sum()}"); 
    }

    string[] GetInput() => new []{"3,4,3,1,2"};
}