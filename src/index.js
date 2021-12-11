const fsPromise = require('fs').promises
const path = require('path')

const R = require('ramda')

const getInputFilePath = (filename) => path.resolve(__dirname, '..', 'input', filename)

const getOutputFilePath = (filename) => path.resolve(__dirname, '..', 'output', filename)

const compile = (content) => content

const main = async () => {
  const filename = R.path([
    'argv',
    2
  ], process)

  const content = await fsPromise.readFile(getInputFilePath(filename), {
    encoding: 'utf-8'
  })

  const compiled = compile(content)

  await fsPromise.writeFile(getOutputFilePath(filename), compiled)
}

main()
