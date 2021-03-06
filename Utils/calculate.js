//计算相关方法
const { Operands } = require("D://Desktop//calculate//Class//Operands")
const { Operandor} = require("D://Desktop//calculate//Class//Operandor") 

// 四则运算
const Arithmetic = {
  // 两个操作数求和 
  addOperands(a, b) {
    return new Operands({
      molecular: a.molecular * b.denominator + b.molecular * a.denominator,
      denominator: a.denominator * b.denominator
    });
  },
  // 两个操作数求差
  subOperands(a, b) {
    return new Operands({
      molecular: a.molecular * b.denominator - b.molecular * a.denominator,
      denominator: a.denominator * b.denominator
    });
  },
  // 两个操作数乘法
  multOperands(a, b) {
    return new Operands({
      molecular: a.molecular * b.molecular,
      denominator: a.denominator * b.denominator
    });
  },
  // 两个操作数除法
  divOperands(a, b) {
    return new Operands({
      molecular: a.molecular * b.denominator,
      denominator: a.denominator * b.molecular
    });
  }
}
/**
 * @description: 计算表达式的值
 * @param {Object[]} expression 表达式
 * @return: Oprands 答案实例
 */
exports.calculateExpArr = (expression) => {
  // 将中缀表达式转为后缀表达式
  let temp = []; // 临时存放
  let suffix = []; // 存放后缀表达式
//   扫描到数字直接输出
// 扫描到运算符则与栈顶比较，若扫描到的运算符优先级低于或等于栈顶运算符的优先级，则弹栈直到栈空或栈顶运算符优先级低于扫描到的运算符，之后运算符入栈；否则直接入栈。
// 若扫描到)，则一直弹栈直到(出栈
  expression.forEach(item => {
    if (item instanceof Operands) {
      suffix.push(item) // 遇到操作数,压入 suffix
    } else if (item === '(') {
      temp.push(item); // 遇到左括号,压入 temp
    } else if (item === ')') {
      // 遇到右括号
      while (temp[temp.length - 1] !== '(') {
        suffix.push(temp.pop());
      }
      temp.pop(); // 弹出左括号
    } else if (item instanceof Operandor) {
      // 运算符
      // 如果栈顶是运算符，且栈顶运算符的优先级大于或等于该运算符
      while (temp.length !== 0 &&
        temp[temp.length - 1] instanceof Operandor &&
        temp[temp.length - 1].value >= item.value) {
        suffix.push(temp.pop());
      }
      // 是空栈或者栈顶是左括号亦或是栈顶优先级低，则直接入栈到 temp
      temp.push(item);
    }
  });
  while (temp.length !== 0) {
    suffix.push(temp.pop());
  }
  // 以下过程将后缀表达式计算成答案并转为 Oprands 实例
  const {
    addOperands,
    subOperands,
    multOperands,
    divOperands
  } = Arithmetic; // 四则运算方法
  let answerStack = []; // 存放运算结果
  suffix.forEach(item => {
    if (item instanceof Operands) {
      answerStack.push(item); // 如果是操作数则推入
    } else {
      // 是操作符则弹出最顶出的两个操作数进行运算
      let b = answerStack.pop();
      let a = answerStack.pop();
      let result = null;
      switch (item.operandor) {
        case '+':
          result = addOperands(a, b);
          break;
        case '-':
          result = subOperands(a, b);
          break;
        case '×':
          result = multOperands(a, b);
          break;
        case '÷':
          result = divOperands(a, b);
          break;
        default:
          break;
      }
      answerStack.push(result);
    }
  })
  return answerStack.pop();
}