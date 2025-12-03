import { readInput } from "./readInput";

export class Day02 {


    isRowSafe(row: string) {
        
        var numbers = row.split(" ").map(s => parseInt(s));
        var increasing = false;
        var previousNumber = 0;

        if (numbers[1] > numbers[0]) {
            increasing = true;
        }
        for (var i=0;i<numbers.length;i++)
        {
            var n = numbers[i];
            console.log(n);
            if (i > 0) {
                if (increasing && n < previousNumber) {
                    console.log("Decreasing");
                    return false; // Decreasing when it should be increasing
                }

                if (!increasing && n > previousNumber) {
                    console.log("Increasing");
                    return false; // Increasing when it should be decreasing 
                }

                var diff = Math.abs(n - previousNumber);
                console.log(diff);
                if (diff == 0 || diff > 3) {
                    console.log("Diff");
                    return false;
                }
            }
            previousNumber = n;
        }
        return true;

    }

    isRowSafeWithDampening(row: string) {
        
        var numbers = row.split(" ").map(s => parseInt(s));
        var increasing = false;
        var previousNumber = 0;

        if (numbers[1] > numbers[0]) {
            increasing = true;
        }
        var dampened = false;
        for (var i=0;i<numbers.length;i++)
        {
            var n = numbers[i];
            //console.log("N:"+n);
            if (i > 0) {
                if (increasing && n < previousNumber) {
                    console.log("Decreasing");
                    if (dampened)
                        return false; // Decreasing when it should be increasing
                    else 
                    {
                        console.log("Dampened");
                        dampened = true;
                    }
                }

                if (!increasing && n > previousNumber) {
                    console.log("Increasing");
                    if (dampened)
                        return false; // Increasing when it should be decreasing 
                    else 
                    {
                        console.log("Dampened");
                        dampened = true;
                    }
                }

                var diff = Math.abs(n - previousNumber);
                //console.log(diff);
                if (diff == 0 || diff > 3) {
                    console.log("Diff");
                    if (dampened)
                        return false;
                    else
                    {
                        console.log("Dampened");
                        dampened = true;
                    }
                }
            }
            if (!dampened)
                previousNumber = n;
        }
        return true;

    }

    async run() {
        var input = await readInput(2);
        var antall = this.calculateCountOfSafe(input);
        console.log("Antall: ", antall);
    }

    calculateCountOfSafe(input: string[]) {
        var antall = 0;
        input.forEach(element => {
            if (this.isRowSafeWithDampening(element)) antall++;
        });
        return antall;
    }
}