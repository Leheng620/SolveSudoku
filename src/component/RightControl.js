import React,{ Component } from 'react';

class RightControl extends Component{
    render(){
        let lang = navigator.language.slice(0, 2);
        let isChinese = lang === "zh"
        return(
            <div className='controls-container'>
               <div id='right-button-container'>
                   <span style={{textAlign:'left',fontWeight:'bold'}}>{isChinese? "运行速度" : "Run Speed"}</span><br />
                   <input className='control-slider' type='range' min='0.7' max='1' step='0.001' 
                    value={this.props.speed} onChange={this.props.changeSpeed} disabled={this.props.solving}/>

                    <span>&#8592; {this.props.speed === 1 ? 'Max':this.props.speed} &#8594;</span><br />
                   <button className='control-button' onClick={this.props.begin} disabled={this.props.solving}>
                       Go!
                    </button><br />
                   <button className='control-button' onClick={this.props.goBack} disabled={this.props.solving}>
                       Go Back
                    </button><br />
                   <button className='control-button' onClick={this.props.reset} disabled={this.props.solving}>
                       Reset
                    </button><br />
                   <button className='control-button' id='example-1' disabled={this.props.solving} onClick={this.props.getExample}>
                        {isChinese? "示例一" : "Example 1"}
                    </button><br />
                   <button className='control-button' id='example-2' disabled={this.props.solving} onClick={this.props.getExample}>
                        {isChinese? "示例二" : "Example 2"}
                    </button><br />
                   <button className='control-button' id='example-3' disabled={this.props.solving} onClick={this.props.getExample}>
                        {isChinese? "示例三" : "Example 3"}
                    </button><br />
                   <button className='control-button' id='example-4' disabled={this.props.solving} onClick={this.props.getExample}>
                        {isChinese? "示例四" : "Example 4"}
                    </button>
                </div> 
                <div id='error-message' hidden={this.props.showError}>
                    {isChinese? "输入的数独不成立" : "Input sudoku is invalid"}
                </div>
            </div>
        )
    }
}

export default RightControl;