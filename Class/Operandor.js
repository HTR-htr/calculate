//操作符类
const {creatRandom} = require('D://Desktop//calculate//Utils//index')
exports.Operandor = class Operandor{
    constructor(operandor = ['+','-','×','÷'][(creatRandom(0,3))]){//可以自动的生成也可以随机生成
        this.operandor = operandor
        this.priority = this.getPriority()   
    }
    getPriority(){ //根据不同运算符返回不同的优先级
        switch(this.operandor){
            case '+':  return 1;
            case '-':  return 1;
            case '×':  return 2;
            case '÷':  return 2;
        }
    }
    toStr(){
        return this.operandor.toString()
    }
}