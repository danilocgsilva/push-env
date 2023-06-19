export default class ContentAbstract
{
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
}