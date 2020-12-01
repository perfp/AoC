
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace AOC2020 
{
    public interface IDay
    {
        void Test();
        void Run();
    }

    public class Day1 : IDay 
    {
        public void Test()
        {
            var input = new []{1721,979,366,299,675,1456};
            Solve3(input);
            Console.WriteLine("Test");
        }

        public void Run(){
            var input = new Input().ReadFileAsInt("day1.txt").OrderBy(x => x).ToArray();
            Solve3SUM(input);
        }

        private void Solve(Span<int> input){
            var array = new int[input.Length];
            for (int i=0;i<input.Length;i++){
                for (int j=0;j<i;j++){
                    if (input[i] + array[j] == 2020){
                        Console.WriteLine($"Found: {input[i]} + {array[j]} = {input[i] * array[j]}");
                        break;
                    }
                }
            }
        }

         private void Solve3(int[] input){
            for (int i=0;i<input.Length;i++){
                for (int j=0;j<i;j++){
                    for (int k=0;k<j;k++){
                        //Console.WriteLine($"Trying: {input[i]} + {array[j]} + {array2[k]} = {input[i] + array[j] + array2[k]}");
                        if (input[i] + input[j] + input[k] == 2020){
                            Console.WriteLine($"Found: {input[i]} + {input[j]} + {input[k]} = {input[i] * input[j] * input[k]}");
                            return; 
                        }
                    }   
                }
            }
        }
        
        private void Solve3SUM(int[] p){
           
            var input = new Span<int>(p);
            input.Sort();
            //Console.WriteLine(string.Join(",", input.ToArray().Select(x => x.ToString()).ToList()));

            for (int i=0;i<2020;i++){
                if (input.BinarySearch(i)>=0){
                    
                    for (int j=0;j<=2020-i;j++){
                        if (j != i && input.BinarySearch(j)>=0){
                            
                            for (int k=0;k<=2020-i-j;k++){
                                if (k != j && k != i && input.BinarySearch(k)>=0) {
                                    //Console.WriteLine($"Trying {i} {j} {k}={i+j+k}");
                                    if ((i + j + k) == 2020){
                                        Console.WriteLine($"Found: {i} + {j} + {k} = {i*j*k}");
                                        return; 
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}