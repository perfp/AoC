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
    inputValues: number[] = [1];
    memory: number[] = [];
    ip : number = 0;
    done: boolean = false;
    inputIndex: number = 0;

    getOperation(instruction: number) : Operation {
        const digits  = this.getDigitsArray(instruction);
        const [o1, o2, p1, p2, p3] = digits.reverse();
        return new Operation(o1 + (o2 ?? 0) * 10, p1, p2, p3);

    }
    
    getDigitsArray(input: number) : Array<number> {        
        const inputlen = (input < 10) ? 1 : Math.floor(Math.log10(input));
        //if (this.debug) console.log("IL", inputlen);
        let digits = new Array<number>(inputlen);
        for (let i = 0; i <= inputlen; i++) {
            let digit = input % 10;
            //if (this.debug) console.log(digit);
            input = Math.floor(input / 10);
            digits[inputlen - i] = digit;
        }
        return digits;
    }

    calculateNext() : number | undefined {
        
        var instruction = this.memory[this.ip];
        this.ip++;
        let output : number | undefined;
        
        if (this.debug) console.log(`Instruction: ${instruction}`);
        let operation = this.getOperation(instruction);

        if (operation.operator == ADD_1){
            this.add(operation);
        }

        if (operation.operator == MULTIPLY_2){
            this.multiply(operation);
        }

        if (operation.operator == INPUT_3){
            this.input(operation);
        }

        if (operation.operator == OUTPUT_4){
            output = this.output(operation);
        }

        if (operation.operator == JUMP_IF_TRUE_5){
            this.jumpIfTrue(operation);
        }

        if (operation.operator == JUMP_IF_FALSE_6){
            this.jumpIfFalse(operation);
        }

        if (operation.operator == LESS_THAN_7){
            this.lessThan(operation);
        }       

        if (operation.operator == EQUALS_8){
            this.equals(operation);
            this.ip += operation.getParamCount();;
        }

        if (operation.operator == HCF_99){
            if (this.debug) console.log("done");
            this.done = true;
        }
        
        if (operation.operator == undefined){
            throw new Error("Op Undefined");
        }
        //console.log(this.memory);
        return output;
    }
    

    
    private equals(operation: Operation) {
        const [p1, p2, p3] = this.memory.slice(this.ip);
        const arg1 = operation.parameter1mode ? p1 : this.memory[p1];
        const arg2 = operation.parameter2mode ? p2 : this.memory[p2];
        if (this.debug)
            console.log(`Equals: ${p1}:${arg1} == ${p2}:${arg2} set [${p3}]: `);
        if (arg1 == arg2)
            this.memory[p3] = 1;
        else
            this.memory[p3] = 0;
    }

    private lessThan(operation: Operation) {
        const [p1, p2, p3] = this.memory.slice(this.ip);
        const arg1 = operation.parameter1mode ? p1 : this.memory[p1];
        const arg2 = operation.parameter2mode ? p2 : this.memory[p2];
        if (this.debug)
            console.log(`Less than: ${p1}:${arg1} < ${p2}:${arg2} Set [${p3}] `);
        if (arg1 < arg2)
            this.memory[p3] = 1;
        else
            this.memory[p3] = 0;
        this.ip += operation.getParamCount();
        ;
    }

    private jumpIfFalse(operation: Operation) {
        const [p1, p2] = this.memory.slice(this.ip);
        const test = operation.parameter1mode == 1 ? p1 : this.memory[p1];
        const value = operation.parameter2mode == 1 ? p2 : this.memory[p2];
        if (this.debug)
            console.log(`Jump false: ${p1}:${test} => ${value}`);
        this.ip += operation.getParamCount();
        if (!test)
            this.ip = value;
    }

    private jumpIfTrue(operation: Operation) {
        const [p1, p2] = this.memory.slice(this.ip);
        const test = operation.parameter1mode == 1 ? p1 : this.memory[p1];
        const value = operation.parameter2mode == 1 ? p2 : this.memory[p2];
        if (this.debug)
            console.log(`Jump true: ${p1}:${test} => ${value}`);
        this.ip += operation.getParamCount();
        if (test)
            this.ip = value;
    }

    private output(operation: Operation) {
        
        const [posAddr] = this.memory.slice(this.ip);
        const outvalue = operation.parameter1mode ? posAddr : this.memory[posAddr];
        if (this.debug) console.log(`Output: ${outvalue} ${posAddr}`);
        this.ip += operation.getParamCount();
        return outvalue;
    }

    private input(operation: Operation) {
        // if (this.debug)
        //     console.log("Inputs", this.inputValues, this.inputIndex);
        const inputValue = this.inputValues[this.inputIndex++];
        const [posAddr] = this.memory.slice(this.ip);
        if (this.debug)
            console.log(`Store: ${inputValue} ${posAddr}`);
        this.memory[posAddr] = inputValue;
        this.ip += operation.getParamCount();
        ;
    }

    private add(operation: Operation) {
        const [posA1, posA2, posResult] = this.memory.slice(this.ip);
        
        
        const p1 = operation.parameter1mode == 1 ? posA1 : this.memory[posA1];
        const p2 = operation.parameter2mode == 1 ? posA2 : this.memory[posA2];
        if (this.debug)
            console.log(`Add: ${posA1}:${p1} + ${posA2}:${p2}= ${p1+p2} [${posResult}]`);
        
        this.memory[posResult] = p1 + p2;
        this.ip += operation.getParamCount();;
    }
    
    private multiply(operation: Operation) {

        const [posA1, posA2, posResult] = this.memory.slice(this.ip);
      
        const p1 = operation.parameter1mode == 1 ? posA1 : this.memory[posA1];
        const p2 = operation.parameter2mode == 1 ? posA2 : this.memory[posA2];
        if (this.debug)
            console.log(`Mul: ${posA1}:${p1} * ${posA2}:${p2} = ${p1*p2} [${posResult}]`);
        this.memory[posResult] = p1 * p2;
        this.ip += operation.getParamCount();
    }

    
    runProgram(memory: number[], inputValues : number[]=[1]) : number {
        this.ip = 0;
        this.done = false;
        this.inputIndex = 0;
        this.inputValues = inputValues;
        this.memory = memory;
        let output : number | undefined;
       
        while (!this.done) {
            if (this.debug)console.log(`Processing op @ ${this.ip}`);
            let result = this.calculateNext();          
            if (result != undefined) output = result;
        }
        return output ?? -1;
    }
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

export function initializeIntComputer(input : number[] = [] ){
    const intComputer = new IntComputer();
    intComputer.memory = input;
    return intComputer;
}