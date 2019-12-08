import { IntComputer } from "./IntComputer";


export class Day07 {
    input = [3, 8, 1001, 8, 10, 8, 105, 1, 0, 0, 21, 34, 55, 68, 85, 106, 187, 268, 349, 430, 99999, 3, 9, 1001, 9, 5, 9, 1002, 9, 5, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 1001, 9, 2, 9, 1002, 9, 5, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 101, 3, 9, 9, 102, 3, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 5, 9, 101, 3, 9, 9, 102, 5, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 4, 9, 1001, 9, 2, 9, 102, 3, 9, 9, 101, 3, 9, 9, 4, 9, 99, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 99, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 99];
    runAmp(inputs: number[], program: number[]) {
        const intComputer = new IntComputer();
        const output = intComputer.runProgram(program, inputs);
        return output;
    }
    runAmpWithFeedback(phases: number[], program: number[]): number {
        const amps: IntComputer[] = [
            new IntComputer(),
            new IntComputer(),
            new IntComputer(),
            new IntComputer(),
            new IntComputer()];
        let output = 0;
        let done = false;
        for (let a = 0; a < 5; a++) {
            amps[a].memory = program.slice();
            amps[a].inputValues = [phases[a]];
        }
        amps[0].inputValues.push(0);
        let amp = 0;
        let count = 0;
        while (!done) {
            let result: number | undefined = undefined;
            
            while (result == undefined) {
            
                //console.log(`Amp: ${amp}`);
                let currentAmp = amps[amp];
                result = currentAmp.calculateNext();
                if (currentAmp.done) break;               
            }
        
            if (++amp == 5) amp = 0;
            if (result != undefined){
                amps[amp].inputValues.push(result);
                output = result;
            }
            
            if (amps[4].done) done = true;
            
            result = undefined;

            //if (count++ == 10) done = true;
        }
        //console.log("output", output);
        return output!;
    }


getAllValidPhases(start: number, end: number): number[][] {
    let used: number[] = [];
    let validPhases: number[][] = [];
    for (let a = start; a <= end; a++) {
        used.push(a);
        for (let b = start; b <= end; b++) {
            if (used.lastIndexOf(b) > -1) continue;
            used.push(b);
            for (let c = start; c <= end; c++) {

                if (used.lastIndexOf(c) > -1) continue;
                used.push(c);
                for (let d = start; d <= end; d++) {

                    if (used.lastIndexOf(d) > -1) continue;
                    used.push(d);
                    for (let e = start; e <= end; e++) {

                        if (used.lastIndexOf(e) > -1) continue;
                        const validPhase = [a, b, c, d, e];
                        validPhases.push(validPhase);
                        //console.log(validPhase);

                    }
                    used.pop();
                }
                used.pop();
            }
            used.pop();
        }
        used.pop();
    }
    return validPhases;
}
part1() {
    let maxoutput = 0;
    let maxinput: number[] = [];
    const validPhases = this.getAllValidPhases(0, 4);

    validPhases.forEach(phase => {
        const [a, b, c, d, e] = phase;
        let output = 0;
        phase.forEach(amp => {
            output = this.runAmp([amp, output], this.input.slice());
        });

        if (output > maxoutput) {
            maxinput = [a, b, c, d, e];
            maxoutput = output;
        }
    });

    console.log("Max: ", maxoutput, maxinput);
}

part2() {
    let maxoutput = 0;
    let maxinput: number[] = []
    const validPhases = this.getAllValidPhases(5, 9);
    validPhases.forEach(phase => {
        const [a, b, c, d, e] = phase;
        
        let output = 0;
        output = this.runAmpWithFeedback(phase, this.input.slice());
        
        if (output > maxoutput) {
            maxinput = [a, b, c, d, e];
            maxoutput = output;
        }
    });

    console.log("Max: ", maxoutput, maxinput);
}

run() {
    this.part2();
}
}

interface Amp {
    intComputer: IntComputer,
    memory: number[]
}