import React, { Component } from 'react';

import { PlayScreenContainer, PlayScreenLevel, PlayScreenInfo, PlayScreenGrid, PlayScreenTable, PlayScreenLevelH3 } from './playScreen-styles';

import { connect } from 'react-redux';
import GridCell from '../../grid-cell/GridCell';
import Graph from '../../../utils/graph';
import Queue from '../../../utils/queue';
import Stack from '../../../utils/stack';
import Node from '../../../utils/node';
import PriorityQueue from '../../../utils/priorityQueue';

import {
    markCellVisited,
    markShortestPath,
    findPath,
    createGrid,
    wKeyPress,
    cellClicked,
    dragDrop,
    mouseDown,
    mouseOver
} from '../../../redux/grid/grid.actions';
import { cellVisitedNumber, timeSpent } from '../../../redux/filter/filter.actions';

class PlayScreen extends Component {
  
  state = {
    routing: false,
    animationWait: 10,
    endGame: false,    
    
  };

  componentDidMount() {
    const { buildGrid, wKeyPressed } = this.props;
    buildGrid();
    this.handleKeyPress(wKeyPressed);
  }

  componentDidUpdate() {
    const {
      enableVisualizeButton,
      gridCells,
      playerPos,
      targetPos,
      currentAlg,
      markVisited,
      markSP,
      findPath,      
    } = this.props;

    if (!enableVisualizeButton && !this.state.routing) {
      this.setState({ routing: true }, () => {
        switch (currentAlg) {
          case 0:           
            this.bfs(gridCells, playerPos, targetPos, markVisited, markSP, findPath);           
            break;
          case 1:
            this.dfs(gridCells, playerPos, targetPos, markVisited, markSP, findPath);
            break;
          case 2:
            this.dijkstra(gridCells, playerPos, targetPos, markVisited, markSP, findPath);
            break;
          case 3:
            this.astar(gridCells, playerPos, targetPos, markVisited, markSP, findPath);
            break;
          default:
            break;
        }
      });
    }
  }

  

