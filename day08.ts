import {input} from './day08.input';

export class Day08 {
    convertLayersToImage(layers: string[][]) : string[] {
        let image = layers[0];
        for (let l=1;l<layers.length;l++){
            //console.log("image", image);
            let layer = layers[l];
            for (let r=0;r<layer.length;r++){
                let row = layer[r];
                //console.log("row", row);
                
                for (let p=0;p<row.length;p++){
                    let imagerow = image[r];
                    //console.log("imagerow", imagerow);
                    let pixel = row[p];
                    //console.log("pixel", pixel);
                    if (imagerow[p] == "2") {

                        //console.log("changing", imagerow , " to ", imagerow.substr(0, p) + pixel + imagerow.substr(p+1));
                        image[r] = imagerow.substr(0, p) + pixel + imagerow.substr(p+1);
                    }

                }
            }
        }
     
        return image;
    }
    
    splitLayers(input: string, width: number, height: number) : string[][]{
        let layers : string[][] = [];
        let index = 0;
        while (true){
            let rows : string[] = [];
            for (let h=0;h<height;h++){
                rows.push(input.slice(index, index + width));
                index +=width;
            }
            layers.push(rows);
            if (index == input.length) break;
        }
        return layers;
    }

    findChecksum(response: string[][]) : number {
        let maxZeroCount = 100000;
        let maxOneCount =0;
        let maxTwoCount =0;
        
        for (let l=0;l<response.length;l++){
            let oneCount = 0;
            let twoCount = 0;
            let zeroCount = 0;
            for(let r=0;r<response[l].length;r++){
                let test = response[l][r];
                
                zeroCount += test.match(/0/g,)?.length ?? 0;
                oneCount += test.match(/1/g)?.length ?? 0;
                twoCount += test.match(/2/g)?.length ?? 0;
            }
            if (zeroCount < maxZeroCount){                
                maxZeroCount = zeroCount;
                maxOneCount = oneCount;
                maxTwoCount = twoCount;
            }
        }

        return (maxOneCount * maxTwoCount);
    }

    run(){
        const layers = this.splitLayers(input, 25, 6);
        
        const checksum = this.findChecksum(layers);
        console.log(`Checksum: ${checksum}`);

        const image = this.convertLayersToImage(layers);
        image.forEach(r => {
            console.log(r.replace(/1/g, "*").replace(/0/g, " "));
        })

    }




}