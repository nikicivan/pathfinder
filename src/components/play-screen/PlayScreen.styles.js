import styled, { css } from 'styled-components';

export const PlayScreenContainer = styled.div`
    display: flex;
    /* justify-content: flex-start; */
    flex: 0.5;   
    max-width: 50rem;
    flex-direction: column;  
    @media (max-width: 768px) {
        width: 23rem !important;
    }  
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
`;

export const PlayScreenGrid = styled.div` 
    ${PlayScreenContainerWidth}   
`;

export const PlayScreenTable = styled.div`
    display: flex;
    justify-content: center;    
    margin-bottom: 0;    
    border: 5px solid white;    
`;

export const LegendContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 2rem;
`;

export const Legend = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem; 
`;

export const LegendColorBFS = styled.div`
    background-color: rgb(230, 230, 80);
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 5px;
`;

export const LegendColorDijkstra = styled.div`
    background-color: rgb(255, 11, 11);
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 5px;
`;

export const LegendColorAstar = styled.div`
    background-color: rgb(64, 50, 10);
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 5px;
`;

export const LegendName = styled.h3`
    margin-left: 0.3rem;
    @media (max-width: 768px) {
        font-size: small;
    }
`;
