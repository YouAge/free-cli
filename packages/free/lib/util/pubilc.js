/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍:
 */
const { spawn, exec } = require('child_process');
const Spinner = require('cli-spinner').Spinner
function isObject(obj){
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * @ 清除空值，
 *  saf: { safg: { safdsag: {dsfds:''} } }, 无法清除
 * */

 function delPropertyOfNull (obj){
  const copObj = {...obj}
  Object.keys(copObj).forEach(item=>{
    if(isObject(copObj[item])){
      copObj[item] = delPropertyOfNull(copObj[item])
    }
    if(!copObj[item] || (Array.isArray(copObj[item]) && copObj[item].length === 0) ) delete copObj[item]
  })
  return copObj
}


/**
 * spinner 进度条
 * */
function spinner(msg, spinnerString = '|/-\\') {
  const spinner = new Spinner(`${msg}.. %s`)
  spinner.setSpinnerString(spinnerString)
  spinner.start()
  return spinner
}



const spawnCommand = (...args) => {
  return new Promise((resole, reject) => {
    const childProcess = spawn(...args);
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on('close', () => {
      resole();
    })
  })
}

const execCommand = (...args) => {
  return new Promise((resolve, reject) => {
    exec(...args, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(stdout.replace('\n', ''));
      // console.log(stderr);
      resolve();
    })
  })
}

module.exports = {
  spawn:spawnCommand,
  exec:execCommand
};

module.exports ={
  isObject,
  delPropertyOfNull,
  spinner,
  spawn:spawnCommand,
  exec:execCommand
}
