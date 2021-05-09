/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: spinner 进度条
 */

const Spinner = require('cli-spinner').Spinner

module.exports = function(msg, spinnerString = '|/-\\') {
  const spinner = new Spinner(`${msg}.. %s`)
  spinner.setSpinnerString(spinnerString)
  spinner.start()
  return spinner
}
