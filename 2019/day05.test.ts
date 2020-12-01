import { Day05 } from './day05';
import { assert } from 'chai';
import {initializeIntComputer} from './IntComputer';

const day05 = new Day05();


describe("Day05", () => {

    it("can parse instruction", () => {
        const intComputer = initializeIntComputer([]);
        let digits = intComputer.getDigitsArray(123);
        assert.deepEqual(digits, [1,2,3]);
    });

    it("can get simple operation", () => {
        const intComputer = initializeIntComputer([]);
        let operation = intComputer.getOperation(1);
        assert.equal(1, operation.operator);
        assert.equal(0, operation.modes[0]);
        assert.equal(0, operation.modes[1]);
        assert.equal(0, operation.modes[2]);
    });
    
    it("can get complex operation", () => {
        const intComputer = initializeIntComputer([]);
        let operation = intComputer.getOperation(1002);
        assert.equal(2, operation.operator);
        assert.equal(0, operation.modes[0]);
        assert.equal(1, operation.modes[1]);
        assert.equal(0, operation.modes[2]);
    });

    it("can handle immediate mode", () =>{
        let input = [1002,4,3,4,33];
        const intComputer = initializeIntComputer(input);
        intComputer.calculateNext();
        assert.deepEqual(input, [1002,4,3,4,99]);
    });
    
    it("can parse negative arguments", () => {
        const input = [1101,100,-1,4,0];
        const intComputer = initializeIntComputer(input);
        intComputer.calculateNext();
        assert.deepEqual(input, [1101,100,-1,4,99]);

    })

    it("can handle jump-if-true position", () => {
        const input = [1005,3,99,1];
        const intComputer = initializeIntComputer(input);
        const result = intComputer.calculateNext();
        assert.equal(intComputer.ip, 99);
    });

    it("can handle jump-if-true immediate", () => {
        const input = [105,1,3,99];
        const intComputer = initializeIntComputer(input);
        const result = intComputer.calculateNext();
        assert.equal(intComputer.ip, 99);
    });

    it("can handle jump-if-false immediate", () => {
        const input = [1106,0,99];
        const intComputer = initializeIntComputer(input);
        const result = intComputer.calculateNext();
        assert.equal(intComputer.ip, 99);
    });
    
    it("can handle jump-if-false position", () => {
        const input = [1006,0,99];
        const intComputer = initializeIntComputer(input);
        const result = intComputer.calculateNext();
        assert.equal(intComputer.ip, 3);
    });

    it("can handle jump-if-false position positive", () => {
        const input = [1006,3,99,0];
        const intComputer = initializeIntComputer(input);
        const result = intComputer.calculateNext();
        assert.equal(intComputer.ip, 99);
    });

    it("can handle less than immediate", () => {
        const input = [11107,1,3,0];
        const intComputer = initializeIntComputer(input);
        intComputer.calculateNext();
        assert.deepEqual(input, [1,1,3,0]);
    });

    it("can handle less than position", () => {
        const input = [7,1,2,3];
        const intComputer = initializeIntComputer(input);
        intComputer.calculateNext();
        
        assert.deepEqual(input, [7,1,2,1]);
    });

    it("can handle equals immediate", () => {
        const input = [11108,3,3,0];
        const intComputer = initializeIntComputer(input);
        intComputer.calculateNext();
        assert.deepEqual(input, [1,3,3,0]);
    });

    it("can handle equals position", () => {
        const input = [8,3,3,3];
        const intComputer = initializeIntComputer(input);
        intComputer.calculateNext();
        
        assert.deepEqual(input, [8,3,3,1]);
    });

    it("can compare input to 8", () => {
        const input = [3,9,8,9,10,9,4,9,99,-1,8];
        const intComputer = initializeIntComputer();
        const [result] = intComputer.runProgram(input, [8]);
        assert.equal(result, 1);

    });

    it("can compare input lt 8", () => {
        const input = [3,9,7,9,10,9,4,9,99,-1,8];
        const intComputer = initializeIntComputer();
        const [result]= intComputer.runProgram(input, [7]);
        assert.equal(result, 1);
    });
    it("can compare input eq 8 immediate", () => {
        const input = [3,3,1108,-1,8,3,4,3,99];
        const intComputer = initializeIntComputer();
        const [result] = intComputer.runProgram(input, [8]);
        assert.equal(result, 1);
    });
    it("can compare input lt 8 immediate", () => {
        const input = [3,3,1107,-1,8,3,4,3,99];
        const intComputer = initializeIntComputer();
        const [result] = intComputer.runProgram(input, [8]);
        assert.equal(result, 0);
    });

    it("can run big test", () => {
        const input = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
            1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
            999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
        const intComputer = initializeIntComputer();

        const [result] = intComputer.runProgram(input, [7]);
        assert.equal(result, 999);

    });    
});