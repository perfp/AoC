using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace AOC2020 {

    public static class ParserExtensions {

        public static string[] ReadInput(this IDay me){
            return new Input().ReadFile(me.GetType().Name+".txt");
        }

        public static int[] GetInts(this IDay me, string input){
            return Regex.Matches(input, "\\d+").Select(m => Int32.Parse(m.Value)).ToArray();
        }
    }
}