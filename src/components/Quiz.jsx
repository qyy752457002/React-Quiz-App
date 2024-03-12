// 导入React的useState和useCallback钩子
import { useState, useCallback } from 'react';

// 导入问题数据
import QUESTIONS from '../question.jsx';
// 导入Question组件
import Question from './Question.jsx';

import Summary from './Summary.jsx';

// 定义Quiz组件
export default function Quiz() {
  // 使用useState钩子管理用户答案的状态
  const [userAnswers, setUserAnswers] = useState([]);

  // 当前活跃（正在回答）问题的索引，等于已回答问题的数量
  const activeQuestionIndex = userAnswers.length;
  // 检查测试是否完成，即用户答案的数量是否等于问题总数
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // 定义处理选择答案的函数，使用useCallback钩子避免不必要的重渲染
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer // 用户选择的答案
  ) {
    // 更新用户答案数组，添加新选择的答案
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
    []); // useCallback的依赖数组为空，意味着handleSelectAnswer函数在组件的整个生命周期内不会改变

  // 定义跳过答案的处理函数，当用户选择跳过问题时，同样使用useCallback钩子
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null), // 调用handleSelectAnswer函数，传入null表示跳过
    [handleSelectAnswer] // 依赖handleSelectAnswer函数
  );
  
  // 如果测试完成，则显示总结信息
  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />
  }

  // 否则，渲染当前活跃的问题组件
  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex} // 使用当前问题的索引作为key
        index={activeQuestionIndex} // 传递当前问题的索引
        onSelectAnswer={handleSelectAnswer} // 选择答案的处理函数
        onSkipAnswer={handleSkipAnswer} // 跳过答案的处理函数
      />
    </div>
  );
}

/*
  这个 Quiz 组件的主要功能是管理用户在一个问题集上的答案，并控制问题的显示。
  用户答完所有问题后，组件会显示一个完成测试的消息和图标。
  
  组件使用了 useState 来跟踪用户的答案状态，
  以及 useCallback 钩子来确保回调函数在重新渲染时不会被不必要地重新创建。
*/