const ADD_1 = 1;
const MULTIPLY_2 = 2;
const INPUT_3 = 3;
const OUTPUT_4 = 4;
const JUMP_IF_TRUE_5 = 5;
const JUMP_IF_FALSE_6 = 6;
const LESS_THAN_7 = 7;
const EQUALS_8 = 8;
const HCF_99 = 99;


export class IntComputer {
    debug: boolean = false;
    inputValue: number = 1;

    getOperation(instruction: number) : Operation {
        const digits  = this.getDigitsArray(instruction);
        const [o1, o2, p1, p2, p3] = digits.reverse();
        return new Operation(o1 + (o2 ?? 0) * 10, p1, p2, p3);

    }
    
    getDigitsArray(input: number) : Array<number> {        
        const inputlen = Math.floor(Math.log10(input));
        if (this.debug) console.log(inputlen);
        let digits = new Array<number>(inputlen);
        for (let i = 0; i <= inputlen; i++) {
            let digit = input % 10;
            if (this.debug) console.log(digit);
            input = Math.floor(input / 10);
            digits[inputlen - i] = digit;
        }
        return digits;
    }

    calculateNext(memory: number[], index = 0) : Result {
        let done = false;
        var [instruction] = memory.slice(index);
        let nextip = ++index;
        let output = -1;
        
        if (this.debug) console.log(`Instruction: ${instruction}`);
        let operation = this.getOperation(instruction);
        nextip += operation.getParamCount();

        if (operation.operator == ADD_1){
            const [posA1, posA2, posResult] = memory.slice(index);
            if (this.debug) console.log(`Add: ${posA1} ${posA2} ${posResult}`);
            const p1 = operation.parameter1mode == 1 ? posA1 : memory[posA1];
            const p2 = operation.parameter2mode == 1 ? posA2 : memory[posA2];
            if (this.debug) 
            console.log(`Add: ${p1} ${p1} ${posResult}`);

            memory[posResult] = p1 + p2;
        }

        if (operation.operator == MULTIPLY_2){
            const [posA1, posA2, posResult] = memory.slice(index);
            if (this.debug) console.log(`Mul: ${posA1} ${posA2} ${posResult}`);
            const p1 = operation.parameter1mode == 1 ? posA1 : memory[posA1];
            const p2 = operation.parameter2mode == 1 ? posA2 : memory[posA2];
            if (this.debug) console.log(`Mul: ${p1} ${p2} ${posResult}`);

            memory[posResult] = p1 * p2;
        }

        if (operation.operator == INPUT_3){
            const [posAddr] = memory.slice(index);
            if (this.debug) console.log(`Store: ${this.inputValue} ${posAddr}`);

            memory[posAddr] = this.inputValue;
        }

        if (operation.operator == OUTPUT_4){
            const [posAddr] = memory.slice(index);
            const outvalue = operation.parameter1mode ? posAddr : memory[posAddr];

            console.log(`Output: ${outvalue}`);
            output = outvalue;
        }

        if (operation.operator == JUMP_IF_TRUE_5){
            const [p1,p2] = memory.slice(index);
            const test = operation.parameter1mode == 1 ? p1 : memory[p1];
            const value = operation.parameter2mode == 1 ? p2 : memory[p2];
            if (this.debug) console.log(`Jump true: ${test} ${value}`);

            if (test) nextip = value;
        }

        if (operation.operator == JUMP_IF_FALSE_6){
            const [p1,p2] = memory.slice(index);
            const test = operation.parameter1mode == 1 ? p1 : memory[p1];
            const value = operation.parameter2mode == 1 ? p2 : memory[p2];
            if (this.debug) console.log(`Jump false: ${test} ${value}`);

            if (!test) nextip = value;
        }

        if (operation.operator == LESS_THAN_7){
            const [p1, p2, p3] = memory.slice(index);
            const arg1 = operation.parameter1mode ? p1 : memory[p1];
            const arg2 = operation.parameter2mode ? p2 : memory[p2];
            if (this.debug) console.log(`Less than: ${arg1} ${arg2}${p3}: `);

            if (arg1 < arg2) 
                memory[p3] = 1;
            else
                memory[p3] = 0; 
        }       

        if (operation.operator == EQUALS_8){
            const [p1, p2, p3] = memory.slice(index);
            const arg1 = operation.parameter1mode ? p1 : memory[p1];
            const arg2 = operation.parameter2mode ? p2 : memory[p2];
            if (this.debug) console.log(`Equals: ${arg1} ${arg2}${p3}: `);

            if (arg1 == arg2) 
                memory[p3] = 1;
            else    
                memory[p3] = 0;
        }

        if (operation.operator == HCF_99){
            if (this.debug) console.log("done");
            done = true;
        }
        
        if (operation.operator == undefined){
            throw new Error("Op Undefined");
        }
        
        return new Result(output, done, nextip);
    }
    


    runProgram(memory: number[], inputValue = 1) : number {
        this.inputValue = inputValue;
        let done = false;
        let output = -1;
        let ip = 0;
       
        while (!done) {
            let result = this.calculateNext(memory, ip);
            done = result.done;
            ip = result.nextip; 
            if (result.output != -1) output = result.output;           
        }
        return output;
    }
}

class Result {
    constructor(output: number, done: boolean = false, nextip: number){
        this.output = output;
        this.done = done;
        this.nextip = nextip;
        
    }
    nextip: number;
    output: number;
    done: boolean;
}

class Operation {
    constructor(op: number, p1: number, p2: number, p3: number){
        this.operator = op;
        this.parameter1mode = p1 ?? 0;
        this.parameter2mode = p2 ?? 0;
        this.parameter3mode = p3 ?? 0;
    }
    operator: number;
    parameter1mode: number;
    parameter2mode: number;
    parameter3mode: number;

    getParamCount(){
        switch(this.operator){
            case ADD_1:
                return 3;
            case MULTIPLY_2:
                return 3;
            case INPUT_3:
            case OUTPUT_4:
                return 1;
            case JUMP_IF_TRUE_5:
            case JUMP_IF_FALSE_6:
                return 2;
            case LESS_THAN_7:
            case EQUALS_8:
                return 3;
        }
        return 0;
    }
}