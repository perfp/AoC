import { assert } from "chai";
import { IntComputer } from "./IntComputer";


describe("Day09", ()=>{

    it("can set relative base", ()=>{
        const intComputer = new IntComputer();
        intComputer.relativeBase = 2000;
        intComputer.runProgram([109,19, 99]);
        assert.equal(intComputer.relativeBase, 2019);
    });

    it("can use realtive parameter mode", ()=>{
        const intComputer = new IntComputer();
        intComputer.relativeBase = 2000;
        intComputer.runProgram([109,19, 99]);
        assert.equal(intComputer.relativeBase, 2019);
    });

    it("can run program using new functions", () => {
        const input = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99];
        const intComputer = new IntComputer();
        const output = intComputer.runProgram(input.slice());
        assert.deepEqual(output, input);
    });
    
    it("can run handle large numbers", () => {
        const input = [1102,34915192,34915192,7,4,7,99,0];
        const intComputer = new IntComputer();
        const [output] = intComputer.runProgram(input.slice());
        assert.deepEqual(Math.floor(Math.log10(output)), 15);
    });
   
    it("can run handle large numbers", () => {
        const input = [104,1125899906842624,99];
        const intComputer = new IntComputer();
        const [output] = intComputer.runProgram(input.slice());
        assert.deepEqual(output, 1125899906842624);
    });

    it("can run handle input from realtive parameter", () => {
        const input = [9,1,203,1,99];
        const intComputer = new IntComputer();
        
        const [output] = intComputer.runProgram(input, [100]);
        assert.deepEqual(input, [9,1,100,1,99]);
    });
    
    it("can run handle 21107", () => {
        const input = [21107, 2, 3, 2, 99, 0];
        const intComputer = new IntComputer();
        intComputer.relativeBase = 3;
        const [output] = intComputer.runProgram(input, [100]);
        assert.deepEqual(input, [21107, 2, 3, 2, 99, 1]);
    });
});