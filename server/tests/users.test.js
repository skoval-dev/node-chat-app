const expect = require("expect");
const {Users} = require("./../utils/users");

describe("Users", () => {
    "use strict"
    let users = [];

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: "John",
            room: "Animal"
        },{
            id: '2',
            name: "Johny",
            room: "Girls"
        },{
            id: '3',
            name: "Alice",
            room: "Animal"
        }];
    });

    it("Should add new user", () => {
        let users = new Users();
        let user = {
            id: "123",
            name: "Serhii",
            room: "Node.js"
        }
        let res_user = users.add_user(user.id, user.name, user.room);

        expect(users.users).toContainEqual(user);
    });

    it("Should remove a user", () => {
        let user_id = "2";
        let user = users.remove_user(user_id);

        expect(user.id).toBe(user_id);
        expect(users.users.length).toBe(2);
    });

    it("Should not remove a user", () => {
        let user_id = "22";
        let user = users.remove_user(user_id);

        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);
    });

    it("Should find a user", () => {
        let user_id = '2';
        let user = users.get_user(user_id);

        expect(user.id).toBe(user_id);
    });

    it("Should not find a user", () => {
        let user_id = '22';
        let user = users.get_user(user_id);

        expect(user).toBeUndefined();
    });

    it("Should return names for Animal room", () => {
        let user_list = users.get_user_list("Animal");
            expect(user_list).toEqual(["John", "Alice"]);
    });
});