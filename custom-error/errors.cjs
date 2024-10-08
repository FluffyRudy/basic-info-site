class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
        this.name = 'NotFoundError';
    }
}

module.exports = { NotFoundError };