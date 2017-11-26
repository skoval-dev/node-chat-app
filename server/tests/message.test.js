const expect = require("expect");
const {generate_message} = require('./../utils/message');

describe("Generate Message", () => {
    "use strict"

    it("Should generate correct message object", (done) => {
        let from = "Serhii";
        let text = "Hello John";
        let message = generate_message(from, text);

        expect(message).toMatchObject({from, text});
        expect(typeof message.created_at).toBe("number");
        done();
    });
});