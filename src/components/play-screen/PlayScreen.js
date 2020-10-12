/* eslint-disable no-await-in-loop */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GridCell from '../grid-cells/GridCell';
import Graph from '../../utils/graph';
import Queue from '../../utils/queue';
import Node from '../../utils/node';
import PriorityQueue from '../../utils/priorityQueue';
import {
	Legend,
	LegendColorAstar,
	LegendColorBFS,
	LegendColorDijkstra,
	LegendContainer,
	LegendName,
	PlayScreenContainer,
	PlayScreenGrid,
	PlayScreenInfo,
	PlayScreenLevel,
	PlayScreenTable,
} from './PlayScreen.styles';

import {
	countVisited,
	createGrid,
	findPath,
	markCellVisited,
	markShortestPathAstar,
	markShortestPathBFS,
	markShortestPathDFS,
	markShortestPathDijkstra,
} from '../../redux/grid/grid.actions';
import { gameOver } from '../../redux/filter/filter.actions';

class PlayScreen extends Component {
	constructor() {
		super();
		this.state = {
			routing: false,
			endGame: false,
		};
	}

	componentDidMount() {
		const { buildGrid } = this.props;
		buildGrid();
	}

	componentDidUpdate() {
		const {
			enableVisualizeButton,
			gridCells,
			playerPos,
			targetPos,
			markVisited,
			markSPBFS,
			markSPDijkstra,
			markSPAstar,
			findPath,
			algorithms,
		} = this.props;

		if (!enableVisualizeButton && !this.state.routing) {
			this.setState({ routing: true }, () => {
				if (algorithms[0].checked === true) {
					this.bfs(
						gridCells,
						playerPos,
						targetPos,
						markVisited,
						markSPBFS,
						findPath,
					);
				}
				if (algorithms[1].checked === true) {
					this.dijkstra(
						gridCells,
						playerPos,
						targetPos,
						markVisited,
						markSPDijkstra,
						findPath,
					);
				}
				if (algorithms[2].checked === true) {
					this.astar(
						gridCells,
						playerPos,
						targetPos,
						markVisited,
						markSPAstar,
						findPath,
					);
				}
			});
		}
	}

  // Breadth First Search Algorithm
  bfs = async (
  	gridCells,
  	playerPos,
  	targetPos,
  	markVisited,
  	markSPBFS,
  	findPath,
  ) => {
  	const { numberVisited, level, gameEnd } = this.props;
  	const t1 = new Date().getTime();
  	const { graph, cellIdPositionMap } = this.initializeGraph(gridCells);
  	const playerId = gridCells[playerPos.i][playerPos.j].id;
  	const targetId = gridCells[targetPos.i][targetPos.j].id;
  	const visited = new Set();
  	const queue = new Queue();
  	queue.enqueue(new Node(playerId));
  	visited.add(playerId);
  	let targetFound = false;
  	const parent = new Map();
  	while (!queue.isEmpty()) {
  		const node = queue.dequeue();
  		let temp = graph.adjList.get(node.id).head;
  		while (temp !== null) {
  			if (!visited.has(temp.id)) {
  				parent.set(temp.id, node.id);
  				const { i, j } = cellIdPositionMap.get(temp.id);
  				markVisited(i, j);
  				const mv = markVisited(i, j);
  				const his = JSON.parse(localStorage.getItem('visitedBFS')) || [];
  				his.push(mv);
  				localStorage.setItem('visitedBFS', JSON.stringify(his));
  				if (temp.id === targetId) {
  					targetFound = true;
  					break;
  				}
  				visited.add(temp.id);
  				queue.enqueue(temp);
  			}
  			temp = temp.next;
  		}
  		if (targetFound) {
  			break;
  		}
  	}
  	if (targetFound) {
  		this.setState({ endGame: false });
  		this.drawShortestPathBFS(
  			parent,
  			playerId,
  			targetId,
  			cellIdPositionMap,
  			markSPBFS,
  		);
  	}
  	findPath();
  	const t2 = new Date().getTime();
  	this.t = t2 - t1;
  	const lengthBFS = JSON.parse(localStorage.getItem('visitedBFS')).length;
  	numberVisited({
  		data: {
  			name: 'Breadth First Search',
  			numberCV: lengthBFS,
  			timeSpent: this.t,
  			level,
  		},
  	});
  	localStorage.removeItem('visitedBFS');
  	if (!targetFound) {
  		this.setState({ endGame: true });
  		gameEnd(this.state.endGame);
  	}
  	this.setState({ routing: false });
  };

