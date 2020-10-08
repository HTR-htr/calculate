//题目相关方法
const { creatRandom } = require('D://Desktop//calculate//Utils//index')
const { Operands } = require('D://Desktop//calculate//Class//Operands')
const { Operandor} = require('D://Desktop//calculate//Class//Operandor') 
const { calculateExpArr } = require('D://Desktop//calculate//Utils//calculate')
const { insertBrackets } = require('D://Desktop//calculate//Utils//brackets')
console.log(insertBrackets)
/*
*@descriotion: 生成题目的函数,成为数组
*@param questionRange 生成题目的范围
*@param questionNum 生成题目的数目
*@return 返回题目数组
*/
exports.generateQuestion = (numRange,questionNum)=>{
    let questionArr = []
    let canBeZero = true
    for(let i=0;i<questionNum;i++){
        let operandsNum = creatRandom(2,4) //随机生成操作数[2,4] 
        let operandorNum = operandsNum-1 //生成操作符[1,3]
        let expArr = [] //式子数组

        for(let j=0;j<operandsNum;j++){
            let newOperandsNum = new Operands({numRange,canBeZero})
            expArr.push(newOperandsNum)

            while(calculateExpArr(expArr)<0){//看看结果是不是正数
                let newOperandsNum = new Operands({numRange,canBeZero})
                expArr.pop()
                expArr.push(newOperandsNum)
            }
            //当operandorNum与j相同的时候就不再生成了
            if(j !== operandorNum){
                let newOperandor = new Operandor()//随机生成四则运算操作数
                newOperandor==='÷'?canBeZero=false:canBeZero=true
                expArr.push(newOperandor)
            } 
        }
        questionArr.push(expArr) //生成完之后放入数组
    }
    // return questionArr
    //将数组表达式插入括号
    insertBrackets(questionArr)
    //题目转为写入写入文件格式
    //题目答案转为写入文件格式
    //题目和答案装入写入文件
}