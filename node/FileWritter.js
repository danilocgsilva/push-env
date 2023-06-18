import fs from "fs";
import path from "path";

export class FileWritter {
  #filePath = null;
  #fileContent = null;

  set filePath(filePath) {
    this.#filePath = filePath;
  }

  set fileContent(fileContent) {
    this.#fileContent = fileContent;
  }

  async write() {
    const folderPath = path.dirname(this.#filePath);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    await fs.writeFile(this.#filePath, this.#fileContent, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
}
