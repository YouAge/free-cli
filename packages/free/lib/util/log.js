/**
 *@ github： https://github.com/YouAge
 *@ 文件介绍: log 设置
 */



const log = require('npmlog')

log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL:'info'; // 判断bug模式

log.heading = 'free' // 添加前缀
log.headingStyle = {fg:'red',bg:'black'} // 修改前缀的颜色
log.addLevel = ('success',2000, {fg:'green',bold:true}) // 添加自定义命令


module.exports = log
