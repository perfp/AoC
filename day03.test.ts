import { Day03 } from './day03';
import { assert } from 'chai';

const day03 = new Day03();

describe("Day 3", () => {

    it("should make list of points", () => {
        const points = day03.createLeg({x:0,y:0}, "R4");
        assert.equal(4, points.length);
        assert.deepEqual(points, [{x:1, y:0}, {x:2, y:0}, {x:3, y:0}, {x:4, y:0}]);
    });

    it("should trace path for wire", () => {
        var points = day03.createPath("R8,U5,L5,D3");
        assert.equal(21, points.length);
       
    });
    it("should find shortest distance to intersection", () => {
        var distance = day03.comparePaths("R8,U5,L5,D3", "U7,R6,D4,L4");
        assert.equal(6, distance);
        
       
    });

    it("should find shortest distance to intersection", () => {
        var distance = day03.comparePaths("R75,D30,R83,U83,L12,D49,R71,U7,L72", "U62,R66,U55,R34,D71,R55,D58,R83");
        assert.equal(159, distance);
    });


    it("should find shortest distance to intersection", () => {
        var distance = day03.comparePaths("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51", "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7");
        assert.equal(135, distance);
    });

    it("should find shortest wire to intersection", () => {
        var distance = day03.compareSteps("R75,D30,R83,U83,L12,D49,R71,U7,L72", "U62,R66,U55,R34,D71,R55,D58,R83");
        assert.equal(610, distance);
    });
    it("should find shortest wire to intersection", () => {
        var distance = day03.compareSteps("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51", "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7");
        assert.equal(410, distance);
    });
});