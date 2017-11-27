const expect = require("expect");
const {is_real_string} = require("./../utils/validation");

describe("Check if params is real string", () => {
    "use strict"
    it("Should reject non-string values", () => {
        let res = is_real_string(98);
        expect(res).toBe(false);
    });

    it("Should reject string with only spaces", () => {
        let res = is_real_string("   ");
        expect(res).toBe(false);
    });

    it("Should allow string with non-space characters", () => {
        let res = is_real_string("  Serhii   ");
        expect(res).toBe(true);
    });
});