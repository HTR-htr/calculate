const { Operands } = require("D://Desktop//calculate//Class//Operands")
const { Operandor} = require("D://Desktop//calculate//Class//Operandor") 
const {creatRandom} = require('D://Desktop//calculate//Utils//index')
console.log(Operands)
console.log(Operandor)
var numRange = 6 //默认范围为0-10
var canBeZero = true //默认是可以为0的
var denominator = 5 //默认分母为1
var molecular = 5 // 默认分子为0
let newOperands1 = new Operands({numRange})//使用的时候一定要传对象，就算是空对象也要传
console.log('范围为'+newOperands1.numRange)
console.log('分母为'+newOperands1.denominator)
console.log('分子为'+newOperands1.molecular)
console.log(newOperands1.toStr())
let operandor = '+'
let newOperandor = new Operandor('-')
console.log(newOperandor)
console.log('本次随机生成的运算符'+newOperandor.operandor)
console.log('本次随机生成的运算符的优先级'+newOperandor.priority)