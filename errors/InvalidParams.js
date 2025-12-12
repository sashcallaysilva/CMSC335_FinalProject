class InvalidParams extends Error {
    constructor(message, errType) {
        super(message);
        this.name = `InvalidParams:${errType}`;
    }
}

module.exports = InvalidParams;