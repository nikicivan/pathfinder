import FILTER_TYPES from './filter.types';

export const chooseCheckBox = id => ({
	type: FILTER_TYPES.CHOSE_CHECKBOX,
	payload: id,
});

export const setLevel = lv => ({
	type: FILTER_TYPES.SET_LEVEL,
	payload: lv,
});

export const gameOver = endGame => ({
	type: FILTER_TYPES.GAME_OVER,
	payload: endGame,
});
