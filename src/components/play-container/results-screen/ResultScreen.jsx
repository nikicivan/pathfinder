import React, { useState } from 'react';

import { ResultScreenContainer, ResultBoard, ResultBoardLevel, ResultBoardArrow, ResultBoardInfo, ResultBoardTitle } from './resultScreen-styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const ResultScreen = ({results, level}) => {    
    
    const [isActive, setIsActive] = useState([]);

    const handleChange = (id) => {
        if(isActive.includes(id)) {
            setIsActive(isActive.filter(sid => sid !== id))
        } else {
            let newIsActive = [...isActive]
            newIsActive.push(id)
            setIsActive(newIsActive)
        }                     
    }
            
    return (
        <ResultScreenContainer>
            <ResultBoardTitle>Results / Data Board{" "}{"/"}{" "}<span>display changes only</span></ResultBoardTitle>
            <ResultBoard>                  
                {results?.map((result) => (
                    <div key={result.id}>
                        <ResultBoardLevel className="board__level">
                            <ResultBoardArrow>{`Level ${result.gameLevel}`}</ResultBoardArrow>
                            <ArrowDropDownIcon style={{marginRight:'.8rem', fontSize: '2rem', fontWeight: '700'}} onClick={() => handleChange(result.id)}/>
                        </ResultBoardLevel>
                        {isActive.includes(result.id) ? <ResultBoardInfo>
                            <p>{`Algorithm name: ${result.name}`}</p>
                            <p>{`Time: ${result.timeFunc} ms`}</p>
                            <p>{`Visited: ${result.markVisited}`}</p>
                        </ResultBoardInfo> : 
                        <ResultBoardInfo hidden key={result.id}>
                            <p>{`Algorithm name: ${result.name}`}</p>
                            <p>{`Time: ${result.timeFunc} ms`}</p>
                            <p>{`Visited: ${result.markVisited}`}</p>
                        </ResultBoardInfo> }
                    </div>
                ))}                              
            </ResultBoard>
        </ResultScreenContainer>
    )
}
    
export default ResultScreen;