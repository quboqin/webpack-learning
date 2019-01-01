const chalk = require('chalk')

const path = require('path')
const fs = require('fs')

module.exports = function () {
  console.log(chalk.yellow('__filename = %s \n__dirname = %s', __filename, path.resolve(__dirname)))
  console.log(chalk.yellow('. = %s', path.resolve('.')))

  console.log(require('../../../assets/media/config.json'))
  console.log(chalk.yellow(fs.readFileSync(path.resolve(__dirname, '../../../assets/media/sometext.txt'), 'utf8')))
  console.log(chalk.red.bgYellow('the next readFileSync() will throw out an exception if the working directory is not on the top of src!'))
  console.log(chalk.red.bgYellow(fs.readFileSync('./assets/media/sometext.txt', 'utf8')))
}