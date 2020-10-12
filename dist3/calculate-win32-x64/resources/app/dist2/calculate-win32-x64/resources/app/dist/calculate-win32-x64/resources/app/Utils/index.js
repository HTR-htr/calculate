//公共方法
const { dialog } = require('electron').remote; // 文件选择框
/*
*@descriotion: 返回[a,b]中间的任意一个数
*@param a 左区间
*@param b 右区间
*@return 返回随机数
*/
exports.creatRandom =(a,b)=>{
    let randomNum = (a+Math.floor(Math.random()*(b-a+1)))
    return randomNum
}
/**
 * @description: 辗转相除法求最大公约数
 * @param {number} num1 数字1
 * @param {number} num2 数字2
 * @return: num1 和 num2 的最大公约数
 */
exports.gcd = (num1, num2) => {
    let remainder = 0;
    do {
      remainder = num1 % num2;
      num1 = num2;
      num2 = remainder;
    } while (remainder !== 0);
    return num1;
  }
  /**
   * @description: 错误提示框
   * @param {string} title 标题
   * @param {string} msg 提示内容
   */
  exports.errorTip = (title = '错误', msg) => {
    dialog.showMessageBox({
      type: 'error',
      title: title,
      message: msg,
      buttons: ['知道了']
    })
  }