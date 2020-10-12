import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ResultBoard,
  ResultBoardArrow,
  ResultBoardInfo,
  ResultBoardLevel,
  ResultBoardTitle,
  ResultScreenContainer,
} from './ResultScreen.styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const ResultScreen = () => {
  const grid = useSelector((state) => state.grid);
  const { results } = grid;

  const [isActive, setIsActive] = useState([]);

  const handleChange = (id) => {
    if (isActive.includes(id)) {
      setIsActive(isActive.filter((sid) => sid !== id));
    } else {
      let newIsActive = [...isActive];
      newIsActive.push(id);
      setIsActive(newIsActive);
    }
  };

  return (
    <ResultScreenContainer>
      <ResultBoardTitle>Results / Data Board</ResultBoardTitle>
      <ResultBoard>
        {results?.map((result) => (
          <div key={result.id}>
            <ResultBoardLevel className="board__level">
              <ResultBoardArrow onClick={() => handleChange(result.id)}>
                {`Level ${result.level} ---  ${result.name}`}
              </ResultBoardArrow>
              <ArrowDropDownIcon
                style={{
                  marginRight: ".8rem",
                  fontSize: "2rem",
                  fontWeight: "700",
                }}
                onClick={() => handleChange(result.id)}
              />
            </ResultBoardLevel>
            {isActive.includes(result.id)
              ? <ResultBoardInfo>
                <p>{`Algorithm name: ${result.name}`}</p>
                <p>{`Time: ${result.timeSpent} ms`}</p>
                <p>{`Visited: ${result.numberCV}`}</p>
              </ResultBoardInfo>
              : <ResultBoardInfo hidden key={result.id}>
                <p>{`Algorithm name: ${result.name}`}</p>
                <p>{`Time: ${result.timeSpent} ms`}</p>
                <p>{`Visited: ${result.numberCV}`}</p>
              </ResultBoardInfo>}
          </div>
        ))}
      </ResultBoard>
    </ResultScreenContainer>
  );
};

export default ResultScreen;
