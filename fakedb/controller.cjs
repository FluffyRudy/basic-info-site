const fakeDB = {
    users: {},
    nextID: 1,
    prevID: null,

    createUser: async function (name, email) {

        await fakeSleep();

        const id = this.nextID++;
        this.users[id] = { id, name, email };

        return this.users[id];
    },

    getUser: async function (id) {
        await fakeSleep();
        return this.users[id] || null;
    },

    updateUser: async function (id, updatedData) {
        await fakeSleep()
        if (this.users[id]) {
            this.users = { ...this.users[id], ...updatedData };
            return this.users[id];
        }
        return null;
    },
};


async function fakeSleep() {
    return new Promise((resolve) => {
        setTimeout(() => { resolve() }, 1000);
    })
}


module.exports = { fakeDB };