/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Timer from './Modal.styles';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const ModalTimer = ({ open, setOpen }) => {
	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);

	return (
		<div className="modal">
			<Modal
				open={open}
				onClose={() => setOpen(false)}
			>
				<div style={modalStyle} className={classes.paper}>
					<Timer id="timer" className="timer">Loading...</Timer>
				</div>
			</Modal>
		</div>
	);
};

export default ModalTimer;
