import {IntComputer} from './IntComputer';
import {input} from './day05.input';

const intComputer = new IntComputer();
export class Day05 {
    run(){
        const response = intComputer.runProgram(input, 5);
    }
}

