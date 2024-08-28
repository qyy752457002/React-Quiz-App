import Header from './components/Header.jsx'; // 导入 Header 组件
import Quiz from './components/Quiz.jsx'; // 导入 Quiz 组件

function App() {
    return (
        <>
            <Header /> {/* 渲染 Header 组件 */}
            <main>
                <Quiz /> {/* 渲染 Quiz 组件 */}
            </main>
        </>
    );
}

export default App;
