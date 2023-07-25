import DevFileWritter from "./IncludesDev/DevFileWritter.js"

if (process.argv.length < 3) {
    console.log("You need to provides a class name.")
} else {
    const className = process.argv[2]
    const devFileWritter = new DevFileWritter()
    devFileWritter.className = className
    const createdFile = await devFileWritter.write()
    console.log(`File ${createdFile} created. Please, alter this one to create the new Docker content`)
    console.log("Does not forget as well to alter the Includes/EnvironmentTypes.js file to include the brand new class generating docker content and the README.md documentation.")
}
