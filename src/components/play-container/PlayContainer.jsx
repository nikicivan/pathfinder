import React from 'react';

import { PlayContainerDiv } from './playContainer-styles';

import PlayScreen from './play-screen/PlayScreen';
import ResultScreen from './results-screen/ResultScreen';



const PlayContainer = ({results, level, lev }) => {   
    
    return (
        <PlayContainerDiv>
            <PlayScreen  level={level} lev={lev}/>            
            <ResultScreen results={results} level={level}/>
        </PlayContainerDiv>
    )
}

export default PlayContainer;
