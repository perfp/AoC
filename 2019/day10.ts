export class Day10 {
    constructor(input: string[]) {
        this.input = input;
    }

    validPathExists(arg0: number[], arg1: number[]): boolean {
        let found = false;
        const [x1, y1] = arg0;
        const [x2, y2] = arg1;
        console.log(`from: ${x1},${y1}`);
        console.log(`to: ${x2},${y2}`);
        let xdir = 1, ydir = 1;
        let x = x1, y = y1;
        if (x > x2) xdir = -1;
        if (y > y2) ydir = -1;
        let done = false;
        let count = 10;
        while (!done) {
            if (count-- == 0) break;
            console.log(`direction: ${xdir},${ydir}`);
            console.log(`testing: ${x + xdir},${y + ydir} : ${x2 == x + xdir && y2 == y + ydir}`);
            if (x2 == x + xdir && y2 == y + ydir) {
                console.log(`found path to: ${y+ydir},${x+xdir}`);
                found = true;
                done = true;
            } else {
                console.log(`testing: ${x + xdir},${y}`);
                if (this.input[y][x + xdir] != "#") {
                    x += xdir;
                }
                console.log(`testing: ${x},${y + ydir}`);
                if (this.input[y + ydir][x] != "#") {
                    y += ydir;
                } else {
                    console.log(`giving up at: ${x},${y}`);
                    done = true;
                }

                if (x2 == x) xdir = 0;
                if (y2 == y) ydir = 0;
            }
        }

        return found;
    }
    input: string[];
}