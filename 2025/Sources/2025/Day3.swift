struct Day3 {
    static let testinput =  [
        "987654321111111",
        "811111111111119",
        "234234234234278",
        "818181911112111"
    ]

    func part1( input: [String]) -> Int {
        var totalsum  = 0

        for var bank in input {
            var joltages = bank.map({Int(String($0))!})
            var startindex = 0
            var valuesToCheck: [Int] = []
            for i in 0..<2 {
                var slice = joltages[startindex..<joltages.count - 1 + i]
                var max = slice.max()!
                startindex = slice.firstIndex(of: max)! + 1
                valuesToCheck.append(max)
            }

            
            
            print ("Values to Check: \(valuesToCheck.map({String($0)}).joined(separator: ","))")
            totalsum += valuesToCheck.reduce(0) {$0 * 10 + $1}
        }
        print ("Result: \(totalsum) ")
        return 0
    }
    
    func part2( input: [String]) -> Int {
                var totalsum  = 0

        for var bank in input {
            var joltages = bank.map({Int(String($0))!})
            var startindex = 0
            var valuesToCheck: [Int] = []
            for i in 0..<12 {
                var slice = joltages[startindex..<joltages.count - 11 + i]
                var max = slice.max()!
                startindex = slice.firstIndex(of: max)! + 1
                valuesToCheck.append(max)
            }

            
            
            print ("Values to Check: \(valuesToCheck.map({String($0)}).joined(separator: ","))")
            totalsum += valuesToCheck.reduce(0) {$0 * 10 + $1}
        }
        print ("Result: \(totalsum) ")
        return 0
    }
}