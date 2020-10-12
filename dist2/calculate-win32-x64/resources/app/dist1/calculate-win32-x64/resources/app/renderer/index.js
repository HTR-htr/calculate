const { Operands } = require("D://Desktop//calculate//Class//Operands")
const {  Operandor } = require("D://Desktop//calculate//Class//Operandor") 
const { creatRandom } = require('D://Desktop//calculate//Utils//index')
const { generateQuestion , analyzeQuestions } = require('D://Desktop//calculate//Utils//questions')
const { calculateExpArr } = require('D://Desktop//calculate//Utils//calculate')
const { dialog } = require('electron').remote

let questionRange = document.querySelector('#questionRange')
let questionNum = document.querySelector('#questionNum')
let questionGenerate = document.querySelector('#questionGenerate')
let questionAddr = document.querySelector('#questionAddr')
let answerAddr = document.querySelector('#answerAddr')
let check = document.querySelector('#check')
let toast = document.querySelector('#toast')
let errToast = document.querySelector('#errToast')
let hideErrToast = document.querySelector('#hideErrToast')
let questionDetailAddr = document.querySelector('#questionDetailAddr')
let answerDetailAddr = document.querySelector('#answerDetailAddr')
let checkFilePath = []

questionGenerate.onclick = (e)=>{
    if(questionRange.value&&questionNum.value&&Number(questionRange.value)&&Number(questionNum.value)&&Number(questionNum.value)<10001){
       generateQuestion(questionRange.value,questionNum.value)
       toast.style.display = 'block'
       setTimeout(()=>{
        toast.style.display = 'none'
       },2000)
    }else{
        errToast.style.display = 'block'
    }
}
//隐藏参数错误提示对话框
hideErrToast.onclick = ()=>{
    errToast.style.display = 'none' 
}
questionAddr.onclick = ()=>{
    dialog.showOpenDialog({
        title:'请选择要校对的题目',
        defaultPath:'Exercises.txt',
        buttonLabel:'选择题目',
        filters:[
            {name:'txt',extensions:'txt'}
        ],
    }).then(res=>{
        questionDetailAddr.innerHTML = res.filePaths
        checkFilePath[0]=res.filePaths[0]
    })
} 
answerAddr.onclick = ()=>{
    dialog.showOpenDialog({
        title:'请选择题目答案',
        defaultPath:'Answers.txt',
        buttonLabel:'选择答案',
        filters:[
            {name:'txt',extensions:'txt'}
        ],
    }).then(res=>{
        answerDetailAddr.innerHTML = res.filePaths
        checkFilePath[1]=res.filePaths[0]
    })
} 

check.onclick = ()=>{
    console.log(checkFilePath)
    analyzeQuestions(checkFilePath[0], checkFilePath[1]);
    dialog.showMessageBox({
      type: 'none',
      title: '校对完毕',
      message: '已在文件根目录生成Grade.txt文件',
      buttons: ['知道了']
    })
} 
// var questionArr = generateQuestion(10,5)
//测试是不是可以获得答案
// console.log(calculateExpArr(questionArr[0]))

