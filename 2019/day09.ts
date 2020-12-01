import {input} from './day09.input';
import { IntComputer } from './IntComputer';

export class Day09 {
    run(){
        const intComputer = new IntComputer();
        const output = intComputer.runProgram(input, [2]);
        console.log(output);
    }
}