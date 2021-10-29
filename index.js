const fs = require("fs").promises
const path = require("path")

const inDirectory = path.join(__dirname, "in")
const outDirectory = path.join(__dirname, "out")

const readMarkdownFiles = async () => {
  const files  = await fs.readdir(inDirectory, "utf8")
  let promises = []

  files.forEach((fileName) => {
    let filePath = path.join(inDirectory, fileName)
    promises.push(fs.readFile(filePath, "utf8"))
  })

  return Promise.all(promises)

}

const writeMarkdownFiles = async () => {
  const files = await readMarkdownFiles()
  const content = files.join("\n")
  let outputFile = path.join(outDirectory, "index.md")

  fs.writeFile(
    outputFile,
    content
  )
}

writeMarkdownFiles()
