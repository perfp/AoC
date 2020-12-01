import {input} from './day02.input';
import {IntComputer} from './IntComputer';

const intComputer = new IntComputer();

export class Day02 {
    run() { this.part2();}
    part1(){
        input[1] = 12;
        input[2] = 2;
        intComputer.runProgram(input);
        console.log(input[0]);
    }

    part2(){
        const solveFor = 19690720;
        let verb = 0;
        let noun = 0;
        let lastverb = 0;
        let lastnoun = 0;
        let result = 0;
        while (result != solveFor){
            
            let memory = input.slice();
            lastnoun = noun++;
            lastverb = verb;
            if (noun > 99){
                noun = 0;
                verb++;
            }

            memory[1] = lastnoun;
            memory[2] = lastverb;
            
            console.log(memory.slice(0,4));
            intComputer.runProgram(memory);
            result = memory[0];
            
            console.log(`Noun: ${lastnoun} Verb: ${lastverb} Result: ${result}`);
            if (verb > 99) throw new Error("overflow");
        }

        const answer = 100 * lastnoun + lastverb;
        console.log(`Answer: ${answer}`);
    }
   
}

class Result {
    constructor(output: number[], done: boolean = false){
        this.output = output;
        this.done = done;
    }
    output: number[];
    done: boolean;
}