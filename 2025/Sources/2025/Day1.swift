struct Day1 {
    static let testinput: [String] = 
        ["L68","L30","R48","L5","R60","L55","L1","L99","R14","L82"]

    func part1(input : [String]) -> Int {

        var dialPosition = 50
        var prevPosition = 50
        var zeroCount = 0

        for item in input {
            let regex =  /(L|R)(\d+)/            
            if let match = try? regex.wholeMatch(in: item) {
                print ("Direction: \(match.1)")
                print ("Number: \(match.2)")
                let direction = match.1
                let number = Int(match.2) ?? 0

                if direction == "R" {
                    let (quotient, remainder) = number.quotientAndRemainder(dividingBy: 100)
                    zeroCount += quotient
                    dialPosition += remainder
                    if (dialPosition > 99) {
                        dialPosition -= 100
                        if dialPosition != 0 && prevPosition != 0 {
                            zeroCount += 1
                        }
                    }
                    
                } else {
                    let (quotient, remainder) = number.quotientAndRemainder(dividingBy: 100)
                    zeroCount += quotient
                    dialPosition -= remainder
                    if (dialPosition < 0) {
                        dialPosition += 100
                        if dialPosition != 0 && prevPosition != 0 {
                            zeroCount += 1
                        }
                    }                   
                }

                if dialPosition == 0 {
                    zeroCount += 1
                }
                prevPosition = dialPosition

            }
            print ("Dial Postition: \(dialPosition)")
            print ("Zero Count = \(zeroCount)")
        }
        print ("Zero Count = \(zeroCount)")
        return zeroCount
    }
}
