export default class ShallNotReplaceFile extends Error {
    constructor(message) {
        const defaultMessage = "A file exists. Shall not make replacements."
        super(message ? message : defaultMessage);
        this.name = "ShallNotReplaceFile";
    }
}