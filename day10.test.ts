import { assert } from 'chai';
import { Day10 } from './day10';

const simpleinput = [
    ".#..#",
    ".....",
    "#####",
    "....#",
    "...##"
];

describe("Day10", () => {
    it("can count visible asterioids", () => {
       let day10 = new Day10(simpleinput);
       day10.loopInput();
    });

    it("can find path to asteroid", ()=>{
        const input = ["##"];
        let day10 = new Day10(input);
        day10.findOpenPath([0,0], [0,1]);
    })
});