/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	changeColumns,
	changeRows,
	playerPositionChange,
	targetPositionChange,
} from '../../redux/grid/grid.actions';
import {
	MapSizeButton,
	MapSizeContainer,
	MapSizeForm,
	MapSizeFormPlayer,
	MapSizeFormTarget,
	MapSizeInput,
	MapSizePlayerPosButton,
	MapSizeTargetPosButton,
} from './MapSize.styles';

const MapSizeSetting = ({ setIsActive }) => {
	const [row, setRow] = useState(10);
	const [column, setColumn] = useState(10);
	const [playerPosI, setPlayerPosI] = useState('');
	const [playerPosJ, setPlayerPosJ] = useState('');
	const [targetPosI, setTargetPosI] = useState('');
	const [targetPosJ, setTargetPosJ] = useState('');

	const dataPlayer = { playerPosI, playerPosJ };
	const dataTarget = { targetPosI, targetPosJ };

	const dispatch = useDispatch();

	const handlePlayerPos = (e) => {
		e.preventDefault();
		if (playerPosI < row || playerPosI < column) {
			dispatch(playerPositionChange(dataPlayer));
			setPlayerPosI('');
			setPlayerPosJ('');
		} else {
			alert('X and Y value must be inside of the map');
		}
	};

	const handleTargetPos = (e) => {
		e.preventDefault();
		if (targetPosI < row || targetPosJ < column) {
			dispatch(targetPositionChange(dataTarget));
			setTargetPosI('');
			setTargetPosJ('');
		} else {
			alert('X and Y value must be inside of the map');
		}
	};

	const handleMapSize = (e) => {
		e.preventDefault();
		if (row >= 10) {
			if (row <= 20) {
				if (column >= 10 && column === row) {
					if (column <= 20 && row === column) {
						dispatch(changeRows(row));
						dispatch(changeColumns(column));
					} else {
						alert('Y value must be equal or less then 20 and equal with X');
					}
				} else {
					alert('Y value must be equal or grather then 10 and equal with X');
				}
			} else {
				alert('X value must be equal or less then 20');
			}
		} else {
			alert('X value must be equal or grather then 10');
		}
	};

	return (
		<MapSizeContainer style={{ marginRight: '1rem', marginTop: '1rem' }}>
			<MapSizeFormPlayer onSubmit={handlePlayerPos}>
				<MapSizeInput
					onChange={(e) => {
						setPlayerPosI(Number(e.target.value));
					}}
					type="number"
					placeholder="Player Position X-value"
					value={playerPosI}
				/>
				<MapSizeInput
					onChange={(e) => {
						setPlayerPosJ(Number(e.target.value));
					}}
					type="number"
					placeholder="Player Position Y-value"
					value={playerPosJ}
				/>
				<MapSizePlayerPosButton
					type="submit"
					onClick={() => setIsActive(false)}
				>
					Change
				</MapSizePlayerPosButton>
			</MapSizeFormPlayer>
			<MapSizeFormTarget onSubmit={handleTargetPos}>
				<MapSizeInput
					onChange={(e) => {
						setTargetPosI(Number(e.target.value));
					}}
					type="number"
					placeholder="Target Position X-value"
					value={targetPosI}
				/>
				<MapSizeInput
					onChange={(e) => {
						setTargetPosJ(Number(e.target.value));
					}}
					type="number"
					placeholder="Target Position Y-value"
					value={targetPosJ}
				/>
				<MapSizeTargetPosButton
					type="submit"
					onClick={() => setIsActive(false)}
				>
					Change
				</MapSizeTargetPosButton>
			</MapSizeFormTarget>
			<MapSizeForm onSubmit={handleMapSize}>
				<p>Map Length</p>
				<MapSizeInput
					onChange={(e) => {
						setRow(e.target.value);
						setColumn(e.target.value);
					}}
					type="number"
					placeholder="Map length"
					value={row}
				/>
				<MapSizeButton
					className="buttonMap"
					type="submit"
					onClick={() => setIsActive(false)}
				>
					Change
				</MapSizeButton>
			</MapSizeForm>
		</MapSizeContainer>
	);
};

export default MapSizeSetting;
