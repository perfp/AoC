import { Day06 } from './day06';
import { assert } from 'chai';

const day06 = new Day06();

const input = [
"COM)B",
"B)C",
"C)D",
"D)E",
"E)F",
"B)G",
"G)H",
"D)I",
"E)J",
"J)K",
"K)L",
];

describe("Day06", () => {

    it("count 1 orbit", () => {
        let count = day06.parseInput(["A)B"]);
        assert.equal(count, 1);
    });

    it("count 2 orbit", () => {
        let count = day06.parseInput(["C)D", "B)C"]);
        assert.equal(count, 3);
    });


    it("count 3 orbit", () => {
        let count = day06.parseInput(["C)D", "B)C", "D)E"]);
        assert.equal(count, 6);
    });

    it("count 3 orbit with branch", () => {
        let count = day06.parseInput(["C)D", "B)C", "C)E"]);
        assert.equal(count, 5);
    });

    it("count 4 orbit with branch", () => {
        let count = day06.parseInput(["B)C", "C)D", "C)E", "D)F"]);
        assert.equal(count, 8);
    });
    
    it("count 4 orbit with branch", () => {
        let count = day06.parseInput(input);
        assert.equal(count, 42);
    });
});