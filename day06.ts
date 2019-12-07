import { isUndefined } from "util";
import {readFile, readFileSync} from "fs";


export class Day06 {
    parseInput(input: string[]) : number {
        const map = new Map<string, string[]>();
        const satellites = new Set<string>();
        //console.log(`Input: ${input}`);
        input.forEach (item => {
            const [body, sat] = item.split(")");
            satellites.add(sat);
            if (map.has(body)){
                map.get(body)?.push(sat);
            } else {
                map.set(body, [sat]);
            }
        })
        //console.log(map);
        
        const iterator = map.keys();
        let key = iterator.next();;
        let root = key.value;
        //console.log(`Initial root: ${root}`);
        while( !key.done ){
            //console.log(`Testing root: ${key.value}`);
            if (!satellites.has(key.value)){
                //console.log("is new root");
                root = key.value;
            }
            key = iterator.next();
        }
        
        return this.countChildren(root, map, 0);
    }

    newBody(id: string) : Body {
        return {id, satellites: []};
    }

    newBodyWithSatellite(id: string, satellite: string) : Body {
        return {id, satellites: [this.newBody(satellite)]};
    }


    countChildren(root : string, map : Map<string, string[]>, depth : number){
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


    run(){
        
        const input = readFileSync('day06.input.txt', 'utf8').split("\n");
        
        const count = this.parseInput(input);
        console.log(`Result: ${count}`);
    }
}

interface Body {
    id: string,
    satellites : Body[]
}