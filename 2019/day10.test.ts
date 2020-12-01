import { Day10 } from "./day10";
import { assert } from "chai";

describe.only("Day10", () => {
    it("can find path", () => {
        const input = ["#....", "....#"];
        const day10 = new Day10(input);
        const result = day10.validPathExists([4,1], [0,0]);
        assert.equal(result, true);
    });
})