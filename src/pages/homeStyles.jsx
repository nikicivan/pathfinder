import styled from 'styled-components';

export const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media (max-width: 768px) {
        display: grid;
        place-items: center;
        overflow-x: hidden;
    } 
`