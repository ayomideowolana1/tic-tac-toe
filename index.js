const CIRCLE_CLASS = "circle";
const X_CLASS = "x";
const cells = document.querySelectorAll("[data-cell]")
const board = document.querySelector(".board")
let circleTurn ;
const possibleWins =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


const GameFlow = (()=>{
    const start = document.querySelector("#startBtn");
    const reset = document.querySelector("#resetBtn");
        reset.disabled = true
        
    //private
    const _startGame = () =>{
        circleTurn = false;
        cells.forEach(cell =>{
            cell.addEventListener("click",_handleClick,{once:true})
            cell.classList.remove(X_CLASS)
            cell.classList.remove(CIRCLE_CLASS)
        })
        Board.setBoardHoverClass();
        Players.activePlayer()
        start.disabled = true;
        reset.disabled = false;
    }

    const _resetGame = () =>{
        _startGame()
        start.disabled = false;
        reset.disabled = true;
    }

    const _handleClick = (e) =>{
        const cell = e.target;
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        Board.placeMark(cell,currentClass);
        if(_checkWin(currentClass)){
            _endGame(false);
        }else if(_isDraw()){
            _endGame(true);
        }else{
            _swapTurns();
            Players.activePlayer()
            Board.setBoardHoverClass();
        }
    }
    
    const _checkWin = () =>{
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        return possibleWins.some(combination =>{
                return combination.every(index => {
                    return cells[index].classList.contains(currentClass)
                })
            })
    }

    const _endGame = (draw) => {
        if(draw){
            alert(`Draw!`)
            
        }else{
             alert(`${circleTurn? "O's":"X's"} win!`) 
        }
        start.disabled = true;
        reset.disabled = false;
    }

    const _isDraw = () => {
        return [...cells].every(cell => {
            return cell.classList.contains(X_CLASS ) || cell.classList.contains(CIRCLE_CLASS )
        })
    }

    const _swapTurns = () =>{
        circleTurn =!circleTurn
    }
    
    //public
    const game = (()=>{
        start.addEventListener("click",_startGame);
        reset.addEventListener("click",_resetGame);
    })()
})()

const Board = (()=>{

    const setBoardHoverClass = () =>{
        board.classList.remove(X_CLASS)
        board.classList.remove(CIRCLE_CLASS)
        circleTurn ? board.classList.add(CIRCLE_CLASS) : board.classList.add(X_CLASS);
    }

    const  placeMark = (cell,currentClass) =>{
        cell.classList.add(currentClass)
        
    }
    return {placeMark,setBoardHoverClass};
})()

const Players = (()=>{
    const activePlayer = () =>{
        const _player1 = document.querySelector("#player1");
        const _player2 = document.querySelector("#player2");
        if(!circleTurn){
            _player1.classList.add("active")
            _player2.classList.remove("active")
        }else{
            _player2.classList.add("active")
            _player1.classList.remove("active")
        }
    }
    return{activePlayer}
})()