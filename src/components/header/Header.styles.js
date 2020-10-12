import styled from 'styled-components';

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;  
    margin: 1rem; 
    @media (max-width: 768px) {
        flex-direction: column;       
        padding-top: 1rem;
    }
`;

export const HeaderTitle = styled.div`    
    margin-left: 1rem;
    align-items: center;    
`;

export const HeaderTitleH1 = styled.h1`
    @media (max-width: 768px) {
        text-align: center;       
    }
`;

export const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 1rem;
    flex: 1;
    &:hover {
        cursor: pointer;
    }
    @media (max-width: 768px) {
        display: block;        
    }
`;

export const HeaderMapSize = styled.div`
    display: flex;
    @media (max-width: 768px) {
        display: block;        
    }
`;
