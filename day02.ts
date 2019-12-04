import {input} from './day02.input';

export class Day02 {

    iterateProgram(input: number[]) : number[] {
        let done = false;
        let output : number[] = input;
        let ip = 0;
        while (!done) {
            let result = this.calculateNext(output, ip);
            
            done = result.done;
            output = result.output;
            ip += 4;
            
        }
        return output;
    }
    calculateNext(input: number[], index = 0) : Result {
        let done = false;
        var instruction = input.slice(index, index+4);
        
        //console.log(`Index: ${index}, Instruction: ${instruction}`);
        const [op, posA1, posA2, posResult] = instruction;
        //console.log(`Op: ${op}`);
        if (op == 1){
            input[posResult] = input[posA1] + input[posA2];
        }
        if (op == 2){
            input[posResult] = input[posA1] * input[posA2];
        }
        if (op == 99){
            done = true;
        }
        if (op == undefined){
            throw new Error("Op Undefined");
        }

        return new Result(input, done);
    }

    run() { this.part2();}
    part1(){
        input[1] = 36;
        input[2] = 60;
        const result = this.iterateProgram(input);
        console.log(result[0]);
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
            result = this.iterateProgram(memory)[0];
            
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