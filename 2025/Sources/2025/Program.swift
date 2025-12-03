// The Swift Programming Language
// https://docs.swift.org/swift-book
import Foundation

@main
struct Program {
    static func main() {
        do {
        let path = "./input.txt"
        let content = try String(contentsOfFile: path, encoding: .utf8)
        let lines = content.components(separatedBy: .newlines)

        let d1 = Day1()
        _ = d1.part1(input: lines)

        } catch {
            print ("Error: \(error)")
        }
    }
}
