import { Day02 } from "./day02";
import {test, expect} from "bun:test";
const testdata = 
    [
        "7 6 4 2 1",
        "1 2 7 8 9",
        "9 7 6 2 1",
        "1 3 2 4 5",
        "8 6 4 4 1",
        "1 3 6 7 9"
    ];

test("Day2-IsRow1Safe", () =>{
    var day = new Day02();
    var safe = day.isRowSafe("7 6 4 2 1");
    expect(safe).toBeTrue();
});

test("Day2-IsRow2Safe", () =>{
    var day = new Day02();
    var safe = day.isRowSafe("1 2 7 8 9");
    expect(safe).toBeFalse();
});


test("Day2-IsRow3Safe", () =>{
    var day = new Day02();
    var safe = day.isRowSafe(testdata[3]);
    expect(safe).toBeFalse();
});

test("Day2-IsRow4Safe", () =>{
    var day = new Day02();
    var safe = day.isRowSafe(testdata[4]);
    expect(safe).toBeFalse();
});
test("Day2-IsRow5Safe", () =>{
    var day = new Day02();
    var safe = day.isRowSafe(testdata[5]);
    expect(safe).toBeFalse();
});

test("Day2Part2-IsRow1SafeWithDampening", () =>{
    var day = new Day02();
    var safe = day.isRowSafeWithDampening(testdata[0]);
    expect(safe).toBeTrue();
});

test("Day2Part2-IsRow2SafeWithDampening", () =>{
    var day = new Day02();
    var safe = day.isRowSafeWithDampening(testdata[1]);
    expect(safe).toBeFalse();
});

test("Day2Part2-IsRow3SafeWithDampening", () =>{
    var day = new Day02();
    var safe = day.isRowSafeWithDampening(testdata[2]);
    expect(safe).toBeFalse();
});

test("Day2Part2-IsRow4SafeWithDampening", () =>{
    var day = new Day02();
    var safe = day.isRowSafeWithDampening(testdata[3]);
    expect(safe).toBeTrue();
});

test("Day2Part2-IsRow5SafeWithDampening", () =>{
    var day = new Day02();
    var safe = day.isRowSafeWithDampening(testdata[4]);
    expect(safe).toBeTrue();
});
test("Day2Part2-IsRow6SafeWithDampening", () =>{
    var day = new Day02();
    var safe = day.isRowSafeWithDampening(testdata[5]);
    expect(safe).toBeTrue();
});

test("Day2Part2-Complete", () => {
    var day = new Day02();
    var antall = day.calculateCountOfSafe(testdata);
    expect(antall).toBe(4);
});