  dijkstra = async (
  	gridCells,
  	playerPos,
  	targetPos,
  	markVisited,
  	markSPDijkstra,
  	findPath,
  ) => {
  	const { numberVisited, level, gameEnd } = this.props;
  	const t1 = new Date().getTime();
  	const { graph, cellIdPositionMap } = this.initializeGraph(gridCells);
  	const playerId = gridCells[playerPos.i][playerPos.j].id;
  	const targetId = gridCells[targetPos.i][targetPos.j].id;
  	const parent = new Map();
  	const shortestDistance = new Map();
  	const pq = new PriorityQueue();
  	for (let i = 0; i < gridCells.length; i += 1) {
  		for (let j = 0; j < gridCells[i].length; j += 1) {
  			if (!gridCells[i][j].isWall) {
  				pq.enqueue(new Node(gridCells[i][j].id, Infinity, i, j));
  			}
  		}
  	}
  	let targetFound = false;
  	pq.decreaseKey(playerId, 0);
  	while (!pq.isEmpty()) {
  		const current = pq.dequeue();
  		if (current.id === playerId) {
  			shortestDistance.set(playerId, 0);
  		} else if (current.id === targetId && current.weight !== Infinity) {
  			// infinity to make sure the node has atleast been touched
  			targetFound = true;
  			break;
  		} else {
  			shortestDistance.set(current.id, current.weight);
  		}
  		let { head } = graph.adjList.get(current.id); // neighbours
  		while (head !== null) {
  			const totalWeight = shortestDistance.get(current.id) + head.weight;
  			if (pq.containsKey(head.id) && pq.peek(head.id).weight > totalWeight) {
  				pq.decreaseKey(head.id, totalWeight);
  				parent.set(head.id, current.id);
  				const { i, j } = cellIdPositionMap.get(head.id);
  				markVisited(i, j);
  				const mv = markVisited(i, j);
  				const his = JSON.parse(localStorage.getItem('visitedDijkstra')) || [];
  				his.push(mv);
  				localStorage.setItem('visitedDijkstra', JSON.stringify(his));
  			}
  			head = head.next;
  		}
  	}
  	if (targetFound) {
  		this.drawShortestPathDijkstra(
  			parent,
  			playerId,
  			targetId,
  			cellIdPositionMap,
  			markSPDijkstra,
  		);
  	}
  	findPath();
  	const t2 = new Date().getTime();
  	this.t = t2 - t1;
  	const lengthDijkstra =
      JSON.parse(localStorage.getItem('visitedDijkstra')).length;
  	numberVisited({
  		data: {
  			name: 'Dijkstra Algorithm',
  			numberCV: lengthDijkstra,
  			timeSpent: this.t,
  			level,
  		},
  	});
  	localStorage.removeItem('visitedDijkstra');
  	if (!targetFound) {
  		this.setState({ endGame: true });
  		gameEnd(this.state.endGame);
  	}
  	this.setState({ routing: false });
  };

