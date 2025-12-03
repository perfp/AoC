struct Day2 {
    static let testinput = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124"

    func part1(input : String = testinput) {

        var sumInvalidIDs : Int = 0
        let ranges = input.split(separator: ",")
        for r in ranges {
            let fl = r.split(separator: "-")

            let first = fl[0]
            let last = fl[1]
            print("First: \(first) Last: \(last)")
            
            let firstnum = Int(first)!
            let lastnum = Int(last)!

            for id in firstnum..<lastnum+1 {
                let numstr = String(id)
                let length = String(id).count
                if length % 2 == 0 {
                    let index = length / 2;
                    let firsthalf = numstr.prefix(index)
                    let secondhalf = numstr.suffix(index)

                    if firsthalf == secondhalf {
                        sumInvalidIDs += id
                        print("Invalid ID: \(numstr)")
                    }       
                }
            }

            
        }
        print("Sum invalid ids: \(sumInvalidIDs)")

    }

    func part2 (input: String ){
        var sumInvalidIDs = 0
        let ranges = input.split(separator: ",")
        for r in ranges {
            let fl = r.split(separator: "-")

            let first = fl[0]
            let last = fl[1]
            print("First: \(first) Last: \(last)")

            let firstnum = Int(first)!
            let lastnum = Int(last)!

            for id in firstnum..<lastnum+1 {
                let numstr = String(id)
                let length = String(id).count
                
                //print ("numstr: \(numstr) length: \(length) " )
                
                for i in 1...length {
                    var endstr = ""
                    var substr = numstr.prefix(i)
                    while endstr.count < length {
                        endstr += substr
                    }
                    //print ("Endstr: \(endstr) Substr: \(substr)" )    
                    if endstr == numstr && i < length{
                        sumInvalidIDs += id
                        print("Invalid ID: \(numstr)")
                        break
                    } 
                }
                 
               
                
                
            }
        }
        print("Sum invalid ids: \(sumInvalidIDs)")
    }

}