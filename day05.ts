import {IntComputer} from './IntComputer';
import {input} from './day05.input';

const intComputer = new IntComputer();
export class Day05 {
    inputValue: number = 1;
    iterateProgram(input: number[], inval = 1) : number[] {
        this.inputValue = inval;
        let done = false;
        let output : number[] = input;
        let ip = 0;
        let watchdog = 10;
        while (!done) {
            let result = this.calculateNext(output, ip);
            //console.log(`Ip: ${ip}`);
            done = result.done;
            output = result.output;
            if (result.setIP != -1) {
                ip = result.setIP;
            } else {
                ip += result.count;
            }
            //if (watchdog-- == 0) break;
        }
        return output;
    }
    calculateNext(input: number[], index = 0) : Result {
        let done = false;
        var [instruction] = input.slice(index, ++index);
        let pc = 0;
        let setIP = -1;
        
        console.log(`Instruction: ${instruction}`);
        let operation = intComputer.getOperation(instruction);
        
        if (operation.operator == 1){
            
            pc = 3;
            const [posA1, posA2, posResult] = input.slice(index);
            
            const p1 = operation.parameter1mode == 1 ? posA1 : input[posA1];
            const p2 = operation.parameter2mode == 1 ? posA2 : input[posA2];
            console.log(`Add: ${p1} ${p1} ${posResult}`);
            input[posResult] = p1 + p2;
        }
        if (operation.operator == 2){
            
            pc = 3;
            const [posA1, posA2, posResult] = input.slice(index);
            console.log(`Mul: ${posA1} ${posA2} ${posResult}`);
            
            const p1 = operation.parameter1mode == 1 ? posA1 : input[posA1];
            const p2 = operation.parameter2mode == 1 ? posA2 : input[posA2];
            console.log(`Mul: ${p1} ${p2} ${posResult}`);
            input[posResult] = p1 * p2;
        }
        if (operation.operator == 3){
            pc = 1;
            
            const [posAddr] = input.slice(index);
            console.log(`Store: ${this.inputValue} ${posAddr}`);
            input[posAddr] = this.inputValue;
        }
        if (operation.operator == 4){
            pc = 1;
            const [posAddr] = input.slice(index);
            const outvalue = operation.parameter1mode ? posAddr : input[posAddr];
            console.log(`Output: ${outvalue}`);
        }
        if (operation.operator == 5){
            pc = 2;
            const [p1,p2] = input.slice(index);
            
            const test = operation.parameter1mode == 1 ? p1 : input[p1];
            const value = operation.parameter2mode == 1 ? p2 : input[p2];
            console.log(`Jump true: ${test} ${value}`);
            if (test) setIP = value;
        }
        if (operation.operator == 6){
            pc = 2;
            const [p1,p2] = input.slice(index);
            
            const test = operation.parameter1mode == 1 ? p1 : input[p1];
            const value = operation.parameter2mode == 1 ? p2 : input[p2];
            console.log(`Jump false: ${test} ${value}`);
            if (!test) setIP = value;
        }

        if (operation.operator == 7){
            pc = 3;
            const [p1, p2, p3] = input.slice(index);
            const arg1 = operation.parameter1mode ? p1 : input[p1];
            const arg2 = operation.parameter2mode ? p2 : input[p2];
            const arg3 = operation.parameter3mode ? p3 : input[p3];
            console.log(`Less than: ${arg1} ${arg2}${p3}: `);
            if (arg1 < arg2) 
                input[p3] = 1;
            else
                input[p3] = 0; 
        }       

        if (operation.operator == 8){
            pc = 3;
            const [p1, p2, p3] = input.slice(index);
            const arg1 = operation.parameter1mode ? p1 : input[p1];
            const arg2 = operation.parameter2mode ? p2 : input[p2];
            const arg3 = operation.parameter3mode ? p3 : input[p3];
            console.log(`Equals: ${arg1} ${arg2}${p3}: `);
            if (arg1 == arg2) 
                input[p3] = 1;
            else    
                input[p3] = 0;
        }

        if (operation.operator == 99){
            console.log("done");
            done = true;
        }
        if (operation.operator == undefined){
            throw new Error("Op Undefined");
        }
        
        return new Result(input, done, 1+pc, setIP);
    }

    run(){
        const response = this.iterateProgram(input, 5);
        //console.log(response);
    }
}

class Result {
    setIP: number;
    constructor(output: number[], done: boolean = false, count: number, setIP: number){
        this.output = output;
        this.done = done;
        this.count = count;
        this.setIP = setIP;
    }
    output: number[];
    done: boolean;
    count: number;
}