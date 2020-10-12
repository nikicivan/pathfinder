import React from 'react';

import CheckBox from '../check-box/CheckBox';
import ResultScreen from '../results-screen/ResultScreen';
import PlayScreen from '../play-screen/PlayScreen';
import PlayContainerDiv from './PlayContainer.styles';

const PlayContainer = () => (
	<PlayContainerDiv>
		<CheckBox />
		<PlayScreen />
		<ResultScreen />
	</PlayContainerDiv>
);

export default PlayContainer;
