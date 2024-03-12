import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../question.jsx';

// 定义Summary组件，接收userAnswers作为props
export default function Summary({ userAnswers }) {
  // 筛选出被跳过的答案（值为null的答案）
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  // 筛选出正确的答案，这里假设正确答案总是QUESTIONS数组中每个问题的answers数组的第一个元素
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

   // 计算被跳过的答案占总答案的百分比
  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );

  // 计算正确答案占总答案的百分比
  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );

  // 计算错误答案的百分比，即100减去被跳过和正确答案的百分比
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  // 渲染组件的UI部分
  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" /> 
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = 'user-answer';

          if (answer === null) {
            cssClass += ' skipped';
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += ' correct';
          } else {
            cssClass += ' wrong';
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3> 
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? 'Skipped'}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}