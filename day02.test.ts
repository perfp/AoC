import * as mocha from 'mocha';
import * as chai from 'chai';
import { Day02 } from './day02';
import { IntComputer } from './IntComputer';

const intComputer = new IntComputer();
const day02 = new Day02();
const assert = chai.assert;

describe("Day02", () => {
    it("can calculate add", () => {
        let input = [1, 0, 0, 0];
        intComputer.calculateNext(input);
        assert.deepEqual(input, [2, 0, 0, 0]);

    });

    it("can handle HCF", () => {
        let input = [99, 0, 0, 0];
        const output = intComputer.calculateNext(input);
        assert.deepEqual(output.done, true);

    });

    it("can handle multiply", () => {
        let input = [2, 0, 3, 3];
        intComputer.calculateNext(input);
        assert.deepEqual(input, [2, 0, 3, 6]);

    });

    it("can expand result array", () => {
        const input = [2, 4, 4, 5, 99];
        intComputer.calculateNext(input);
        assert.deepEqual(input, [2, 4, 4, 5, 99, 9801]);
    });

    it("can iterate input", () => {
        let input = [1, 1, 1, 4, 99, 5, 6, 0, 99];
        intComputer.runProgram(input);
        assert.deepEqual(input, [30, 1, 1, 4, 2, 5, 6, 0, 99]);

    });

});