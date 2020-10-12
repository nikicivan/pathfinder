import styled from 'styled-components';

const PlayContainerDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media (max-width: 768px) {
        display: grid;
        place-items: center;        
    }
`;

export default PlayContainerDiv;
