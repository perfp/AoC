export class IntComputer {
    debug: boolean = false;
    getOperation(instruction: number) : Operation {
        const digits  = this.getDigitsArray(instruction);
        const [o1, o2, p1, p2, p3] = digits.reverse();
        return new Operation(o1.valueOf() + (o2 ?? 0).valueOf() * 10, p1, p2, p3);

    }
    
    getDigitsArray(input: number) : Array<Number> {
        
        const inputlen = Math.floor(Math.log10(input));
        //console.log(inputlen);
        let digits = new Array<Number>(inputlen);
        for (let i = 0; i <= inputlen; i++) {
            let digit = input % 10;
            if (this.debug) console.log(digit);
            input = Math.floor(input / 10);
            digits[inputlen - i] = digit;
        }
        return digits;
    }
}

class Operation {
    constructor(op: Number, p1: Number, p2: Number, p3: Number){
        this.operator = op;
        this.parameter1mode = p1 ?? 0;
        this.parameter2mode = p2 ?? 0;
        this.parameter3mode = p3 ?? 0;
    }
    operator: Number;
    parameter1mode: Number;
    parameter2mode: Number;
    parameter3mode: Number;
}