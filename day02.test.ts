import * as mocha from 'mocha';
import * as chai from 'chai';
import { Day02 } from './day02';
import { initializeIntComputer } from './IntComputer';
const day02 = new Day02();
const assert = chai.assert;


describe("Day02", () => {
    it("can calculate add", () => {
        let input = [1, 0, 0, 0];
        const intComputer = initializeIntComputer(input);
        intComputer.calculateNext();
        assert.deepEqual(input, [2, 0, 0, 0]);

    });

    it("can handle HCF", () => {
        let input = [99, 0, 0, 0];
        const intComputer = initializeIntComputer(input);
        const output = intComputer.calculateNext();
        assert.deepEqual(intComputer.done, true);

    });

    it("can handle multiply", () => {
        let input = [2, 0, 3, 3];
        const intComputer = initializeIntComputer(input);
        intComputer.calculateNext();
        assert.deepEqual(input, [2, 0, 3, 6]);

    });

    it("can expand result array", () => {
        const input = [2, 4, 4, 5, 99];
        const intComputer = initializeIntComputer(input);
        intComputer.calculateNext();
        assert.deepEqual(input, [2, 4, 4, 5, 99, 9801]);
    });

    it("can iterate input", () => {
        let input = [1, 1, 1, 4, 99, 5, 6, 0, 99];
        const intComputer = initializeIntComputer(input);
        intComputer.runProgram(input);
        assert.deepEqual(input, [30, 1, 1, 4, 2, 5, 6, 0, 99]);

    });

});