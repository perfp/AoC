import { readInput } from "./readInput";

export class Day01 {

    findArrays(testinput: string[]): InputSet {


        var left = new Array<number>();
        var right = new Array<number>();
        let inputs: InputSet = { left, right };

        testinput.forEach((value) => {
            let values = value.split("   ");
            if (parseInt(values[0]) && parseInt(values[1])) {
                left.push(parseInt(values[0]));
                right.push(parseInt(values[1]));
            }
        });
        //console.log(left);
        //console.log(right);
        return inputs;
    }

    findDistances(inputs: InputSet) {
        let leftsorted = inputs.left.sort();
        let rightsorted = inputs.right.sort();

        //console.log(leftsorted);
        //console.log(rightsorted);
        var distances = new Array<number>();
        leftsorted.forEach((element, index) => {
            let lval = element;
            let rval = rightsorted[index];
            let distance = (lval - rval);

            distances.push(Math.abs(distance));
        });
        //console.log(distances);
        console.log("Sum", distances.reduce((p, c) => {
            //console.log(p);
            return p + c;
        }));

    }


    findSimilarites(inputs: InputSet) {
        var similarities = new Array<number>();
        inputs.left.forEach(element => {
            //console.log(element);
            var count = inputs.right.filter(value => value === element).length;
            similarities.push(count * element);
        })
        //console.log(similarities);
        console.log("Sum", similarities.reduce((p, c) => {
            //console.log(p);
            return p + c;
        }));
    }



    async run() {
        console.log("running day01");
        
        var input = await readInput(1);
        var array = this.findArrays(input);
        this.findDistances(array);
        
        array = this.findArrays(input)
        this.findSimilarites(array);
    }
}

type InputSet = {
    left: Array<number>;
    right: Array<number>;
}