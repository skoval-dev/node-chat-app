class Users {
    constructor () {
        this.users = [];
    }

    add_user (id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    remove_user (id) {
        let user = this.get_user(id);

        if (user) {
           this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }

    get_user (id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    get_user_list (room) {
        let users = this.users.filter((user) => user.room === room);
        let names_array = users.map((user) => user.name);

        return names_array;
    }
}

module.exports = {Users};