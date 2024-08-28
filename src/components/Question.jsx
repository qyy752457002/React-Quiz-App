// 导入React和useState钩子
import { useState } from 'react';

import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';
import QUESTIONS from '../question.jsx';

// Question组件定义
export default function Question({
  // 当前问题的索引
  index,
  // 用户选择答案时的回调函数
  onSelectAnswer,
  // 问题计时结束时的回调函数
  onSkipAnswer,
}) {
  // 组件内部状态，用于跟踪用户的答案选择及其正确性
  const [answer, setAnswer] = useState({
    // 用户选中的答案
    selectedAnswer: '',
    // 答案是否正确，初始为null
    isCorrect: null 
  });

  let timer = 10000;

  /*
    第一行代码检查answer.selectedAnswer是否有值。

    如果有（意味着selectedAnswer属性不是null或undefined），
    则将timer变量设置为1000（毫秒）。
    
    这可能用于控制某种操作（如显示答案、加载新问题等）的延时
  */

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  /*
    第二行代码检查answer.isCorrect属性是否不是null。
    
    如果这个属性已经被设定成了一个布尔值（无论是true还是false），timer就会被设置成2000毫秒
  */
  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  /*
    这行代码的意图是，只有当isCorrect属性被明确设置为true或false时（即已经判断了答案的正确性），
    timer才会被设定为2000毫秒。
    
    如果isCorrect是null，表示答案的正确性尚未被判断，这时不会改变timer的值。
  */

  // 处理答案选择的函数
  function handleSelectAnswer(answer) {
    // 首先设置选中的答案，isCorrect仍然为null
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null
    })

    // 延迟1秒后，计算答案的正确性并更新状态
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer // 假设第一个答案为正确答案
      })

      // 再延迟2秒后，通过onSelectAnswer通知父组件用户已选择答案
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = '';

  // 根据答案的选择状态和正确性来设置答案状态的字符串
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  // 渲染组件UI
  return (
    <div id="question">
      {/* 计时器组件，计时结束时调用onSkipAnswer */}
      <QuestionTimer 
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      {/* 显示当前问题的文本 */}
      <h2>{QUESTIONS[index].text}</h2>
      {/* 答案组件，显示所有答案选项并允许用户选择 */}
      <Answers
        answers={QUESTIONS[index].answers} // 当前问题的所有答案
        selectedAnswer={answer.selectedAnswer} // 用户选择的答案
        answerState={answerState} // 答案的状态，用于视觉反馈
        onSelect={handleSelectAnswer} // 选择答案时的处理函数
      /> 
    </div>
  );
}