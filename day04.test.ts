import { Day04 } from './day04';
import { assert } from 'chai';

const day04 = new Day04();
day04.ignoreRange = true;

describe("Day 4", () => {
    it("can check number is six digit", () => {
        const input = 112233;
        const valid = day04.checkInput(input);
        assert.isTrue(valid);
    });
    
    it("can check number is in range", () => {
        const input = 111111;
        day04.ignoreRange = false;
        const valid = day04.checkInput(input);
        day04.ignoreRange = true;
        assert.isFalse(valid);
    });

    it("can check number has no ajacent equal digits ", () => {
        const input = 234567;
        const valid = day04.checkInput(input);
        assert.isFalse(valid);
    });

    it("can check number has two ajacent equal digits ", () => {
        const input = 234566;
        const valid = day04.checkInput(input);
        assert.isTrue(valid);
    });

    it("can check number have no decreasing digits", () => {
        const input = 123789;
        const valid = day04.checkInput(input);
        assert.isFalse(valid);
    });

    it("can check number have only increasing digits", () => {
        const input = 234566;
        const valid = day04.checkInput(input);
        assert.isTrue(valid);
    });
   
    it("can check number has decreasing digits", () => {
        const input = 223450;
        const valid = day04.checkInput(input);
        assert.isFalse(valid);
    });
    

    it("can not have more than two ajacent", () => {
        const input = 678999;
        const valid = day04.checkInput(input);
        assert.isFalse(valid);
    });
   
    it("last ajacent group cannot be more than two", () => {
        const input = 111122;
        const valid = day04.checkInput(input);
        assert.isTrue(valid);
    });


    it("can check number 123444", () => {
        const input = 123444;
        const valid = day04.checkInput(input);
        assert.isFalse(valid);
    });
   
    it("can check number 112233", () => {
        const input = 112233;
        const valid = day04.checkInput(input);
        assert.isTrue(valid);
    });
   
    it("can check number 666789", () => {
        const input = 666789;
        const valid = day04.checkInput(input);
        assert.isFalse(valid);
    });
});

