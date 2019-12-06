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
    
    calculateNext(input: number[], index = 0) : Result {
        let done = false;
        var [instruction] = input.slice(index);
        let nextip = ++index;
        let output = -1;
        
        if (this.debug) console.log(`Instruction: ${instruction}`);
        let operation = this.getOperation(instruction);
        nextip += operation.getParamCount();
        if (operation.operator == 1){
           
            const [posA1, posA2, posResult] = input.slice(index);
            if (this.debug) console.log(`Add: ${posA1} ${posA2} ${posResult}`);
            const p1 = operation.parameter1mode == 1 ? posA1 : input[posA1];
            const p2 = operation.parameter2mode == 1 ? posA2 : input[posA2];
            if (this.debug) 
            console.log(`Add: ${p1} ${p1} ${posResult}`);

            input[posResult] = p1 + p2;
        }
        if (operation.operator == 2){
            
            nextip += 3;
            const [posA1, posA2, posResult] = input.slice(index);
            if (this.debug) console.log(`Mul: ${posA1} ${posA2} ${posResult}`);
            const p1 = operation.parameter1mode == 1 ? posA1 : input[posA1];
            const p2 = operation.parameter2mode == 1 ? posA2 : input[posA2];
            if (this.debug) console.log(`Mul: ${p1} ${p2} ${posResult}`);

            input[posResult] = p1 * p2;
        }
        if (operation.operator == 3){
            nextip += 1;
            const [posAddr] = input.slice(index);
            if (this.debug) console.log(`Store: ${this.inputValue} ${posAddr}`);

            input[posAddr] = this.inputValue;
        }
        if (operation.operator == 4){
            nextip += 1;
            const [posAddr] = input.slice(index);
            const outvalue = operation.parameter1mode ? posAddr : input[posAddr];

            console.log(`Output: ${outvalue}`);
            output = outvalue;
        }
        if (operation.operator == 5){
            nextip += 2;
            const [p1,p2] = input.slice(index);
            const test = operation.parameter1mode == 1 ? p1 : input[p1];
            const value = operation.parameter2mode == 1 ? p2 : input[p2];
            if (this.debug) console.log(`Jump true: ${test} ${value}`);

            if (test) nextip = value;
        }
        if (operation.operator == 6){
            nextip += 2;
            const [p1,p2] = input.slice(index);
            const test = operation.parameter1mode == 1 ? p1 : input[p1];
            const value = operation.parameter2mode == 1 ? p2 : input[p2];
            if (this.debug) console.log(`Jump false: ${test} ${value}`);

            if (!test) nextip = value;
        }

        if (operation.operator == 7){
            nextip += 3;
            const [p1, p2, p3] = input.slice(index);
            const arg1 = operation.parameter1mode ? p1 : input[p1];
            const arg2 = operation.parameter2mode ? p2 : input[p2];
            if (this.debug) console.log(`Less than: ${arg1} ${arg2}${p3}: `);

            if (arg1 < arg2) 
                input[p3] = 1;
            else
                input[p3] = 0; 
        }       

        if (operation.operator == 8){
            nextip += 3;
            const [p1, p2, p3] = input.slice(index);
            const arg1 = operation.parameter1mode ? p1 : input[p1];
            const arg2 = operation.parameter2mode ? p2 : input[p2];
            if (this.debug) console.log(`Equals: ${arg1} ${arg2}${p3}: `);
            if (arg1 == arg2) 
                input[p3] = 1;
            else    
                input[p3] = 0;
        }

        if (operation.operator == 99){
            if (this.debug) console.log("done");
            done = true;
        }
        if (operation.operator == undefined){
            throw new Error("Op Undefined");
        }
        
        return new Result(output, done, nextip);
    }
    


    runProgram(input: number[], inval = 1) : number {
        this.inputValue = inval;
        let done = false;
        let output = -1;
        let ip = 0;
       
        while (!done) {
            let result = this.calculateNext(input, ip);
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
            case 1:
                return 3;
        }
        return 0;
    }
}