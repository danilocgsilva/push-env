import configureFileWritter from "./configureFileWritter.js";

const processFileWritting = async (noticeChanges, configurations, filePath, fileWriter) => {
  if (noticeChanges.container_name) {
    configurations.baseDir = `${configurations.baseDir}-${noticeChanges.container_name}`
  }
  filePath = configureFileWritter(
    fileWriter,
    configurations.baseDir,
    configurations.dockerComposeYmlGenerator
  )
  await fileWriter.write();
  console.log(
    `Great! A docker-compose.yml file has been generated. Check the file ${filePath}`
  );
}

export default processFileWritting