import { readFile, createReadStream } from "fs";
import { createInterface } from "readline";

export class Day01 {
    calculateFuelInclusive(mass: number) : number {
        
        let fuel = 0;
        let fuelRequired = this.calculateFuel(mass);
        
        while (fuelRequired > 0) {            
            fuel += fuelRequired;
            fuelRequired = this.calculateFuel(fuelRequired);    
        }
        
        return fuel;
    }
    public calculateFuel(mass: number) : number {
        const fuel = Math.floor(mass / 3)-2;
        return fuel;
    }

    sumMasses(masses: number[]): number {
        let fuel = 0;
        masses.forEach(mass => {
            fuel += this.calculateFuel(mass);
        });
        
        return fuel;
    }

    async run() {
        let fuel = 0;

       const rl = createInterface({
           input: createReadStream("day01.input.txt")
       });

       rl.on("line", input => {
            const mass = Number.parseInt(input);
            fuel += this.calculateFuelInclusive(mass);
       })

       await rl.once("close", () => { 
           console.log("Read complete");
           console.log(`Fuel required: ${fuel}`);
       });

    }
} 