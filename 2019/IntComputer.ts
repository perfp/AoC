const ADD_1 = 1;
const MULTIPLY_2 = 2;
const INPUT_3 = 3;
const OUTPUT_4 = 4;
const JUMP_IF_TRUE_5 = 5;
const JUMP_IF_FALSE_6 = 6;
const LESS_THAN_7 = 7;
const EQUALS_8 = 8;
const HCF_99 = 99;


const SET_RELBASE_9 = 9;
export class IntComputer {
    debug: boolean = false;
    printOutput: boolean = false;
    inputValues: number[] = [1];
    memory: number[] = [];
    ip : number = 0;
    done: boolean = false;
    inputIndex: number = 0;
    relativeBase: number = 0;

    getOperation(instruction: number) : Operation {
        const digits  = this.getDigitsArray(instruction);
        const [o1, o2, p1, p2, p3] = digits.reverse();
        return new Operation(o1 + (o2 ?? 0) * 10, [p1??0, p2??0, p3??0]);

    }
    
    getDigitsArray(input: number) : Array<number> {        
        const inputlen = (input < 10) ? 1 : Math.floor(Math.log10(input));
        if (this.debug) console.log("IL", inputlen);
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
        }

        if (operation.operator == SET_RELBASE_9){
            this.setRelBase(operation);
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

    setRelBase(operation: Operation) {
        const arg = this.getValue(operation, 1);
        this.relativeBase += arg;
        if (this.debug)
            console.log(`Adding ${arg} to make relative base ${this.relativeBase}`);
    }
    

    
    private equals(operation: Operation) {
        
        const arg1 = this.getValue(operation, 1);
        const arg2 = this.getValue(operation, 2);
        let p3 = this.getNextArgument();
        if (operation.modes[2] == 2) p3 += this.relativeBase;
        if (this.debug)
            console.log(`Equals: ${arg1} == ${arg2} set [${p3}] `);
        if (arg1 == arg2)
            this.memory[p3] = 1;
        else
            this.memory[p3] = 0;
    }

    private lessThan(operation: Operation) {
        
        const arg1 = this.getValue(operation, 1);
        const arg2 = this.getValue(operation, 2);
        let p3 = this.getNextArgument();
        if (operation.modes[2] == 2) p3 += this.relativeBase;
        if (this.debug)
            console.log(`Less than: ${arg1} < ${arg2} Set [${p3}] `);
        if (arg1 < arg2)
            this.memory[p3] = 1;
        else
            this.memory[p3] = 0;
        
        ;
    }

    private jumpIfFalse(operation: Operation) {
        
        const test = this.getValue(operation, 1)
        const value = this.getValue(operation, 2);
        if (this.debug)
            console.log(`Jump false: ${test} => ${value}`);
        
        if (!test)
            this.ip = value;
    }

    private jumpIfTrue(operation: Operation) {
        
        const test = this.getValue(operation, 1);
        const value = this.getValue(operation, 2);
        if (this.debug)
            console.log(`Jump true: ${test} => ${value}`);
        
        if (test)
            this.ip = value;
    }

    private output(operation: Operation) {
        const outvalue = this.getValue(operation, 1);
        if (this.debug) console.log(`Output: ${outvalue} `);
        return outvalue;
    }

    private input(operation: Operation) {
        if (this.debug)
            console.log("Inputs", this.inputValues, this.inputIndex);
        const inputValue = this.inputValues[this.inputIndex++];
        let posAddr = this.getNextArgument();
        if (operation.modes[0] == 2) posAddr += this.relativeBase;
        if (this.debug)
            console.log(`Store: ${inputValue} ${posAddr}`);
        this.memory[posAddr] = inputValue;
        ;
    }

    private add(operation: Operation) {
        const p1 = this.getValue(operation, 1);
        const p2 = this.getValue(operation, 2);
        let posResult = this.getNextArgument();
        if (operation.modes[2] == 2) posResult += this.relativeBase;
        if (this.debug)
            console.log(`Add: ${p1} + ${p2}= ${p1+p2} [${posResult}]`);
        
        this.memory[posResult] = p1 + p2;
    }
    
    private multiply(operation: Operation) {
        const p1 = this.getValue(operation, 1);
        const p2 = this.getValue(operation, 2);
        let posResult = this.getNextArgument();
        if (operation.modes[2] == 2) posResult += this.relativeBase;
        if (this.debug)
            console.log(`Mul: ${p1} * ${p2} = ${p1*p2} [${posResult}]`);
        this.memory[posResult] = p1 * p2;
        
        //this.ip += operation.getParamCount();
    }

    getNextArgument() : number {
        return this.memory[this.ip++];
    }
    getValue(operation : Operation, param: number) : number {
        const arg = this.getNextArgument();
        let value = -99999999;
        let mode = operation.modes[param-1];
        let address = -1;
        switch (mode){
            case 0: 
                address = arg;
                value = this.memory[arg] ?? 0;                
                break;
            case 1: 
                value = arg;
                break;
            case 2:
                address = this.relativeBase + arg;
                value = this.memory[address] ?? 0;
                break;
        }
        if (this.debug) console.log(`Get Value: #${param} ${mode}: ${address}->${value}`);
        return value;
    }
    
    runProgram(memory: number[], inputValues : number[]=[1]) : number[] {
        this.ip = 0;
        this.done = false;
        this.inputIndex = 0;
        this.inputValues = inputValues;
        this.memory = memory;
        let output : number[] = [];
       
        while (!this.done) {
            if (this.debug)console.log(`Processing op @ ${this.ip}`);
            let result = this.calculateNext();    
            
            if (result != undefined) {
                if (this.printOutput)
                    console.log(`Output: ${result}`);
                output.push(result);
            }
            
        }
        return output;
    }
}

class Operation {
    constructor(op: number, modes : number[] = [0,0,0]){
        this.operator = op;
        
        this.modes = modes.map(s => s ?? 0);
    }
    modes : number[];
    operator: number;

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
            case SET_RELBASE_9:
                return 1;
        }
        return 0;
    }
}

export function initializeIntComputer(input : number[] = [] ){
    const intComputer = new IntComputer();
    intComputer.memory = input;
    return intComputer;
}