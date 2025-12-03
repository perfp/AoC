export async function readInput(day : number) {

    const path = `./input${day}.txt`;
    const file = Bun.file(path);
    const input = await file.text();
    
    return input.split("\n").filter(s => s != "");
}