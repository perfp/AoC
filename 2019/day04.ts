import {IntComputer} from './IntComputer';

const input : string = "172851-675869";
const [start, end] = input.split("-").map(s => Number.parseInt(s));

export class Day04 {
    debug = false;
    ignoreRange: boolean = false;
    intComputer = new IntComputer();

    checkInput(input: number) : boolean {
        if (input < 100000 || input > 999999) return false;
        if (!this.ignoreRange && (input < start || input > end)) return false;
        
        return this.checkDigits(input);
    }

    checkDigits(input : number) : boolean {
        let digits = this.intComputer.getDigitsArray(input);
        if (this.debug) console.log(digits);
        let previous : Number = -1;
        
        let digitcount = new Map<Number, number>();
        for (let i=0;i<6;i++){
            const d = digits[i];
            
            // Increasing
            if (d < previous){
                if (this.debug) console.log("decreasing");
                return false;
            }


            let count = digitcount.get(d);
            if (count){
                digitcount.set(d, count+1)
            } else {
                digitcount.set(d, 1);
            }
            if (this.debug) console.log(digitcount);
            previous = d;
        }
        let foundAjacent = false;
        let iterator = digitcount.entries();
        let result = iterator.next();
        while (!result.done){
            if (result.value[1] == 2) foundAjacent = true;
            result = iterator.next();
        }

        return foundAjacent;
    }


    run(){
        let count = 0;
        for (let i=start;i<=end;i++){
            if (this.checkInput(i)) {
                console.log(i);
                count++;
            }
        }
        console.log(count);

    }
}