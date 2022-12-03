const randomIDValues = 100000;

class SessionManager {
    constructor() {
        this.globalID = ~~(Math.random() * randomIDValues);

        this.sessions = new Map();
    }

    getGlobalID() {
        return this.globalID;
    }

    hasID(id) {
        return this.sessions.has(id);
    }

    setSession(id, data) {
        this.sessions.set(id, data);
    }

    getSession(id) {
        return this.sessions.get(id);
    }

    createSession(data) {
        return new Promise((resolve, reject) => {
            let id;

            do {
                id = ~~(Math.random() * randomIDValues);
            } while (this.hasID(id));

            this.setSession(id, data);

            resolve(id);
        });
    }
}

export default new SessionManager();