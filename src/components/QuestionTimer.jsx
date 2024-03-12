// 导入React的useState和useEffect钩子
import { useState, useEffect } from 'react';

// QuestionTimer组件定义
export default function QuestionTimer({ timeout, onTimeout, mode }) {
   // 使用useState钩子初始化remainingTime状态，该状态追踪剩余时间
  const [remainingTime, setRemainingTime] = useState(timeout);

  // 第一个useEffect钩子：在组件挂载时设置一个定时器，当时间到达timeout值时执行onTimeout函数
  useEffect(() => {
    console.log('SETTING TIMEOUT');
    const timer = setTimeout(onTimeout, timeout); // 设置定时器

    // 清理函数：组件卸载时清除定时器
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]); // 依赖列表，当timeout或onTimeout改变时，重新执行该副作用

  // 第二个useEffect钩子：设置一个每100毫秒减少remainingTime的定时器
  useEffect(() => {
    console.log('SETTING INTERVAL');
    const interval = setInterval(() => {
      // 每100毫秒调用setRemainingTime更新剩余时间
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    // 清理函数：组件卸载时清除间隔定时器
    return () => {
      clearInterval(interval);
    };
  }, []); // 空依赖列表，意味着该副作用只在组件挂载时执行一次

  
  /*
      这段代码返回了一个 `<progress>` HTML 元素，它在React组件中用于展示一个任务的完成进度，通常用于加载指示器或进度条。这里是它的具体应用解释：

    - **`id="question-time"`**：为这个进度条元素设置了一个ID `question-time`，这允许你通过CSS或JavaScript特别定位和样式化这个元素。

    - **`max={timeout}`**：`max` 属性定义了进度条的最大值，这里通过 `timeout` 属性动态设置。
                          `timeout` 通常代表总时间或总工作量的量度，用于指示进度条满格所代表的值。

    - **`value={remainingTime}`**：`value` 属性表示当前的进度值，这里使用了 `remainingTime` 状态来动态更新。
                                    `remainingTime` 代表了从开始到现在还剩余的时间或未完成的工作量，
                                    随时间逐渐减少直至任务完成。

    - **`className={mode}`**：`className` 属性用于给元素添加一个或多个类名，以便使用CSS进行样式化。
                              这里通过 `mode` 变量动态设置，允许根据不同的模式或条件改变进度条的样式，
                              例如更改颜色以反映不同的警告级别（如正常、警告、危险等）。

    整体上，这个 `<progress>` 元素通过可视化的方式向用户展示了一个任务（如答题时间）的剩余量，帮助提升用户界面的交互性和用户体验。
    通过动态更新 `remainingTime` 和可选的样式调整（`mode`），它可以灵活地适应不同的场景和需求。

  */
 
  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
}

/*
这段代码实现了一个计时器组件，当计时器开始时，它会设置两个效果（Effect）：

  设置超时：在给定的 timeout 时间后触发 onTimeout 回调函数。
           这是通过一个 setTimeout 定时器实现的，如果组件卸载，定时器会被清除。

  更新剩余时间：通过一个间隔定时器（setInterval），每100毫秒更新一次剩余时间（remainingTime），直到组件卸载或定时器自身被清除。

组件返回一个 <progress> 元素，展示了从开始到结束的时间进度。
*/