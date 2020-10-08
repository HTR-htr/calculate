const { Operands } = require("D://Desktop//calculate//Class//Operands")
const { Operandor} = require("D://Desktop//calculate//Class//Operandor") 
const {creatRandom} = require('D://Desktop//calculate//Utils//index')
const $ = require('jquery')
// console.log($)
// console.log(Operands)
// console.log(Operandor)
// var numRange = 6 //默认范围为0-10
// var canBeZero = true //默认是可以为0的
// var denominator = 5 //默认分母为1
// var molecular = 5 // 默认分子为0
// let newOperands1 = new Operands({numRange})//使用的时候一定要传对象，就算是空对象也要传
// console.log('范围为'+newOperands1.numRange)
// console.log('分母为'+newOperands1.denominator)
// console.log('分子为'+newOperands1.molecular)
// console.log(newOperands1.toStr())
// let operandor = '+'
// let newOperandor = new Operandor('-')
// console.log(newOperandor)
// console.log('本次随机生成的运算符'+newOperandor.operandor)
// console.log('本次随机生成的运算符的优先级'+newOperandor.priority)
// $(function(){
//     var $toast = $('#js_toast');
//     var $input = $('#js_input');
//     $input.on('input', function(){
//       if ($input.val()){
//         $('#showTooltips').removeClass('weui-btn_disabled');
//       }else{
//         $('#showTooltips').addClass('weui-btn_disabled');
//       }
//     });
//     $('#showTooltips').on('click', function(){
//       if ($(this).hasClass('weui-btn_disabled')) return;

//       // toptips的fixed, 如果有`animation`, `position: fixed`不生效
//       $('.page.cell').removeClass('slideIn');

//       $toast.fadeIn(100);
//       setTimeout(function () {
//         $toast.fadeOut(100);
//       }, 2000);
//     });
//   });
const {generateQueation} = require('D://Desktop//calculate//Utils//questions')
console.log(generateQueation)
generateQueation(10,100)