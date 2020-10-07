//公共方法
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