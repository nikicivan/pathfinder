import styled, { css } from 'styled-components';

export const PlayScreenContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex: 0.5;   
    flex-direction: column;    
`;

export const PlayScreenLevel = styled.div`
    font-size: xx-large;
    text-align: center;     
`;

export const PlayScreenInfo = styled.div`
    font-size: medium;
    font-weight: 700; 
    text-align: center;
    
`;

const PlayScreenContainerWidth = css`
    width: 50rem;
    @media (max-width: 768px) {
        width: auto;
        height: auto;
        margin: 15px;
    }
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




