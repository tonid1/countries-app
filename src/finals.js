import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import {useHistory, useLocation} from 'react-router-dom'
import Error from './error';

function Finals(chosen){

    let location = useLocation()
    let history = useHistory()
    const [numbers, setNumbers] = useState([0, 0]);
    const [winner, setWinner] = useState('');
    const [rematch, setRematch] = useState([]);
    const initalMount = useRef(true);
    const forButtons = useRef(true)
    let beforeNums = []
    let final = 0;
    let rematchNums = []

    const handleNumbers = (e) => {
        e.preventDefault()
        forButtons.current = false
        let sevens = 0;
        let sixes = 0;
        let fives = 0;
        let fours = 0;

        for(let i = 0; i < 2; i++){

            let trigger = 0;

            while(trigger === 0){

                let number = Math.floor(Math.random() * 7)
                trigger = 1;
    
                switch(number){
                    case 4:
                        if (fours === 2){
                            final = number
                            fours = 0
                        }
                        else{
                            fours += 1;
                            trigger = 0;
                        }
                        break;
                    case 5:
                        if(fives === 3){
                            final = number
                            fives = 0
                        }
                        else{
                            fives += 1;
                            trigger = 0;
                        }
                        break;
                    case 6:
                        if(sixes === 4){
                            final = number
                            sixes = 0;
                        }
                        else{
                            sixes += 1
                            trigger = 0
                        }
                        break;
                    case 7:
                        if(sevens === 5){
                            final = number
                            sevens = 0
                        }
                        else{
                            sevens += 1
                            trigger = 0
                        }
                        break;
                    default:
                        final = number;
                }

            }    

            beforeNums.push(final);
            setNumbers(beforeNums);
        }
    }

    const penalties = () => {
        let a = 0
        let b = 0

        while(a === b){
            let sevens = 0;
            let sixes = 0;
            let fives = 0;
            let fours = 0;
            let triggerA = 0;
            let triggerB = 0;

            while(triggerA === 0){

                let beforeA = Math.floor(Math.random() * 7)
                triggerA = 1;

                switch(beforeA){
                    case 4:
                        if (fours === 2){
                            a = beforeA;
                            fours = 0
                        }
                        else{
                            fours += 1;
                            triggerA = 0;
                        }
                        break;
                    case 5:
                        if(fives === 3){
                            a = beforeA;
                            fives = 0
                        }
                        else{
                            fives += 1;
                            triggerA = 0;
                        }
                        break;
                    case 6:
                        if(sixes === 4){
                            a = beforeA;
                            sixes = 0;
                        }
                        else{
                            sixes += 1
                            triggerA = 0
                        }
                        break;
                    case 7:
                        if(sevens === 5){
                            a = beforeA;
                            sevens = 0
                        }
                        else{
                            sevens += 1
                            triggerA = 0
                        }
                        break;
                    default:
                        a = beforeA;
                        break;                        
                }
            }  
            
            while(triggerB === 0){

                let beforeB = Math.floor(Math.random() * 7)
                triggerB = 1;

                switch(beforeB){
                    case 4:
                        if (fours === 2){
                            b = beforeB;
                            fours = 0
                        }
                        else{
                            fours += 1;
                            triggerB = 0;
                        }
                        break;
                    case 5:
                        if(fives === 3){
                            b = beforeB;
                            fives = 0
                        }
                        else{
                            fives += 1;
                            triggerB = 0;
                        }
                        break;
                    case 6:
                        if(sixes === 4){
                            b = beforeB;
                            sixes = 0;
                        }
                        else{
                            sixes += 1
                            triggerB = 0
                        }
                        break;
                    case 7:
                        if(sevens === 5){
                            b = beforeB;
                            sevens = 0
                        }
                        else{
                            sevens += 1
                            triggerB = 0
                        }
                        break;
                    default:
                        b = beforeB;
                        break;                        
                }
            }
        }

        rematchNums.push(a, b);
        setRematch(rematchNums);        
    }

    useEffect(() => {
        if(initalMount.current){
            initalMount.current = false;
        }
        else{
            for(let j = 0; j < 2; j += 2){
                if(numbers[j] > numbers[j+1]){
                    setWinner(location.state[j])
                }
                else if(numbers[j] < numbers[j+1]){
                    setWinner(location.state[j+1])
                }
                else if(numbers[j] === numbers[j+1]){
                    penalties();
                    if(rematchNums[j] > rematchNums[j+1]){
                        setWinner(location.state[j])
                    }
                    else{
                        setWinner(location.state[j+1])
                    }
                }
            }
        }
    }, [numbers])

    const goAgain = () => {
        history.push('/')
    }

    return(
        <div>
            {location.state === undefined ? <Error /> : 
            <div>
            <div className='page-title'>
                <h1>Final</h1>
            </div>
            <form onSubmit={handleNumbers}>
                <div className='container'>
                    <div>
                        {location.state.map((item, index) => 
                        <div key={item.numericCode} className={index % 2 === 0 ? 
                            (winner.length === 0 ? 'item-div' : winner === item ? 'item-div winner' : 'item-div loser') : 
                            (winner.length === 0 ? 'item-div odd-div' : winner === item ? 'item-div odd-div winner' : 'item-div odd-div loser')}>
                            <img src={item.flag} className='flag' alt=''/>
                            <p className='item-name'>{item.name}</p>
                            <div className='score-div'>
                            <h4 className='even-score'>{numbers[index]}</h4>
                            {((numbers[index] === numbers[index+1] && index % 2 === 0) || (numbers[index] === numbers[index-1] && index%2 !== 0)) &&
                                <div className='even-score'>
                                {forButtons.current &&
                                    <p className='even-pens'>{rematch[index]}</p>
                                }
                                {!forButtons.current &&
                                    <p className='even-pens'>({rematch[index]})</p>
                                }
                            </div>
                            }
                            </div>
                        </div>)}
                        <div className='container'>
                        {forButtons.current &&
                            <button type='submit' className='bot-btn white-text'>Start playing</button>
                        } 
                        </div>   
                        <br />
                        {winner !== '' &&
                            <div className='container'>
                                <div className='margin'>
                                    <h2>Winner: </h2>
                                </div>
                                <div>
                                    <img src={winner.flag} className='flag-big' alt='' />
                                    <h3>{winner.name}</h3>
                                </div>
                                
                            </div>
                        }
                        {!forButtons.current &&
                            <button onClick={goAgain} className='bot-btn white-text'>Play again</button>
                        }
                    </div>
                </div>
            </form>
            </div>}
        </div>
    )
}

export default Finals