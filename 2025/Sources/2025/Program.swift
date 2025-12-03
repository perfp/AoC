// The Swift Programming Language
// https://docs.swift.org/swift-book
import Foundation

@main
struct Program {
    static func main() {
        do {
        let path = "./input2.txt"
        let content = try String(contentsOfFile: path, encoding: .utf8)
        let lines = content.components(separatedBy: .newlines)

        let d1 = Day2()
        _ = d1.part2(input: lines[0])

        } catch {
            print ("Error: \(error)")
        }
    }
}
