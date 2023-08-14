import configureFileWritter from "./configureFileWritter.js";

const processFileWritting = async (noticeChanges, configurations, filePath, dockerFileWritter) => {
  if (noticeChanges.container_name) {
    configurations.baseDir = `${configurations.baseDir}-${noticeChanges.container_name}`
  }
  filePath = configureFileWritter(
    dockerFileWritter,
    configurations.baseDir,
    configurations.dockerComposeYmlGenerator
  )
  await dockerFileWritter.write();
  console.log(
    `Great! A docker-compose.yml file has been generated. Check the file ${filePath}`
  );
}

export default processFileWritting