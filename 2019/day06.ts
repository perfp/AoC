import { readFileSync } from "fs";

interface SatelliteMap {
    map: Map<string, string[]>,
    root: string
}
export class Day06 {
    parseInput(input: string[]): number {
        let map = this.createMap(input);
        return this.countChildren(map.root, map.map, 0);
    }

    createMap(input: string[]): SatelliteMap {
        const map = new Map<string, string[]>();
        const satellites = new Set<string>();
        //console.log(`Input: ${input}`);
        input.forEach(item => {
            const [body, sat] = item.split(")");
            satellites.add(sat);
            if (map.has(body)) {
                map.get(body)?.push(sat);
            } else {
                map.set(body, [sat]);
            }
        })
        //console.log(map);
        let root = this.findRoot(map, satellites);


        return { map, root };
    }

    findRoot(map: Map<string, string[]>, satellites: Set<string>) {
        const iterator = map.keys();
        let key = iterator.next();;
        let root = key.value;
        //console.log(`Initial root: ${root}`);
        while (!key.done) {
            //console.log(`Testing root: ${key.value}`);
            if (!satellites.has(key.value)) {
                //console.log("is new root");
                root = key.value;
            }
            key = iterator.next();
        }
        return root;
    }

    newBody(id: string): Body {
        return { id, satellites: [] };
    }

    newBodyWithSatellite(id: string, satellite: string): Body {
        return { id, satellites: [this.newBody(satellite)] };
    }


    countChildren(root: string, map: Map<string, string[]>, depth: number) {
        //console.log(`Depth: ${depth} Root: ${root}` );
        let count = depth;
        const children = map.get(root);
        //console.log("Children", children);
        depth++;
        children?.forEach(s => {
            count += this.countChildren(s, map, depth);
        })
        //console.log("count", count);
        return count;
    }

    findPathToNode(root: string, node: string, map: Map<string, string[]>, path: string[]): boolean {

        const children = map.get(root);
        path.push(root);
        console.log("passing", root);
        let found = false;
        children?.forEach(s => {
            if (s == node) {
                console.log("found");
                found = true;
            }

            if (!found) {
                
                found = this.findPathToNode(s, node, map, path.slice());
            }
        })
        return found;
    }



    part1() {

        const input = readFileSync('day06.input.txt', 'utf8').split("\n");

        const count = this.parseInput(input);
        console.log(`Result: ${count}`);
    }

    part2(){
        const input = readFileSync('day06.input.txt', 'utf8').split("\n");
        const testdata = ["COM)B","B)C","C)D","D)E","E)F","B)G","G)H","D)I","E)J","J)K","K)L","K)YOU","I)SAN"]; 
        let map = this.createMap(testdata);
        let pathToSanta: string[] = [];
        this.findPathToNode(map.root, "SAN", map.map, pathToSanta);
        let pathToYou: string[] = [];
        this.findPathToNode(map.root, "YOU", map.map, pathToYou);
        let lenToSanta = pathToSanta.length;
        let lenToYou = pathToYou.length;
        console.log(lenToSanta, lenToYou);
        for (let i=0;i<Math.min(lenToSanta, lenToYou);i++){
            console.log(i, pathToSanta[i] , pathToYou[i]);
            if (pathToSanta[i] == undefined || pathToYou[i] == undefined || pathToSanta[i] != pathToYou[i]){

                console.log("Left to Santa: " + (lenToSanta - i));
                console.log("Left to You: " + (lenToYou - i));
                break;
            }
        }
    }
    run(){
        this.part2();
    }
}

interface Body {
    id: string,
    satellites: Body[]
}