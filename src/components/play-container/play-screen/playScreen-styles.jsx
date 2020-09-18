import styled, { css } from 'styled-components';

export const PlayScreenContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex: 0.5;   
    flex-direction: column;
    @media (max-width: 768px) {    
        display: flex;  
        justify-content: center;
        align-items: center;
        margin-left: 9rem;
    } 
`;

export const PlayScreenLevel = styled.div`
    font-size: xx-large;
    text-align: center;  
    @media (max-width: 768px) {      
        justify-content: center;
    }  
`;

export const PlayScreenLevelH3 = styled.h3`
    @media (max-width: 768px) {        
        text-align: center;
    }  
`;

export const PlayScreenInfo = styled.div`
    font-size: medium;
    font-weight: 700; 
    text-align: center;
    @media (max-width: 768px) {        
        text-align: center;        
    }
`;

const PlayScreenContainerWidth = css`
    width: 50rem;
`

export const PlayScreenGrid = styled.div`
    ${PlayScreenContainerWidth}   
`;

export const PlayScreenTable = styled.table`
    display: flex;
    justify-content: center;    
    margin-bottom: 0;    
    border: 5px solid white;

`;




