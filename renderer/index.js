const { Operands } = require("D://Desktop//calculate//Class//Operands")
const { Operandor} = require("D://Desktop//calculate//Class//Operandor") 
const {creatRandom} = require('D://Desktop//calculate//Utils//index')
const {generateQuestion} = require('D://Desktop//calculate//Utils//questions')
const { calculateExpArr } = require('D://Desktop//calculate//Utils//calculate')
const $ = require('jquery')
console.log($)

let questionRange = document.querySelector('#questionRange')
let questionNum = document.querySelector('#questionNum')
let questionGenerate = document.querySelector('#questionGenerate')
let questionAddr = document.querySelector('#questionAddr')
let answerAddr = document.querySelector('#answerAddr')
let check = document.querySelector('#check')
let toast = document.querySelector('#toast')
let errToast = document.querySelector('#errToast')
let hideErrToast = document.querySelector('#hideErrToast')

questionGenerate.onclick = (e)=>{
    if(questionRange.value&&questionNum.value&&Number(questionRange.value)&&Number(questionNum.value)&&Number(questionNum.value)<10000){
       generateQuestion(questionRange.value,questionNum.value)
       toast.style.display = 'block'
       setTimeout(()=>{
        toast.style.display = 'none'
       },2000)
    }else{
        errToast.style.display = 'block'
    }
}

hideErrToast.onclick= ()=>{
    errToast.style.display = 'none' 
}
// var questionArr = generateQuestion(10,5)
//测试是不是可以获得答案
// console.log(calculateExpArr(questionArr[0]))

