import { useRef } from 'react'; // 导入useRef钩子，用于创建一个引用，这个引用可以持久化地保存数据，但是不会引起组件重新渲染

// 定义一个Answers组件，接收answers、selectedAnswer、answerState和onSelect四个props
export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {

  // 使用useRef创建一个shuffledAnswers引用，用于保存打乱顺序后的答案数组
  const shuffledAnswers = useRef();

  /*
    如果shuffledAnswers.current是空的，说明还没有生成打乱顺序的答案数组。
    将answers复制并打乱顺序，然后保存到shuffledAnswers.current中
  */
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    // 开始渲染答案列表
    // 遍历shuffledAnswers.current，为每个答案生成一个列表项
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {

        // 判断当前遍历到的答案是否被选中
        const isSelected = selectedAnswer === answer;

        // 初始化CSS类字符串
        let cssClass = '';

        // 如果答案状态是answered并且当前答案被选中，CSS类为selected
        if (answerState === 'answered' && isSelected) {
          cssClass = 'selected';
        }

        // 如果答案状态是correct或wrong并且当前答案被选中，CSS类为答案状态
        if (
          (answerState === 'correct' || answerState === 'wrong') &&
          isSelected
        ) {
          cssClass = answerState;
        }

        // 返回一个li元素，其中包含一个button。
        // button的onClick事件处理函数设置为调用onSelect函数并传递当前答案。
        // className设置为之前确定的CSS类。如果answerState不为空，button会被禁用
        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ''}
            > {answer} </button>
          </li>
        );
      })}
      
    </ul>
  );
}

/*
  这个 Answers 组件的作用是展示一组答案选项，并允许用户从中选择一个。
  它通过处理用户交互并根据答案的选择状态来调整其视觉呈现，为用户提供反馈
*/