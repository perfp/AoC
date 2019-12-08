import { Day07 } from './day07';
import { assert } from 'chai';
import { IntComputer } from './IntComputer';

const day07 = new Day07();

describe("Day07", () => {

    it("can supply multiple inputs to intcomputer", ()=> {
        const intComputer = new IntComputer();
        const input = [3,5,3,6,99,0,0];
        intComputer.runProgram(input, [1,2]);
        assert.deepEqual(input, [3,5,3,6,99,1,2]);
    });

    it("can supply multiple inputs to intcomputer", ()=> {
        const intComputer = new IntComputer();
        const input = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
        let output = intComputer.runProgram(input, [3,4]);
        assert.equal(output, 43);

    });

    it("can run amp chain", () => {
        const input = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
        const phaseSettings = 43210;
        let intComputer = new IntComputer();
        const phases = intComputer.getDigitsArray(phaseSettings);
        let output = 0;
        for(let i=0;i<5;i++){
            intComputer.memory = input;
            //console.log("phase", phases[i], output);
            output = intComputer.runProgram(input, [phases[i], output])
            //console.log("output", output);
        }
        assert.equal(output, 43210);
    });
    
    it("can run amp chain", () => {
        const input = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0];
        const phases = [0,1,2,3,4];
        let output = 0;
        for(let i=0;i<5;i++){
            output = day07.runAmp([phases[i], output], input);
        }
        assert.equal(output, 54321);
    });
    it("can run amp chain", () => {
        const input = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];
        const phases = [1,0,4,3,2];
        let output = 0;
        for(let i=0;i<5;i++){
          output = day07.runAmp([phases[i], output], input);
        }
        assert.equal(output, 65210);
    });

    it("can run amp in feedback mode", () => {
        const input = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];
        const phases = [ 9,8,7,6,5 ];
        
        const output = day07.runAmpWithFeedback(phases, input);
        assert.equal(output, 139629729);
    });
    it("can run amp in feedback mode", () => {
        const input = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10];
        const phases = [ 9,7,8,5,6 ];
        
        const output = day07.runAmpWithFeedback(phases, input);
        assert.equal(output, 18216);
    });

    it("can run amp in feedback mode", () => {
        
        const phases = [ 7, 5, 9, 8, 6  ];
        
        const output = day07.runAmpWithFeedback(phases, day07.input);
        assert.equal(output, 84088865);
    });



});