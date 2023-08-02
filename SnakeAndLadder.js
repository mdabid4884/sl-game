import React, {useEffect, useState} from "react";
import ColorBox from './ColorBox';

const colorList = ["yellow", "voilet", "lightyellow", "lightblue", "pink", "white", "burlywood", "tomato", "lightgrey", "coral"];

const snake= {
    // 4:  {text: "SL1", color: "red"},
    // 99: {text: "SH1", color: "red", lowerBound: 4},
    9:  {text: "SL2", color: "red"},
    39: {text: "SH2", color: "red", lowerBound: 9},
    21: {text: "SL3", color: "red"},
    61: {text: "SH3", color: "red", lowerBound: 21},
    25: {text: "SL4", color: "red"},
    94: {text: "SH4", color: "red", lowerBound: 25},
};
const ladders= {
    3:  {text: "L1S", color: "green", upperBound: 83},
    83: {text: "L1E", color: "green"},
    8:  {text: "L2S", color: "green", upperBound: 89},
    89: {text: "L2E", color: "green"},
    6:  {text: "L3S", color: "green", upperBound: 77},
    77: {text: "L3E", color: "green"},
    12: {text: "L4S", color: "green", upperBound: 96},
    96: {text: "L4E", color: "green"},
};
// console.log(ladders);

function countNumber(oldNumber){
     let newNumber = Math.floor(Math.random()*10);
    if(newNumber === oldNumber){
        return countNumber(newNumber);
    }else{
        return newNumber;
    }
};

let randomNumber = 0;

function create2dArray(){
    
    let boxes= [];
    var count = 100;
    for(let i=0; i < 10; i++){
        randomNumber = countNumber(randomNumber);
        boxes[i]=[];

        for(let j = 0; j < 10; j++){
            randomNumber = countNumber(randomNumber);
            let label = ladders[count] || snake[count] || "";

            boxes[i][j] = {label: label, colors: colorList[randomNumber], count: count, turn: ""};       
            count--;        
        }        
    }
    return boxes;
}

function move(boxes, from, to, turn){
    let a;
    let b;
    let c;
    let d;
    for(let m = 0; m < 10; m++){
        for(let n = 0; n < 10; n++){
            if(boxes[m][n].count === to){
                c = m;
                d = n;
            }
            if(boxes[m][n].count === from){             
                a = m;
                b = n;
            }
        }
    }
    if(boxes[a] && boxes[a][b].turn){ ////////
        boxes[a][b].turn = "";
    }
    boxes[c][d].turn = turn;
    console.log("from", a,b);
    console.log("to", c,d);
    return [...boxes];
}

const SnakeLadder = () => {

    const [player1, setPlayer1] = useState('');
    const [player1Total, setPlayer1Total] = useState(0);
    const [player2, setPlayer2] = useState('');
    const [player2Total, setPlayer2Total] = useState(0);
    
    const [turn, setTurn] = useState('P1');
    const [boxes, setBoxes] = useState(create2dArray());
    const [winner, setWinner] = useState('');

    const [moves, setMoves] = useState([]);
    const [counter, setCounter] = useState(0);
    const [replay, setReplay] = useState(false);

    useEffect(() => {
        if(replay){
            let newBoxes = moves[counter]
            console.log(newBoxes);
            if (newBoxes && newBoxes.length > 0) {
                setBoxes(newBoxes);
            }        
        }
    },[counter, moves, replay]);

    function replayGame(){
        if (moves.length > counter) {
            setReplay(true);
            let counterVar = counter + 1;
            setCounter(counterVar);
        } else {
            alert("thats all we have");
            
        }
    }
    
function randomGenerator1(player){
    setCounter(0);
    setReplay(false);

    if(turn === player)
    {
        const index = Math.ceil(Math.random()*6);       
        console.log(index);
        let total = 0;

        if(player === "P1") {
            total= player1Total;
        }else{
            total=player2Total;
        }

        let totalFinalValue = parseInt(total) + parseInt(index);


        if(totalFinalValue > 100){
            setTurn(turn === "P1" ? "P2" : "P1"); 
            return(
                alert("You cannot add bigger number")
            );
        }else{
            
            if(snake[totalFinalValue] && snake[totalFinalValue].lowerBound){
                totalFinalValue = snake[totalFinalValue].lowerBound;
            }
        
            if(ladders[totalFinalValue] && ladders[totalFinalValue].upperBound){
                totalFinalValue = ladders[totalFinalValue].upperBound;
            }

            const person = {
                url1: "https://i.imgur.com/7vQD0fPs.jpg",
                url2: "https://i.imgur.com/1bX5QH6.jpg",
                name: "Gregorio Y Zara",
            }
            
            if(totalFinalValue === 100){
            //   let winner = (turn === "P1" ? "P1" : "P2");
              alert((turn === "P1" ? "P1" : "P2") + 'is Winner!');
            //   alert((turn === <img className="imageUrl" src={person.url1} alt={person.name}/> ? <img className="imageUrl" src={person.url1} alt={person.name}/>: <img className="imageUrl" src={person.url2} alt={person.name}/>) + "is Winner!");
              setTurn("");
              setWinner(turn === "P1" ? <img className="imageUrl" src={person.url1} alt={person.name}/> : <img className="imageUrl" src={person.url2} alt={person.name}/>);
            } else{
                if(turn === "P1") {           
                    setPlayer1( index);
                    setPlayer1Total(totalFinalValue);
                }else{
                    setPlayer2( index);
                    setPlayer2Total(totalFinalValue);
                }
                let newBoxes = move(boxes, total, totalFinalValue, turn);
               
                
                setBoxes(newBoxes);
                let newMoves = JSON.parse(JSON.stringify(moves));
                newMoves.push(JSON.parse(JSON.stringify(boxes)));
                setMoves(newMoves);
                setTurn(turn === "P1" ? "P2" : "P1"); 
            }
        }     
    }else if(turn === ""){
        alert("Game Over! You Won Rs = 10000000 + Audi")
    }else{
        alert("It's not your turn! ");
    }
     
}
    const rows = [];
    for(let i=0; i < 10; i++){
        randomNumber = countNumber(randomNumber);

        const row = [];
        for(let j = 0; j < 10; j++){
            rows.push(<ColorBox turn={boxes[i][j].turn} number={boxes[i][j].count} label={boxes[i][j].label} colors={boxes[i][j].colors}/>);
        }        
        rows.push(<div className='row'>{row}</div>);
    }

    return(
        <>
        
        <div className="snakeAndLadder">
            {rows}
        </div>
        <div className="winnerImage">
            {winner} is Winner!
        </div>
        <div className="player-1">
            <button onClick={player => randomGenerator1("P1")}>Player 1</button>
            <input value={player1} />
            <input value={player1Total}/>
        </div>
        <div className="player-2">
        <button onClick={player => randomGenerator1("P2")}>Player 2</button>
            <input value={player2}/>
            <input value={player2Total}/>
        </div>
        <div>
            <button className="replayButton" onClick={replayGame}>Replay</button>
        </div>
        </>
    )
}
export default SnakeLadder;