export class Day10 {
    findOpenPath(start: number[], end: number[]) {
        const [x1, y1] = start;
        const [x2,y2] = end;
        let x = x1, y=y1;
        let xdir = 1;
        let ydir = 1;
        if (x > x2) xdir = -1;
        if (y > y2) ydir = -1;
        while(x != x2 || y != y2){
            

            if (this.input[y+ydir][x] == "")
            if (x + xdir == x2) {x = x2; xdir = 0; }
            if (y + ydir == y2) {y = y2; ydir = 0; }
            if (this.input[y+ydir][x] == ".") y += ydir;
            if (this.input[y][x+xdir] == ".") x += xdir;
            
        }
    }
    input: string[];
    constructor(input: string[]){
        this.input = input;
    }
    loopInput() {
        for(let y=0;y<this.input.length;y++){
            for (let x=0;x<this.input[y].length;y++){
                if (this.input[y][x] == "#"){
                    this.countVisibleAsteroids(x, y);
                }
            }
        }
    }
    countVisibleAsteroids(x: number, y: number) {
        for(let y=0;y<this.input.length;y++){
            for (let x=0;x<this.input[y].length;y++){
                if (this.input[y][x] == "#"){
                    this.countVisibleAsteroids(x, y);
                }
            }
        }
    }

}