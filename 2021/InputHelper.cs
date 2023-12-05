public static class InputHelper {
    public static string[] GetInput(int day){

        return File.ReadAllLines($"input{day}.txt");
    }


    public static int[] GetInputAsInt(int day){

        var lines = GetInput(day);
        return lines.Select(l => Int32.Parse(l)).ToArray();
    }
    
}