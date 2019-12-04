import * as mocha from 'mocha';
import * as chai from 'chai';
import {Day01} from './day01';

const assert = chai.assert;
const day01 = new Day01();

it("fuel of mass 12 should be 2 ", () => {
    const fuel  = day01.calculateFuel(12);
    assert.equal(2, fuel);
})

it("fuel of mass 14 should be 2 ", () => {
    const fuel  = day01.calculateFuel(14);
    assert.equal(2, fuel);
})

it("fuel of mass 1969 should be 654 ", () => {
    const fuel  = day01.calculateFuel(1969);
    assert.equal(654, fuel);
})

it("fuel of mass 100756 should be 33583 ", () => {
    const fuel  = day01.calculateFuel(100756);
    assert.equal(33583, fuel);
})

it("fuel of mass 12 should be 2, fuel included", () => {
    const fuel  = day01.calculateFuelInclusive(12);
    assert.equal(2, fuel);
})

it("fuel of mass 14 should be 2 , fuel included", () => {
    const fuel  = day01.calculateFuelInclusive(14);
    assert.equal(2, fuel);
})

it("fuel of mass 1969 should be 966 ", () => {
    const fuel  = day01.calculateFuelInclusive(1969);
    assert.equal(966, fuel);
})

it("fuel of mass 100756 should be 50346 ", () => {
    const fuel  = day01.calculateFuelInclusive(100756);
    assert.equal(50346, fuel);
})

it("should calculate fuel for list of masses", () => {
    const fuel = day01.sumMasses([12, 14]);
    assert.equal(4, fuel);
})