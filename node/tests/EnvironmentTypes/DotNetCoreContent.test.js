import DotNetCoreContent from "../../EnvironmentTypes/DotNetCoreContent.js"

describe('DotNetCoreContent', () => {

  test('Basic', () => {

    const dotNetCoreContent = new DotNetCoreContent()

    const expectContent = `version: "3.5"

services:
  dotnetcore:
    container_name: dotnetcore
    image: mcr.microsoft.com/dotnet/sdk:6.0
`
    expect(dotNetCoreContent.generate()).toEqual(expectContent)
  })
})