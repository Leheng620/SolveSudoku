import React,{ Component } from 'react';

class LeftControl extends Component{
    render(){
        let lang = navigator.language.slice(0, 2);
        let isChinese = lang === "zh"
        return(
            <div className='controls-container'>
                {
                    isChinese ?
                    <div>
                        <h4 className='left-ad-container'>
                        &#9758; 调整运行速度可以具体观察回溯算法解题过程。速度是Max时结果都可以秒出。 <br />
                        &#9758; 示例一是中等难度数独，建议速度0.97。<br />
                        &#9758; 示例二是困难难度数独，建议速度0.99。<br />
                        &#9758; 示例三是超级难度数独，0.999的速度仍要跑一分钟以上。<br />
                        &#9758; 示例四无解。<br />
                        &#9758; Go Back可以返回解题前的状态。 <br />
                        &#9758; 如果给定的数独不是唯一解，将会根据算法得出第一个符合条件的答案。 <br /><br />
                        </h4> <br />
                    </div>
                    :
                    <div>
                        <h4 className='left-ad-container'>
                        &#9758; Adjust run speed can visualize the running time of the algorithm.
                        If run speed is max, the result will be displayed immediately.<br />
                        &#9758; Example 1 is medium difficulty, suggest run speed 0.97.<br />
                        &#9758; Example 2 is hard difficulty, suggest run speed 0.99.<br />
                        &#9758; Example 3 is the hardest difficulty, needs to run for about one minute even under run speed 0.999.<br />
                        &#9758; Example 4 is not solvable.<br />
                        &#9758; Go Back can revert the sudoku table before being solved. <br />
                        &#9758; If there are more than one solutions, it will display the first one that the algorithm finds. <br /><br />
                        </h4> <br />
                    </div>


                }

            </div>
        )
    }
}

export default LeftControl;