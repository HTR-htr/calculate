//题目相关方法
// const { writeFile , readFileToArr } = require('D://Desktop//calculate//Utils//file')
const { creatRandom } = require('D://Desktop//calculate//Utils//index')
const { Operands } = require('D://Desktop//calculate//Class//Operands')
const { Operandor} = require('D://Desktop//calculate//Class//Operandor') 
const { calculateExpArr } = require('D://Desktop//calculate//Utils//calculate')
const { insertBrackets } = require('D://Desktop//calculate//Utils//brackets')
const fs = require('fs');
const readline = require('readline');
const path = require('path');

/**
 * @description: 读取文件每一行并转换为数组
 * @param {string} fReadName 文件名路径 
 * @param {func} callback 回调函数 
 * @return: 由文件每一行组成的数组
 */
let readFileToArr = (fReadName, callback)=>{
  let fRead = fs.createReadStream(fReadName); // 创建读取流
  let objReadline = readline.createInterface({    // 实例化接口对象
    input: fRead
  });
  let lines = [];
  // 按行读取放入数组
  objReadline.on('line', (line) => {
    lines.push(line);
    console.log(lines)
  });
  objReadline.on('close', function () {
    callback && callback(lines);
  });
}

/**
 * @description: 写入文件
 * @param {string} 文件名，写在根目录下
 * @param {string} data 写入文件的内容
 */
let writeFile = (fileName, data) => {
  let filePath = path.join(__dirname, `../file/${fileName}`);  // 文件放在根目录
  fs.writeFile(filePath, data, err => {
    if (err) {
      console.error('文件写入失败');
    } else {
      console.log('文件写入成功');
    }
  })
}
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
            while(calculateExpArr(expArr).value<0){//看看结果是不是正数
                let newOperandsNum = new Operands({numRange,canBeZero})
                expArr.pop()
                expArr.push(newOperandsNum)
            }
            //当operandorNum与j相同的时候就不再生成了
            if(j !== operandorNum){
                let newOperandor = new Operandor()//随机生成四则运算操作数
                canBeZero = (newOperandor.operandor==='÷')?false:true;
                expArr.push(newOperandor)
            } 
        }
        questionArr.push(expArr) //生成完之后放入数组
    }
    //将数组表达式插入括号
    let insertBracketsArr = insertBrackets(questionArr)
    console.log(insertBracketsArr)
    // console.log(calculateExpArr(insertBracketsArr[0]))
    let strQuestionsArr = questionsToStr(insertBracketsArr);
    // //题目转为写入写入文件格式
    let answers = insertBracketsArr.map((exp, index) => `${index+1}. ${calculateExpArr(exp).toStr()}`);
    // //题目答案转为写入文件格式
    writeFile('Exercises.txt', strQuestionsArr.join('\n'));
    writeFile('Answers.txt', answers.join('\n'));
    //题目和答案装入写入文件
}
/**
 * @description: 题目数组遍历转换为题目格式(string[]) 
 * @param {Array[]} questionArr  题目数组
 * @return: 转为固定格式的题目字符串数组 例如：1. a + b + c = 
 */
let questionsToStr = questionArr => questionArr.map((expression, index) => {
    let str = expression.map(item => (typeof item === 'object') ? item.toStr() : item);
    str.unshift(`${index + 1}. `);
    return str.join('').concat(' = ');
  })

  /**
 * @description: 分析题目文件并生成答案，与自己的答案文件进行比对生成 Grade.txt
 * @param {string} exercisefile 题目文件的路径
 * @param {string} answerfile 答案文件的路径
 */
exports.analyzeQuestions = (exercisefile, answerfile) => {
    // 读取题目文件
    readFileToArr(exercisefile, (strQuestionsArr) => {
    // readFileToArr(exercisefile, function(strQuestionsArr){
        console.log('进入回调了')
        console.log(strQuestionsArr)
      // 解析每一个题目，并得到一个嵌套答案数组[[],[],[]]
      let realAnswersArr = strQuestionsArr.map(item => {
        console.log(item)
        // console.log(123)
        let expArr = [];
        // 去除开头的 '1. '和结尾的 ' == '
        item = item.substring(item.indexOf(".") + 1, item.indexOf(" = ")).trim();
        expArr = item.split(""); // 字符串先转为数组，为了在括号旁边插入空格
        // 括号旁边插入空格
        
        console.log(expArr)
        for (let i = 0; i < expArr.length; i++) {
          console.log(1)
          if (expArr[i] === '(') {
            expArr.splice(i++ + 1, 0, " ");
          } else if (expArr[i] === ')') {
            expArr.splice(i++, 0, " ");
          }
        }
        console.log(expArr)
        // 通过空格隔开操作数、操作符与括号
        expArr = expArr.join("").split(" ");
        console.log('空格隔开操作数之后的expArr')
        console.log(expArr)
        // 将字符串表达式转为对应可运算的类
        let answer = expArr.map(item => {
          if (["+", "×", "÷", "-"].indexOf(item) >= 0) {
            return new Operandor(item); // 操作符
          } else if ("(" === item || ")" === item) {
            return item; // 括号
          } else {
            // 操作数，则将操作数的带分数的整数部分、分母、分子分离,并返回操作数实例
            let element = item.split(/'|\//).map(item => parseInt(item));
            console.log(element)
            switch (element.length) {
              case 1:
                // 操作数是整数
                return new Operands({
                  denominator: 1, // 分母
                  molecular: element[0] // 分子
                });
              case 2:
                // 操作数不是带分数的分数
                return new Operands({
                  denominator: element[1],
                  molecular: element[0]
                });
              case 3:
                // 操作数是带分数
                return new Operands({
                  denominator: element[2],
                  molecular: element[0] * element[2] + element[1]
                });
            }
          }
        })
        console.log((answer))
        return calculateExpArr(answer)
      })
      console.log('生成到这')
      // 将答案文件与标准答案进行比对
      console.log(realAnswersArr)
      let realAnswerArrToStr = realAnswersArr.map((item)=>{
        return item.toStr()
      })
      console.log(realAnswerArrToStr)
      compareAnswers(answerfile, realAnswersArr);
    });
  }
  
  /**
   * @description: 将答案文件与标准答案进行比对
   * @param {string} answerfile 答案文件的路径 
   * @param {string[]} realAnswer 正确答案的数组 
   */
  let compareAnswers = (answerfile, realAnswer) => {
    console.log(realAnswer)
    // 解析答案文件
    readFileToArr(answerfile, (strAnswersArr) => {
      // 去除答案文件的序号
      let analyzedAnswersArr = strAnswersArr.map(item => {
        console.log(item)
        return item.substring(item.indexOf(".") + 1).trim();
      })
      let wrongNumArr = []; // 记录错题序号
      let rightNumArr = []; // 记录对题序号
      analyzedAnswersArr.forEach((item, index) => {
        // 答案相同则推入rightNumArr，否则推入wrongNumArr
        console.log(index)
        console.log(item);
        console.log(realAnswer[index].toStr());
        (item === realAnswer[index].toStr()) ? rightNumArr.push(index + 1): wrongNumArr.push(index + 1);
      })
      // 写入根目录的 Grade.txt 文件
      writeFile("Grade.txt", `Correct: ${rightNumArr.length}(${rightNumArr.join(",")})\nWrong: ${wrongNumArr.length}(${wrongNumArr.join(",")})`);
    });
  }