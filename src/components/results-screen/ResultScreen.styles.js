import styled from 'styled-components';

export const ResultScreenContainer = styled.div`
    display: flex;  
    flex-direction: column;  
    flex: 0.3;    
    margin: 2rem;
    @media (max-width: 768px) {
        width: 20rem;
        margin: 15px;
    }   
`;

export const ResultBoard = styled.div`
    background-color: white;        
    border-radius: 5px;
    box-shadow: 10px 20px 20px 0 rgba(0, 0, 0, 0.5);    
    width: 20rem;
    height: 30rem;   
    overflow-y: overlay;  
    margin-top: 1rem;  
    justify-content: center;
    &:hover {
        cursor: pointer;
    }
    @media (max-width: 768px) {
        display: flex;        
        width: 100%;
        flex-direction: column;
        justify-content: flex-start;
    }    
`;

export const ResultBoardTitle = styled.h3` 
    text-align: center;  
    @media (max-width: 768px) {
        font-size: medium;
    }  
`;
export const ResultBoardLevel = styled.div`
    display: flex;     
    border-top-right-radius: 5px;  
    border-top-left-radius: 5px; 
    box-shadow: 0px 5px 5px 5px rgba(0, 0, 0, 0.5);
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(36,36,217,1) 23%, rgba(0,212,255,1) 100%);
    color: white;
    padding-left: 1rem;
    width: 100%;
    height: 2rem;
    align-items: center;  
    font-weight: 700; 
    @media (max-width: 768px) {
        width: 20rem;        
    }
`;

export const ResultBoardArrow = styled.p`
    flex: 1;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const ResultBoardInfo = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 2rem;
    font-weight: 700;
    background: rgb(34,193,195);
    background: linear-gradient(156deg, rgba(34,193,195,1) 0%, rgba(197,66,252,1) 54%);
    color: white;
`;
