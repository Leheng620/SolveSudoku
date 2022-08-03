//This file contains the main algorithm
//including checking if the soduku is valid
//and the backtrack algorithm to solve soduku

export var done = false;

class Board{
    constructor (board) {
        this.board = board;
        this.free = this.countFree();
        this.move = [];
        for(let i= 0; i < 81; i ++) {
            this.move.push(null);
        }
    }

    countFree(){
        let count = 0;
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                if(this.board[i][j] === '') {
                    count++;
                }
            }
        }
        return count;
    }
    
}
class Point{
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return "(" + this.x + "," + this.y + ")";
    }
}

export function isValidSudoku(board){
    let valid = true;
    let rowInvalid = [];
    let colInvalid = [];
    let boxInvalid = [];
    for(let i = 0;i < 9;i++){
        let rowCheck = [false,false,false,false,false,false,false,false,false];
        let colCheck = [false,false,false,false,false,false,false,false,false];
        let boxCheck = [false,false,false,false,false,false,false,false,false];
        for(let j = 0;j< 9;j++){
            if(board[i][j] !== ''){
                if(rowCheck[board[i][j] - '1']) {
                    rowInvalid.push(i);
                    valid = false;
                }
                else{
                    rowCheck[board[i][j] - '1'] = true;
                }
            }
            if(board[j][i] !== ''){
                if(colCheck[board[j][i] - '1']){
                    colInvalid.push(i);
                    valid = false;
                }
                else{
                    colCheck[board[j][i] - '1'] = true;
                }
            }
            let m = Math.floor(i/3)*3 + Math.floor(j/3);
            let n = i%3*3 + j%3;
            if(board[m][n] !== '') {
                if(boxCheck[board[m][n] - '1']){
                    boxInvalid.push(i);
                    valid = false;
                }
                else{
                    boxCheck[board[m][n] - '1'] = true;
                }
            }
        }
    }
    return [rowInvalid,colInvalid,boxInvalid,valid];
}

export const solve = (board) => {
    let b = new Board(JSON.parse(JSON.stringify(board)));
    done = false;
    let state = [];
    backtrack(b,-1,state);
    return state;
}

const update = (board, p) => { 
    //update the board condition, determine next square to be filled in and possible value.
    let pos = [];
    let leastCandidate = 10;
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(board[i][j] === '') {
                let possible = [];
                for(let a = 0; a < 9; a++) {
                    possible.push(true);
                }
                //Determine possible values to be filled in.
                for(let a = 0; a < 9; a++) {
                    if(board[i][a] !== ''){
                        possible[board[i][a]-'1'] = false;
                    }
                }
                for(let a = 0; a < 9; a++){
                    if(board[a][j] !== ''){
                        possible[board[a][j]-'1'] = false;
                    }
                }
                for(let a = Math.floor(i/3)*3; a < Math.floor(i/3)*3+3; a++) {
                    for(let b = Math.floor(j/3)*3; b< Math.floor(j/3)*3+3; b++) {
                        if(board[a][b] !== ''){
                            possible[board[a][b]-'1'] = false;
                        }
                    }
                }
                let min = 0; //count candidates
                for(let a = 0; a < 9; a++) {
                    if(possible[a]){
                        min++;
                    }
                }
                if(min === 0) { //error condition, previous move is impossible in the solution
                    p.x = -1; 
                    p.y = -1;
                    return 0;
                }
                if(min < leastCandidate) { //find the square with most constraints.
                    leastCandidate = min;
                    p.x = i; 
                    p.y = j;
                    pos = JSON.parse(JSON.stringify(possible));//deep copy possible solution
                }
                
            }
        }
    }
    return pos;
}

const fillSquare = (b, p, c,state) => {
    b.board[p.x][p.y] = c;
    state.push(JSON.parse(JSON.stringify(b.board)));
    b.free--;
}

const freeSquare = (b, p,state) => {
    b.board[p.x][p.y] = '';
    state.push(JSON.parse(JSON.stringify(b.board)));
    b.free++;
}

const processSolution = (b) => {
    done = true;
}

const isASolution = (b) => {
    return b.free === 0;
}

const constructCandidate = (b, k, p) => {
    let possible = update(b.board,p);
    if(p.x === -1) { //error condition, current solution is impossible
        return [];
    }
    b.move[k] = p; //record every move.
    let c = []; //construct candidates.
    for (let i = 0; i < 9; i++) {
        if(possible[i]) {
            c.push(i+1+'');
        }
    }
    return c;
}

const backtrack = (b, k,state) => {
    if(isASolution(b)) {
        processSolution(b);
    }else {
        k++;
        let p = new Point(-1, -1);
        let c = constructCandidate(b, k, p);
        for(let i = 0; i < c.length; i++) {
            fillSquare(b,p,c[i],state);
            backtrack(b,k,state);
            if(done){
                break;
            }
            freeSquare(b,p,state);
        }
        
    }
}
