import React, { useState } from 'react';

import SettingsIcon from '@material-ui/icons/Settings';
import {
	HeaderContainer,
	HeaderMapSize,
	HeaderRight,
	HeaderTitle,
	HeaderTitleH1,
} from './Header.styles';
import MapSizeSetting from '../map-size-setting/MapSizeSetting';

const Header = () => {
	const [isActive, setIsActive] = useState(false);

	const toggle = () => {
		setIsActive(!isActive);
	};

	return (
		<HeaderContainer>
			<HeaderTitle>
				<HeaderTitleH1>Pathfinding Visualizer</HeaderTitleH1>
			</HeaderTitle>
			<HeaderRight>
				{isActive
					? <div><MapSizeSetting setIsActive={setIsActive} /></div>
					: <div hidden><MapSizeSetting /></div>}
				<HeaderMapSize>
					<SettingsIcon style={{ fontSize: 'xx-large' }} onClick={toggle} />
				</HeaderMapSize>
			</HeaderRight>
		</HeaderContainer>
	);
};

export default Header;
