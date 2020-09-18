import styled from 'styled-components';

export const ResultScreenContainer = styled.div`
    display: flex;  
    flex-direction: column;  
    flex: 0.5;    
    padding-top: 2rem;
    @media (max-width: 768px) {
        justify-content: center;
    }
`;

export const ResultBoard = styled.div`
    background-color: white;        
    border-radius: 5px;
    box-shadow: 10px 20px 20px 0 rgba(0, 0, 0, 0.5);
    transition: 0.3s;
    width: 20rem;
    height: 30rem;   
    overflow-y: scroll;  
    margin-top: 1rem;  
    justify-content: center;
    &:hover {
        cursor: pointer;
    }
    @media (max-width: 768px) {
        justify-content: center;
        margin-left: 10rem;
    }
`;

export const ResultBoardTitle = styled.h3`
    text-align: start;
    @media (max-width: 768px) {
        justify-content: center;
        margin-left: 15rem;
    }
`

export const ResultBoardLevel = styled.div`
    display: flex;     
    border-top-right-radius: 5px;  
    border-top-left-radius: 5px; 
    background-color: lightgrey;
    padding-left: 1rem;
    width: 100%;
    height: 2rem;
    align-items: center;  
    font-weight: 700; 
`;

export const ResultBoardArrow = styled.p`
    flex: 1;
`;

export const ResultBoardInfo = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 2rem;
    font-weight: 700;
    background-color: rgb(158, 252, 220);
    opacity: 0.5;
`;