  // Breadth First Search Algorithm
  bfs = async (gridCells, playerPos, targetPos, markVisited, markSP, findPath) => {
    let { graph, cellIdPositionMap } = this.initializeGraph(gridCells);
    let playerId = gridCells[playerPos.i][playerPos.j].id;
    let targetId = gridCells[targetPos.i][targetPos.j].id;

    let visited = new Set();
    let queue = new Queue();

    queue.enqueue(new Node(playerId));
    visited.add(playerId);

    let targetFound = false;
    let parent = new Map();

    while (!queue.isEmpty()) {
      let node = queue.dequeue();
      let temp = graph.adjList.get(node.id).head;
      
      while (temp !== null) {
        if (!visited.has(temp.id)) {
          parent.set(temp.id, node.id);

          let { i, j } = cellIdPositionMap.get(temp.id);
          markVisited(i, j);

          let mv = markVisited(i, j);
          let his = JSON.parse(localStorage.getItem('visited')) || [];
          his.push(mv)
          localStorage.setItem('visited', JSON.stringify(his));

          await this.wait(this.state.animationWait);

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
      this.setState({endeGame: false})
      this.drawShortestPath(parent, playerId, targetId, cellIdPositionMap, markSP);      
    }  
    let t1 = new Date().getTime();
    findPath();   
    let t2 = new Date().getTime();
    this.t = t2-t1; 
    this.props.timeSpents(this.t);
    if (!targetFound) {
      this.setState({endeGame: true});
    }

    let getCVNumber = JSON.parse(localStorage.getItem('visited'));
   
    this.props.cellVisitedNumbers(getCVNumber.length);

    this.setState({ routing: false });
  };

  // Depth First Search
  dfs = async (gridCells, playerPos, targetPos, markVisited, markSP, findPath) => {
    
    let { graph, cellIdPositionMap } = this.initializeGraph(gridCells);
    let playerId = gridCells[playerPos.i][playerPos.j].id;
    let targetId = gridCells[targetPos.i][targetPos.j].id;

    let visited = new Set();
    let stack = new Stack();

    stack.push(new Node(playerId));
    visited.add(playerId);

    let targetFound = false;
    let parent = new Map();

    while (!stack.isEmpty()) {
      let node = stack.pop();
      let { i, j } = cellIdPositionMap.get(node.id);
      markVisited(i, j);

      let mv = markVisited(i, j);
      let his = JSON.parse(localStorage.getItem('visited')) || [];
      his.push(mv)
      localStorage.setItem('visited', JSON.stringify(his));

      await this.wait(this.state.animationWait);

      let temp = graph.adjList.get(node.id).head;
      while (temp !== null) {
        if (!visited.has(temp.id)) {
          parent.set(temp.id, node.id);

          if (temp.id === targetId) {
            targetFound = true;
            break;
          }

          visited.add(temp.id);
          stack.push(temp);
        }
        temp = temp.next;
      }

      if (targetFound) {        
        break;
      }
      
    }

    if (targetFound) {      
      this.drawShortestPath(parent, playerId, targetId, cellIdPositionMap, markSP);
    }

    let t1 = new Date().getTime();
    findPath();
    let t2 = new Date().getTime();
    this.t = t2-t1;    
    this.props.timeSpents(this.t);
    if (!targetFound) {
      this.setState({endGame: true});
    }

    let getCVNumber = JSON.parse(localStorage.getItem('visited'));
   
    this.props.cellVisitedNumbers(getCVNumber.length);

    this.setState({ routing: false });
  };

  dijkstra = async (gridCells, playerPos, targetPos, markVisited, markSP, findPath) => {
    
    let { graph, cellIdPositionMap } = this.initializeGraph(gridCells);
    let playerId = gridCells[playerPos.i][playerPos.j].id;
    let targetId = gridCells[targetPos.i][targetPos.j].id;

    let parent = new Map();
    let shortestDistance = new Map();

    let pq = new PriorityQueue();

    for (let i = 0; i < gridCells.length; i++) {
      for (let j = 0; j < gridCells[i].length; j++) {
        if (!gridCells[i][j].isWall) {
          pq.enqueue(new Node(gridCells[i][j].id, Infinity, i, j));
        }
      }
    }

    let targetFound = false;
    pq.decreaseKey(playerId, 0);

    while (!pq.isEmpty()) {
      let current = pq.dequeue();

      if (current.id === playerId) {
        shortestDistance.set(playerId, 0);
      } else if (current.id === targetId && current.weight !== Infinity) {
        //infinity to make sure the node has atleast been touched
        targetFound = true;
        break;
      } else {
        shortestDistance.set(current.id, current.weight);
      }

      let head = graph.adjList.get(current.id).head; //neighbours

      while (head !== null) {
        let totalWeight = shortestDistance.get(current.id) + head.weight;

        if (pq.containsKey(head.id) && pq.peek(head.id).weight > totalWeight) {
          pq.decreaseKey(head.id, totalWeight);
          parent.set(head.id, current.id);

          let { i, j } = cellIdPositionMap.get(head.id);
          markVisited(i, j);

          let mv = markVisited(i, j);
          let his = JSON.parse(localStorage.getItem('visited')) || [];
          his.push(mv)
          localStorage.setItem('visited', JSON.stringify(his));

          await this.wait(this.state.animationWait);
        }
        head = head.next;
      }
      
    }

    if (targetFound) {
      this.drawShortestPath(parent, playerId, targetId, cellIdPositionMap, markSP);
    }
    let t1 = new Date().getTime();    
    findPath();
    let t2 = new Date().getTime();
    this.t = t2-t1;
    this.props.timeSpents(this.t);
    if (!targetFound) {
      this.setState({endGame: true});
    }

    let getCVNumber = JSON.parse(localStorage.getItem('visited'));
   
    this.props.cellVisitedNumbers(getCVNumber.length);
    
    this.setState({ routing: false });
  };

  astar = async (gridCells, playerPos, targetPos, markVisited, markSP, findPath) => {
    let { graph, cellIdPositionMap } = this.initializeGraph(gridCells);
    let playerId = gridCells[playerPos.i][playerPos.j].id;
    let targetId = gridCells[targetPos.i][targetPos.j].id;

    let parent = new Map();
    let shortestDistance = new Map();

    let pq = new PriorityQueue();

    for (let i = 0; i < gridCells.length; i++) {
      for (let j = 0; j < gridCells[i].length; j++) {
        if (!gridCells[i][j].isWall) {
          pq.enqueue(new Node(gridCells[i][j].id, Infinity));
          shortestDistance.set(gridCells[i][j].id, Infinity);
        }
      }
    }

    let targetFound = false;
    pq.decreaseKey(playerId, 0);
    
    while (!pq.isEmpty()) {
      let current = pq.dequeue();

      if (current.id === playerId) {
        shortestDistance.set(current.id, 0);
      } else if (current.id === targetId && current.weight !== Infinity) {
        //infinity to make sure the node has atleast been touched
        targetFound = true;
        break;
      }

      let head = graph.adjList.get(current.id).head; //neighbours

      while (head !== null) {
        // f(n) = g(n) + h(n)
        let g = shortestDistance.get(current.id) + head.weight;

        let { i, j } = cellIdPositionMap.get(head.id);
        let h = Math.abs(targetPos.i - i) + Math.abs(targetPos.j - j);

        let f = g + h * 1.001; // h * 1.001 for tie-breaking if same f values exists in pq

        if (pq.containsKey(head.id) && pq.peek(head.id).weight > f) {
          pq.decreaseKey(head.id, f);
          parent.set(head.id, current.id);

          shortestDistance.set(head.id, g);

          markVisited(i, j);

          let mv = markVisited(i, j);
          let his = JSON.parse(localStorage.getItem('visited')) || [];
          his.push(mv)
          localStorage.setItem('visited', JSON.stringify(his));
          // console.log("Broj posecenih: ", his.length);        
          
          await this.wait(this.state.animationWait);
        }
        head = head.next;
        
      }   
         
    }
    
    if (targetFound) {
      this.drawShortestPath(parent, playerId, targetId, cellIdPositionMap, markSP );
    }

    let t1 = new Date().getTime();    
    findPath();
    let t2 = new Date().getTime();
    // this.t = Number(t2-t1).toFixed(3);
    this.t = t2 - t1;
    this.props.timeSpents(this.t);
    
    if (!targetFound) {
      this.setState({endGame: true});
    }   

    let getCVNumber = JSON.parse(localStorage.getItem('visited'));
   
    this.props.cellVisitedNumbers(getCVNumber.length);
    this.setState({ routing: false });
  };

  initializeGraph(gridCells) {
    let graph = new Graph();
    let cellIdPositionMap = new Map();

    for (let i = 0; i < gridCells.length; i++) {
      for (let j = 0; j < gridCells[i].length; j++) {
        if (!gridCells[i][j].isWall) {
          graph.createGraphVertex(gridCells[i][j].id, { i, j });
          cellIdPositionMap.set(gridCells[i][j].id, {i, j});
          // get neighbours
          // up
          if (i - 1 >= 0 && !gridCells[i - 1][j].isWall) {
            graph.addPathBetweenVertices(
              gridCells[i][j].id,
              gridCells[i - 1][j].id,
              gridCells[i - 1][j].weight,
              i - 1,
              j
            );
          }
          // right
          if (j + 1 <= gridCells[i].length - 1 && !gridCells[i][j + 1].isWall) {
            graph.addPathBetweenVertices(
              gridCells[i][j].id,
              gridCells[i][j + 1].id,
              gridCells[i][j + 1].weight,
              i,
              j + 1
            );
          }
          //bottom
          if (i + 1 <= gridCells[i].length - 1 && !gridCells[i + 1][j].isWall) {
            graph.addPathBetweenVertices(
              gridCells[i][j].id,
              gridCells[i + 1][j].id,
              gridCells[i + 1][j].weight,
              i + 1,
              j
            );
          }
          // left
          if (j - 1 >= 0 && !gridCells[i][j - 1].isWall) {
            graph.addPathBetweenVertices(
              gridCells[i][j].id,
              gridCells[i][j - 1].id,
              gridCells[i][j - 1].weight,
              i,
              j - 1
            );
          }
        }
      }
    }    
    
    return { graph, cellIdPositionMap };
  }

  drawShortestPath = async (parent, playerId, targetId, cellIdPositionMap, markSP) => {
    let temp = targetId;
    while (temp !== playerId) {
      let parentId = parent.get(temp);

      let { i, j } = cellIdPositionMap.get(parentId);
      markSP(i, j);     
      await this.wait(this.state.animationWait);
      temp = parentId;
    }
  };

  wait = (microsecs) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), microsecs);
    });
  };

  handleKeyPress = (wKeyPressed) => {
    document.onkeydown = (e) => {
      if (e.key === "w" || e.key === "W") {
        wKeyPressed(true);
      }
    };

    document.onkeyup = (e) => {
      wKeyPressed(false);
    };
  };

  render() {
    const {
      gridCells,
      wKeyPressed,
      cellClicked,
      dragDrop,
      algorithms,
      currentAlg,
      onMouseDown,
      onMouseOver,
      level,           
    } = this.props;

    const { endGame } = this.state;
        
    return (
      <PlayScreenContainer>
        <PlayScreenLevel>
          {endGame===false ? <PlayScreenLevelH3>{`Level ${level}`}</PlayScreenLevelH3> : <PlayScreenLevelH3>Game Over</PlayScreenLevelH3> }
        </PlayScreenLevel>
        <PlayScreenGrid>
          <PlayScreenTable>
            <tbody>
              {gridCells.map((row, i) => (
                <tr key={i}>
                  {row.map((col, j) => (
                    <GridCell
                      key={j}
                      {...col}
                      wKeyPressed={wKeyPressed}
                      onCellClicked={(i, j) =>
                        cellClicked(i, j, algorithms[currentAlg].type)
                      }
                      onDragDrop={dragDrop}
                      mouseDown={onMouseDown}
                      mouseOver={(i, j) =>
                        onMouseOver(i, j, algorithms[currentAlg].type)
                      }
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </PlayScreenTable>
          </PlayScreenGrid>
        <PlayScreenInfo>
          <p>
            Complexity: <span>{algorithms[currentAlg].complexity}</span> <br />
            <span>{algorithms[currentAlg].description}</span> <br />                    
          </p>
        </PlayScreenInfo>
      </PlayScreenContainer>
    );
  }
}

const mapStateToProps = (state) => ({
    gridCells: state.grid.gridCells,
    rows: state.grid.rows,
    columns: state.grid.columns,
    playerPos: state.grid.playerPos,
    targetPos: state.grid.targetPos,
    enableVisualizeButton: state.grid.enableVisualizeButton,
    currentAlg: state.filter.currentAlg,
    algorithms: state.filter.algorithms, 
    numberCV: state.filter.numberCV
});

const mapDispatchToProps = (dispatch) => ({
    buildGrid: () => dispatch(createGrid()),
    markVisited: (i, j) => dispatch(markCellVisited(i, j)),
    markSP: (i, j) => dispatch(markShortestPath(i, j)),
    findPath: () => dispatch(findPath(true)),
    wKeyPressed: (pressed) => dispatch(wKeyPress(pressed)),
    cellClicked: (i, j, algType) => dispatch(cellClicked(i, j, algType)),
    dragDrop: (i, j, type) => dispatch(dragDrop(i, j, type)),
    onMouseDown: (down) => dispatch(mouseDown(down)),
    onMouseOver: (i, j, algType) => dispatch(mouseOver(i, j, algType)),
    timeSpents: (tm) => dispatch(timeSpent(tm)),
    cellVisitedNumbers: (vc) => dispatch(cellVisitedNumber(vc))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen);
