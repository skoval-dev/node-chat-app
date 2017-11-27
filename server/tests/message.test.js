const expect = require("expect");
const {generate_message, generate_location_message} = require('./../utils/message');

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


describe("Generate Location Message", () => {
    "use strict"

    it("Should generate correct location object", (done) => {
        let from = "Admin";
        let coords = {
            lat: 23.45678,
            long: -45.23456
        };
        let url = `https://www.google.com/maps?q=${coords.lat},${coords.long}`;

        expect(generate_location_message(from, coords.lat, coords.long)).toMatchObject({from, url});
        done();
    });
});