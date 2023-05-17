import fs from 'fs'

export class FileWritter
{ 
    #filePath = null
    #fileContent = null
    
    set filePath(filePath) {
        this.#filePath = filePath
    }

    set fileContent(fileContent) {
        this.#fileContent = fileContent
    }
        
    write() {
        fs.writeFile(this.#filePath, this.#fileContent, err => {
            if (err) {
              console.error(err);
            }
          });
    }
}
