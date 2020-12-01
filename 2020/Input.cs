using System;
using System.IO;
using System.Linq;

namespace AOC2020 
{
    public class Input {

        public string[] ReadFile(string filename){
            return File.ReadAllLines(filename);
        }

        public int[] ReadFileAsInt(string filename){
            return ReadFile(filename).Select(s => Int32.Parse(s)).ToArray();
        }

        public Span<int> ReadFileAsSpanInt(string filename){
            return new Span<int>(ReadFileAsInt(filename));
        }
    }
}