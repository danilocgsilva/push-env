import fs from "fs";

export default class DevFileWritter {

    #className

    set className(className) {
        this.#className = className
    }

    async writeEnvironmentType() {
        const fullFilePath = "EnvironmentTypes/" + this.#className + "Content.js"
        
        await fs.writeFile(fullFilePath, this.getClassContentBase(), (err) => {
            if (err) {
              console.error(err);
            }
        });

        return fullFilePath
    }
    
    async write() {
        return await this.writeEnvironmentType()
    }

    getClassContentBase() {
        return `import ContentAbstract from "./ContentAbstract.js";

export default class ${this.#className}Content extends ContentAbstract {

    constructor() {
        super()
    }

    generate() {
    }

    getDockerfileContent() {
    }
}
`
    }
}