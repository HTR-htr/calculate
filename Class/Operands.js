//操作数类
const {creatRandom} = require('D://Desktop//calculate//Utils//index')
module.exports ={
    Operands :class Operands{
        constructor({
            numRange = 10, //默认范围为0-10,默认输入的数大于0，前端判定范围大于0
            canBeZero = true,  //默认是可以为0的
            denominator = null, //默认分母为1
            molecular = null  // 默认分子为0
        }){
           
            this.numRange = numRange
            this.canBeZero = canBeZero
            this.denominator = (denominator!==null?Number(denominator):creatRandom(1,numRange)) //没给分母赋值的话，从1到numRange生成一个[1,numRange]
            this.molecular = (molecular!==null?Number(molecular):creatRandom(canBeZero?0:1,this.numRange*this.denominator) )//分子有没有赋值，没有赋值先看看是不是可以为0，可以则从[0,numRange*this.denominator]，否则[1,numRange*this.denominator]
        } 
        //将函数转换成为a'b/c字符串的形式
        toStr(){
            let absDenominator = Math.abs(this.denominator)
            let absMolecular = Math.abs(this.molecular)
            let integer = Math.floor(absMolecular/absDenominator) //假分数前面的值
            let molecular = absMolecular%absDenominator
            if(molecular===0) return `${integer}` 
            return `${integer}'${molecular}/${absDenominator}`
        }
    }
}
