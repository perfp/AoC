import { Day08 } from './day08';
import { assert } from 'chai';
import { IntComputer } from './IntComputer';

const day08 = new Day08();

describe("Day08", () => {

    it("can split input into layers", ()=> {
        let input = "123456789012";
        let response = day08.splitLayers(input, 3, 2);
        assert.deepEqual(response, [["123", "456"], ["789", "012"]]);
    });

    it("can calculate checksum", ()=> {
        let response = [["212", "011"], ["012", "012"]]
        let checksum = day08.findChecksum(response);
        assert.equal(checksum, 6);
    });

    it ("can render image", () => {
        let input = "0222112222120000";
        let layers = day08.splitLayers(input, 2, 2);
        let image = day08.convertLayersToImage(layers);
        assert.deepEqual(image, ["01","10"]);
    });
});