  astar = async (
  	gridCells,
  	playerPos,
  	targetPos,
  	markVisited,
  	markSPAstar,
  	findPath,
  ) => {
  	const { numberVisited, level, gameEnd } = this.props;
  	const t1 = new Date().getTime();
  	const { graph, cellIdPositionMap } = this.initializeGraph(gridCells);
  	const playerId = gridCells[playerPos.i][playerPos.j].id;
  	const targetId = gridCells[targetPos.i][targetPos.j].id;
  	const parent = new Map();
  	const shortestDistance = new Map();
  	const pq = new PriorityQueue();
  	for (let i = 0; i < gridCells.length; i += 1) {
  		for (let j = 0; j < gridCells[i].length; j += 1) {
  			if (!gridCells[i][j].isWall) {
  				pq.enqueue(new Node(gridCells[i][j].id, Infinity));
  				shortestDistance.set(gridCells[i][j].id, Infinity);
  			}
  		}
  	}
  	let targetFound = false;
  	pq.decreaseKey(playerId, 0);
  	while (!pq.isEmpty()) {
  		const current = pq.dequeue();
  		if (current.id === playerId) {
  			shortestDistance.set(current.id, 0);
  		} else if (current.id === targetId && current.weight !== Infinity) {
  			// infinity to make sure the node has atleast been touched
  			targetFound = true;
  			break;
  		}
  		let { head } = graph.adjList.get(current.id); // neighbours
  		while (head !== null) {
  			// f(n) = g(n) + h(n)
  			const g = shortestDistance.get(current.id) + head.weight;
  			const { i, j } = cellIdPositionMap.get(head.id);
  			const h = Math.abs(targetPos.i - i) + Math.abs(targetPos.j - j);
  			const f = g + h * 1.001; // h * 1.001 for tie-breaking if same f values exists in pq
  			if (pq.containsKey(head.id) && pq.peek(head.id).weight > f) {
  				pq.decreaseKey(head.id, f);
  				parent.set(head.id, current.id);
  				shortestDistance.set(head.id, g);
  				markVisited(i, j);
  				const mv = markVisited(i, j);
  				const his = JSON.parse(localStorage.getItem('visitedAstar')) || [];
  				his.push(mv);
  				localStorage.setItem('visitedAstar', JSON.stringify(his));
  			}
  			head = head.next;
  		}
  	}
  	if (targetFound) {
  		this.drawShortestPathAstar(
  			parent,
  			playerId,
  			targetId,
  			cellIdPositionMap,
  			markSPAstar,
  		);
  	}
  	findPath();
  	const t2 = new Date().getTime();
  	this.t = t2 - t1;
  	const lengthAstar = JSON.parse(localStorage.getItem('visitedAstar')).length;
  	numberVisited({
  		data: {
  			name: 'Astar Algorithm',
  			numberCV: lengthAstar,
  			timeSpent: this.t,
  			level,
  		},
  	});
  	localStorage.removeItem('visitedAstar');
  	if (!targetFound) {
  		this.setState({ endGame: true });
  		gameEnd(this.state.endGame);
  	}
  	this.setState({ routing: false });
  };

  wait = microsecs => new Promise((resolve) => {
  		setTimeout(() => resolve(), microsecs);
  	});

  drawShortestPathBFS = async (
  	parent,
  	playerId,
  	targetId,
  	cellIdPositionMap,
  	markSPBFS,
  ) => {
  	let temp = targetId;
  	while (temp !== playerId) {
  		const parentId = parent.get(temp);
  		const { i, j } = cellIdPositionMap.get(parentId);
  		markSPBFS(i, j);
  		await this.wait(30);
  		temp = parentId;
  	}
  };

  drawShortestPathDijkstra = async (
  	parent,
  	playerId,
  	targetId,
  	cellIdPositionMap,
  	markSPDijkstra,
  ) => {
  	let temp = targetId;
  	while (temp !== playerId) {
  		const parentId = parent.get(temp);
  		const { i, j } = cellIdPositionMap.get(parentId);
  		markSPDijkstra(i, j);
  		await this.wait(20);
  		temp = parentId;
  	}
  };

  drawShortestPathAstar = async (
  	parent,
  	playerId,
  	targetId,
  	cellIdPositionMap,
  	markSPAstar,
  ) => {
  	let temp = targetId;
  	while (temp !== playerId) {
  		const parentId = parent.get(temp);
  		const { i, j } = cellIdPositionMap.get(parentId);
  		markSPAstar(i, j);
  		await this.wait(1);
  		temp = parentId;
  	}
  };

