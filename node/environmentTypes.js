import RelationalDb from "./EnvironmentTypes/RelationalDbContent.js"

export default class EnvironmentTypes {
    #types = null
    constructor() {
        this.#types = {
            node: {},
            relationaldb: new RelationalDb()
        }
    }
    getEnvironments() {
        return this.#types
    }
    listTypes() {
        Object.keys(this.#types).forEach(key => {
            console.log('* ' + key)
        })
        return ""
    }
}
