import {path1, path2} from './day3.input';

export class Day03 {
    comparePaths(route1 : string, route2: string){
        let path1 = this.createPath(route1);
        let path2 = this.createPath(route2);
        let smallestIntersection = 0;

        path1.forEach(e1 => {
            path2.forEach(e2 => {
                if (e1.x == e2.x && e1.y == e2.y)
                {
                    const distance = Math.abs(e2.x) + Math.abs(e2.y);
                    console.log(`Intersection: ${e2.x},${e2.y}`);
                    if (smallestIntersection==0 || distance < smallestIntersection){
                        smallestIntersection = (distance);
                    }
                }
            });
        });
        return smallestIntersection;
    }

    compareSteps(route1 : string, route2: string){
        let path1 = this.createPath(route1);
        let path2 = this.createPath(route2);
        let shortestWire = 0;
        for (let i=0;i<path1.length;i++){
            for (let j=0;j<path2.length;j++){
                if (path1[i].x == path2[j].x && path1[i].y == path2[j].y){
                    let wirelength = i + j + 2;
                    if (shortestWire == 0 || wirelength < shortestWire) shortestWire = wirelength;
                }
            }
        }
        return shortestWire;
    }

    createPath(route: string) : Point[] {
        let path = new Array<Point>(0);
        let legList = route.split(",");
        let start = {x: 0, y:0};
        legList.forEach(element => {
            const leg = this.createLeg(start, element);
            path.push(...leg);
            start = leg[leg.length-1];
        });

        return path;

    }

    createLeg(start : Point, leg : string) : Array<Point>{
        let xdir = 0;
        let ydir = 0;
        const dir = leg[0];
        const length = Number.parseInt(leg.slice(1, leg.length));
        switch(dir){
            case "R": 
                xdir = 1;
                break;
            case "U": 
                ydir = 1;
                break;
            case "D": 
                ydir = -1;
                break;
            case "L":
                xdir = -1;
                break;

        }
        let points = Array<Point>(length);
        let previous = start;
        for (let i=0;i<length;i++){
            points[i] = {x: previous.x + xdir, y: previous.y + ydir};
            previous = points[i];
        }
        return points;
    }

    part1(){
        var distance = this.comparePaths(path1, path2);
        console.log(`Distance: ${distance}`);
    }

    run(){
        var distance = this.compareSteps(path1, path2);
        console.log(`Distance: ${distance}`);
    }
}
interface Point {
    x: number;
    y: number;
}