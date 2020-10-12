/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';

import {
	GridCellFloor,
	GridCellPlayer,
	GridCellShortestPathAstar,
	GridCellShortestPathBFS,
	GridCellShortestPathDFS,
	GridCellShortestPathDijkstra,
	GridCellTarget,
	GridCellWall,
} from './GridCell.styles';

const GridCell = (props) => {
	const {
		isWall,
		isPlayer,
		isTarget,
		shortestPathBFS,
		shortestPathDFS,
		shortestPathDijkstra,
		shortestPathAstar,
		i,
		j,
	} = props;

	return (
		isWall
			? (
				<GridCellWall
					className="wall"
					isWall={isWall}
					data-i={i}
					data-j={j}
				/>
			)
			: isPlayer
				? (
					<GridCellPlayer
						className="player"
						isPlayer
						data-i={i}
						data-j={j}
					/>
				)
				: isTarget
					? (
						<GridCellTarget
							target="target"
							isTarget
							data-i={i}
							data-j={j}
						/>
					)
					: shortestPathBFS
						? (
							<GridCellShortestPathBFS
								className="shortest-path-bfs"
								shortestPathBFS
								data-i={i}
								data-j={j}
							/>
						)
						: shortestPathDFS
							? (
								<GridCellShortestPathDFS
									className="shortest-path-dfs"
									shortestPathDFS
									data-i={i}
									data-j={j}
								/>
							)
							: shortestPathDijkstra
								? (
									<GridCellShortestPathDijkstra
										className="shortest-path-dijkstra"
										shortestPathDijkstra
										data-i={i}
										data-j={j}
									/>
								)
								: shortestPathAstar
									? (
										<GridCellShortestPathAstar
											className="shortest-path-astar"
											shortestPathAstar
											data-i={i}
											data-j={j}
										/>
									)
									: (
										<GridCellFloor
											className="floor"
											floor
											data-i={i}
											data-j={j}
										/>
									)
	);
};

export default GridCell;
