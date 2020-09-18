import styled from 'styled-components';

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    
    @media (max-width: 768px) {
        flex-direction: column;       
        padding-top: 1rem;
    }
`;

export const HeaderTitle = styled.div`
    flex: 1;
    margin-left: 1rem;
    align-items: center;
    
`;

export const HeaderTitleH1 = styled.h1`
    @media (max-width: 768px) {
        text-align: center;
        margin-left: 6rem;
    }
`

export const HeaderOptions = styled.div`
    display: flex;
    margin: 2rem;
    align-items: center;
    @media (max-width: 768px) {
        display: flex;
        margin-left: 10rem;
        flex-direction: column;
        justify-content: center;
        width: 90%
    }
    
`;

export const HeaderSelect = styled.select`
    width: 10rem;
    height: 2rem;
    font-family: 'Play', sans-serif;
    &:hover {
        cursor: pointer;        
    }
`;

export const HeaderOption = styled.option`
    display: flex;
    margin: 1rem;
    font-family: "Play", sans-serif;  
    
`;

export const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1rem;
    &:hover {
        cursor: pointer;
    }
    @media (max-width: 768px) {
        flex-direction: column;
        
    }
`;

export const HeaderMapSize = styled.div`
    display: flex;
    flex-direction: column;
    @media (max-width: 768px) {
        flex-direction: column;
        
    }
`;

