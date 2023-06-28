export default class ContentAbstract {
    _containerName

    constructor() {
        this._containerName = ""
    }

    setContainerName(containerName) {
        this._containerName = containerName
    }

    getContainerName() {
        return this._containerName
    }

    addBlankLine(stringToInsertBlankLine, lineNumber) {
        const lines = stringToInsertBlankLine.split("\n")

        if (lineNumber >= 0 && lineNumber <= lines.length) {
            lines.splice(lineNumber, 0, "")
        } else {
            throw new Error("Line number is out of range.")
        }

        return lines.join("\n")
    }
}