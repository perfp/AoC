using System;
using System.Collections.Generic;
using System.Linq;

namespace AOC2020{
    public class Day4 : IDay
    {
        public void Run()
        {
            var input = this.ReadInput();
            Solve(input);
        }

        public void Test()
        {
            var input = new[]{
                "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd",
                "byr:1937 iyr:2017 cid:147 hgt:183cm",
                "",
                "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884",
                "hcl:#cfa07d byr:1929",
                "",
                "hcl:#ae17e1 iyr:2013",
                "eyr:2024",
                "ecl:brn pid:760753108 byr:1931",
                "hgt:179cm",
                "",
                "hcl:#cfa07d eyr:2025 pid:166559648",
                "iyr:2011 ecl:brn hgt:59in"
            };
            var knownKeys = new[]{
                "byr (Birth Year)",
                "iyr (Issue Year)",
                "eyr (Expiration Year)",
                "hgt (Height)",
                "hcl (Hair Color)",
                "ecl (Eye Color)",
                "pid (Passport ID)",
                "cid (Country ID)"
            };
            var keyDict = new Dictionary<string, string>(knownKeys.Select(v =>
            {
                var item = v.Split(" ");
                return new KeyValuePair<string, string>(item[0], item[1]);
            }));

            Solve(input);

        }

        private void Solve(string[] input)
        {
            var passports = new List<Dictionary<string, string>>();
            var passportDict = new Dictionary<string, string>();
            var valid = 0;
            foreach (var line in input)
            {
                if (line.Trim() == "")
                {
                    passports.Add(passportDict);
                    if (IsValid(passportDict)) valid++;
                    passportDict = new Dictionary<string, string>();
                }
                else
                {
                    foreach (var kvp in line.Split(" "))
                    {
                        var elements = kvp.Split(":");
                        var field = new KeyValuePair<string, string>(elements[0], elements[1]);
                        passportDict.Add(field.Key, field.Value);
                    }
                }
            }
            if (IsValid(passportDict)) valid++;
            passports.Add(passportDict);

            
            string output = $"Antall pass: {passports.Count} Valid: {valid}";
            Console.WriteLine(output);
        }

        private bool IsValid(Dictionary<string, string> passportDict){
            return passportDict.Keys.Where(k => k != "cid").Count() == 7;
        }
    }
}