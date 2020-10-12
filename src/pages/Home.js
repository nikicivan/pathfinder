import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HomeContainer from './Home.styles';
import Header from '../components/header/Header';
import PlayContainer from '../components/play-container/PlayContainer';

import { createGrid } from '../redux/grid/grid.actions';

function Home() {
	const grid = useSelector(state => state.grid);
	const {
		columns, rows, playerPos, targetPos,
	} = grid;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(createGrid());
	}, [rows, columns, playerPos, targetPos, dispatch]);

	return (
		<HomeContainer>
			<Header />
			<PlayContainer />
		</HomeContainer>
	);
}

export default Home;
