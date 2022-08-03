import React, { Component } from 'react';

class Grid extends Component{

    onlyDigit = (k) => {
        let v = document.getElementById("input-"+k).value;
        document.getElementById("input-"+k).value = v.replace(/[^\d]/g,'');
    }

    getFontSize = (k) => {
        if(!document.getElementById('input-'+k))
            return "";
        
    }

    checkRed = (i, j) => {

        let rowCheck = this.props.check[0];
        let colCheck = this.props.check[1];
        let boxCheck = this.props.check[2];
        for(let a = 0; a < rowCheck.length; a++){
            if(i === rowCheck[a]){
                return true;
            }
        }
        for(let a = 0; a < colCheck.length; a++){

            if(j === colCheck[a]){
                return true;
            }
        }
        for(let a = 0; a < boxCheck.length; a++){
            let b = boxCheck[a];
            let lowerRow = Math.floor(b/3)*3;
            let upperRow = Math.floor(b/3)*3+3;
            let lowerCol = b%3*3;
            let upperCol = b%3*3+3;
            if(lowerRow <= i && i < upperRow && lowerCol <= j && j < upperCol){
                return true;
            }
            
            
            
        }
        console.log(this.props.check);
        return false;
    }

    //If the grid is originally empty, set the text color to blue
    checkEmpty = (i,j) => {
        let original = this.props.original;
        if(!original){
            return false;
        }
        if(original[i][j] === ''){
            return true;
        }
        return false;
    }


    render(){
        let id = this.props.id;
        let board = this.props.board;
        let i,j;
        let red = false;
        let empty = false;
        let changeColor = this.props.changeTextColor;
        if(board && board.length !== 0){
            i = Math.floor(id / 9);
            j = id % 9;

            if(!this.props.check[3]){
                red = this.checkRed(i,j);
            }else{
                empty = this.checkEmpty(i,j);
            }
            
        }
        
        return(
            <div>
                <div className='grid-item'>
                    <input 
                    className={'grid-input ' + (board ? i%3===2 ? 'grid-bottom-border ':'':'')
                    +(board ? i%3===0 ? 'grid-top-border ':'':'')
                    +(board ? j%3===0 ? 'grid-left-border ':'':'')
                    +(board ? j%3===2 ? 'grid-right-border':'':'')}
                    id={"input-"+this.props.id}  
                    type='text' maxLength='2' 
                    onInput={()=>{this.onlyDigit(this.props.id)}}
                    onChange={this.props.change}
                    value={board && board.length!==0 ? this.props.board[i][j] : ""}
                    style={{height:'100%',fontSize:this.props.fontSize,
                        backgroundColor:red?'lightsalmon':'',color: empty&&changeColor?'blue':''}} />
                </div>
            </div>
        )
    }
}

export default Grid;