  initializeGraph(gridCells) {
  	const graph = new Graph();
  	const cellIdPositionMap = new Map();
  	for (let i = 0; i < gridCells.length; i += 1) {
  		for (let j = 0; j < gridCells[i].length; j += 1) {
  			if (!gridCells[i][j].isWall) {
  				graph.createGraphVertex(gridCells[i][j].id, { i, j });
  				cellIdPositionMap.set(gridCells[i][j].id, { i, j });
  				// get neighbours
  				// up
  				if (i - 1 >= 0 && !gridCells[i - 1][j].isWall) {
  					graph.addPathBetweenVertices(
  						gridCells[i][j].id,
  						gridCells[i - 1][j].id,
  						gridCells[i - 1][j].weight,
  						i - 1,
  						j,
  					);
  				}
  				// right
  				if (j + 1 <= gridCells[i].length - 1 && !gridCells[i][j + 1].isWall) {
  					graph.addPathBetweenVertices(
  						gridCells[i][j].id,
  						gridCells[i][j + 1].id,
  						gridCells[i][j + 1].weight,
  						i,
  						j + 1,
  					);
  				}
  				// bottom
  				if (i + 1 <= gridCells[i].length - 1 && !gridCells[i + 1][j].isWall) {
  					graph.addPathBetweenVertices(
  						gridCells[i][j].id,
  						gridCells[i + 1][j].id,
  						gridCells[i + 1][j].weight,
  						i + 1,
  						j,
  					);
  				}
  				// left
  				if (j - 1 >= 0 && !gridCells[i][j - 1].isWall) {
  					graph.addPathBetweenVertices(
  						gridCells[i][j].id,
  						gridCells[i][j - 1].id,
  						gridCells[i][j - 1].weight,
  						i,
  						j - 1,
  					);
  				}
  			}
  		}
  	}
  	return { graph, cellIdPositionMap };
  }

  render() {
  	const {
  		gridCells,
  		level,
  	} = this.props;

  	const { endGame } = this.state;

  	return (
  		<PlayScreenContainer>
  			<PlayScreenLevel>
  				{level === 0
  					? <h3>Level 1</h3>
  					: endGame === false
  						? <h3>{`Level ${level}`}</h3>
  						: <h3>Game Over</h3>}
  			</PlayScreenLevel>
  			<PlayScreenGrid>
  				<PlayScreenTable>
  					{gridCells.map((row, indexI) => (
  						<div key={indexI}>
  							{row.map((col, indexJ) => (
  								<GridCell
  									key={indexJ}
  									{...col}
  								/>
  							))}
  						</div>
  					))}
  				</PlayScreenTable>
  			</PlayScreenGrid>
  			<PlayScreenInfo>
  				<LegendContainer>
  					<Legend>
  						<LegendColorBFS />
  						<LegendName>Breadth First Search</LegendName>
  					</Legend>
  					<Legend>
  						<LegendColorDijkstra />
  						<LegendName>Dijkstra Algorithm</LegendName>
  					</Legend>
  					<Legend>
  						<LegendColorAstar />
  						<LegendName>Astar Algorithm</LegendName>
  					</Legend>
  				</LegendContainer>
  			</PlayScreenInfo>
  		</PlayScreenContainer>
  	);
  }
}

const mapStateToProps = state => ({
	gridCells: state.grid.gridCells,
	rows: state.grid.rows,
	level: state.filter.level,
	columns: state.grid.columns,
	playerPos: state.grid.playerPos,
	targetPos: state.grid.targetPos,
	enableVisualizeButton: state.grid.enableVisualizeButton,
	currentAlg: state.filter.currentAlg,
	algorithms: state.filter.algorithms,
	numberCV: state.filter.numberCV,
});

const mapDispatchToProps = dispatch => ({
	buildGrid: () => dispatch(createGrid()),
	markVisited: (i, j) => dispatch(markCellVisited(i, j)),
	numberVisited: data => dispatch(countVisited(data)),
	markSPBFS: (i, j) => dispatch(markShortestPathBFS(i, j)),
	markSPDFS: (i, j) => dispatch(markShortestPathDFS(i, j)),
	markSPDijkstra: (i, j) => dispatch(markShortestPathDijkstra(i, j)),
	markSPAstar: (i, j) => dispatch(markShortestPathAstar(i, j)),
	findPath: () => dispatch(findPath(true)),
	gameEnd: endGame => dispatch(gameOver(endGame)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen);
