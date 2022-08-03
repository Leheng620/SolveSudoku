import React, { Component } from 'react';
import Grid from './component/Grid';
import LeftControl from './component/LeftControl';
import RightControl from './component/RightControl';
import * as sudoku from './algorithm/sudoku';
import * as examples from './example/examples';

class App extends Component{
    state = {
      board:[],
      fontSize:"",
      isValidSudoku:[[],[],[],true],
      solving:false, //Is on solving sudoku
      original:null, //The sudoku before solving
      speed:1, //Running spped
      changeTextColor:false, //Originally empty grids are blue after running
      haveSolution:true, //If not sovlable, display dialog
    }
  
  componentDidMount = () => {
    let board = [];
    for (let i = 0; i < 9; i++){
      board[i] = [];
      for(let j = 0; j < 9; j++){
        board[i][j] = "";
      }
    }
    this.setState({board:board});
    // console.log('didmount')
    window.addEventListener('resize',() => {
        let h = document.getElementById('sudo_container').clientHeight/9;
        this.setState({fontSize:h*0.6+'px'})
    })
    let h = document.getElementById('sudo_container').clientHeight/9;
    this.setState({fontSize:h*0.6+'px'})
  }

  getGrid(){
    let a = [];
    for(let i = 0; i < 81; i++){
      a.push(<Grid key={i} id={i} board={this.state.board} 
        fontSize={this.state.fontSize} check={this.state.isValidSudoku} 
        change={this.changeGrid.bind(this)} original={this.state.original}
        changeTextColor={this.state.changeTextColor} />);
    }
    return a;
  }

  changeGrid = (e) =>{
    let id = e.target.id;
    let targetGrid = id.slice(id.indexOf('-')+1);
    targetGrid = Number(targetGrid);
    let i = Math.floor(targetGrid / 9);
    let j = targetGrid % 9;
    let board = this.state.board;
    if(e.target.value.indexOf("0") !== -1){
        board[i][j] = "";
        this.setState({board: board, changeTextColor:false});
    }
    else if(e.target.value.length === 2){
        board[i][j] = e.target.value.slice(1);
        this.setState({board: board, changeTextColor:false});
    }else{
        board[i][j] = e.target.value;
        this.setState({board: board, changeTextColor:false});
    }
  }

  begin = () =>{
    let isValidSudoku = sudoku.isValidSudoku(this.state.board);
    let isValid = isValidSudoku[3];
    if(!isValid){
        this.setState({isValidSudoku: isValidSudoku})
        // console.log(isValidSudoku);
    }else{
        this.setState({
          isValidSudoku: [[],[],[],true],
          solving:true,
          original:this.state.board,
          changeTextColor:true,
        })
        let state = sudoku.solve(this.state.board);
        this.updateBoard(state);
    }
  }

  updateBoard = (state) => {
    let i = 0;
    let speed = this.state.speed;
    if(state.length === 0) {
      this.setState({solving:false})
      return;
    }
    
    if(speed === 1){ //Solve Instantly
      this.setState({
        board: state[state.length-1],
        solving: false,
        haveSolution:sudoku.done,
      });
      return;
    }
    let interval = setInterval(()=>{
      this.setState({board:state[i]},()=>{i++})
      if(i === state.length){
        clearInterval(interval);
        this.setState({solving:false,haveSolution:sudoku.done})
      }
    }, (1-speed)*1000)
  }

  reset = () => {
    let board = this.state.board;
    this.clear(board);
    this.setState({
      board: board,
      original: board,
      changeTextColor:false,
      isValidSudoku:[[],[],[],true]
    });
  }

  clear = (board) => {
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        board[i][j] = "";
      }
    }
  }

  goBack = () => {
    if(this.state.original){
      this.setState({
        board: this.state.original,
        changeTextColor:false,
        isValidSudoku:[[],[],[],true]
      });
    }
  }

  changeSpeed = (e) => {
    this.setState({speed: Number(e.target.value)});
  }

  closeDialog = () =>{
    this.setState({haveSolution:true});
  }

  getExample = (e) =>{
    let example = e.target.id.slice(e.target.id.indexOf('-')+1);
    example = Number(example);
    switch(example){
      case 1: 
        this.setState({board: examples.buildExample1(),changeTextColor:false}); break;
      case 2:
          this.setState({board: examples.buildExample2(),changeTextColor:false}); break;
      case 3:
          this.setState({board: examples.buildExample3(),changeTextColor:false}); break;
      case 4:
          this.setState({board: examples.buildExample4(),changeTextColor:false}); break;

    }
  }

  render(){
    let lang = navigator.language.slice(0, 2);
    let isChinese = lang === "zh"
    return(
      <div>
        <div id='main-container'>
          <div className='controls panels'>
            <LeftControl />
          </div>
          <div id="sudo_container" className='panels'>
            {this.getGrid()}
          </div>
          <div className='controls panels'>
            <RightControl 
              begin={this.begin} 
              reset={this.reset}
              goBack={this.goBack}
              getExample={this.getExample}
              changeSpeed={this.changeSpeed}
              showError={this.state.isValidSudoku[3]}
              solving={this.state.solving}
              speed={this.state.speed}
              />
          </div>
        </div>
        <div id='block' hidden={this.state.haveSolution}>
          <div id='message'>
            <h3>{isChinese? "无解" : "Not solvable"}</h3>
            <button onClick={this.closeDialog} style={{marginBottom:'2%',cursor:'pointer'}}>Close</button>
          </div>
        </div>
        
      </div>
    )
  }
}

export default App;
