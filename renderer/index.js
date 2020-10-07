const { Operands } = require("D://Desktop//calculate//Class//Operands")
console.log(Operands)
var numRange = 2 //默认范围为0-10
var canBeZero = true //默认是可以为0的
var denominator = 5 //默认分母为1
var molecular = 5 // 默认分子为0
let newOperands1 = new Operands({numRange})//使用的时候一定要传对象，就算是空对象也要传
console.log('范围为'+newOperands1.numRange)
console.log('分母为'+newOperands1.denominator)
console.log('分子为'+newOperands1.molecular)
console.log(newOperands1.toStr())