//括号相关方法
const { creatRandom } = require('D://Desktop//calculate//Utils//index')
const { calculateExpArr } = require('D://Desktop//calculate//Utils//calculate')
/**
 * @description: 给问题数组的每个表达式插入括号的主要函数
 * @param {Array[]} questionArr 表达式未插入括号的问题数组
 * @return: 表达式插入括号后的问题数组
 */
//出于方便直插入一对括号
exports.insertBrackets = (questionArr)=>{
    questionArr.map((item,index)=>{
        if(item.length == 3){   //一个操作符的直接返回不做处理
            return item
        }else{    //两个或者三个操作符的生成0-1对括号
            do{
                var bracketsNum = creatRandom(0,1)
                var newExpArr = []
            if(bracketsNum===0){//随机生成括号数为0不做处理
                newExpArr=item
                return newExpArr
            }else{//随机生成括号书为1,做插入括号操作
                newExpArr = leftBracketLocation(item)
            }
            }while(calculateExpArr(newExpArr)<0)
            return newExpArr
        }
    })  
    return questionArr
}
/**
 * @description: 插入左括号
 * @param {Array[]}  expArr 一条问题表达式
 * @return: 对象,包含插入之后的数组和插入的位置
 */
leftBracketLocation = (expArr)=>{
    let expArrLength = expArr.length
    do{
        var leftBracketLocation = creatRandom(0,expArrLength-3)  //生产的位置必须在随后一个符号前的操作数之前
    }while(leftBracketLocation%2!==0) //不在偶数位置说明位置生成不成功.重新生成
    expArr.splice(leftBracketLocation,0,'(')
    return rightBracketLocation(expArr,leftBracketLocation)
}
/**
 * @description: 插入右括号
 * @param {Array[]}  expArr 一条问题表达式
 * @return: 插入右括号之后的表达式
 */
rightBracketLocation = (expArr,leftBracketLocation)=>{

    let expArrLength = expArr.length
    do{
        var rightBracketLocation = creatRandom(leftBracketLocation+4,expArrLength)
    }while(rightBracketLocation%2!==0)
    expArr.splice(rightBracketLocation,0,')')
    return expArr
}