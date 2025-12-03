import {expect, test} from "bun:test";
import { Day01 } from "./day01";

let day = new Day01();

let testinput = 
[
"3   4",
"4   3",
"2   5",
"1   3",
"3   9",
"3   3"
];

test("day 1 - a", () => {
    let inputs = day.findArrays(testinput);
    day.findDistances(inputs);
})


test("day 1 - b", () => {
    let inputs = day.findArrays(testinput);
    day.findSimilarites(inputs);
})