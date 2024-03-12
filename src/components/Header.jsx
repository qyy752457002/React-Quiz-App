import logoImg from '../assets/quiz-logo.png';

// 这一行定义了一个名为Header的函数组件。
// export default使得该组件可以在其他文件中通过import Header from '相应的路径'的方式被引入并使用
export default function Header() {
  return (
    <header>
      <img src={logoImg} alt="Quiz logo" />
      <h1>ReactQuiz</h1>
    </header>
  );
}