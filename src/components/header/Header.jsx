import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chooseAlg, setLevel } from '../../redux/filter/filter.actions';
import { addWalls, findPath, resetVisitedAndSP } from '../../redux/grid/grid.actions';
import { Button } from '@material-ui/core'
import shortId from 'shortid';
import SettingsIcon from '@material-ui/icons/Settings';
import { HeaderContainer, HeaderTitle, HeaderOptions, HeaderSelect, HeaderOption, HeaderRight, HeaderMapSize, HeaderTitleH1 } from './header-styles';
import MapSizeSetting from '../map-size-setting/MapSizeSetting';


class Header extends Component {    

    constructor() {
        super();
        this.state = {
            isActive: false,
            idx:  2,
            idy: 1,
        }
    }
    
    componentDidMount() {   
        this.saveLocalStorage(this.props.results);
    };
    
    componentDidUpdate(prevProps) {

        const { results, levels, algorithms, currentAlg, setResults, numCV } = this.props;

        if(prevProps.time !== this.props.time) {
            
            setResults([...results, {      
                id: shortId(),
                name: algorithms[currentAlg].name,
                timeFunc: this.props.time,
                markVisited: numCV,                                        
                timestamp: new Date().getTime(),
                gameLevel: levels           
            }],);
            this.saveLocalStorage(results);
        }  
        this.saveLocalStorage(results);
             
    };

    saveLocalStorage = (results) => {
        localStorage.setItem('results', JSON.stringify(results));          
    };

    toogle = () => {
        this.setState(prevState => ({
            isActive: !prevState.isActive
        }));
    }

    toggleLevels = () => {
        this.setState(prevState => ({
            idx: prevState.idx ++
        }))
    }

    toggleLevelsAutoPlay = () => {
        this.setState(prevState => ({
            idy: prevState.idy ++
        }))
    }
    
    render() {
        const {
            algorithms,
            chooseAlg,      
            enableVisualizeButton,  
            resetVisitedAndSPCells,
            findPath,  
            addWall,                   
            removeLocalStorage,                     
        } = this.props; 
        
        
        
        return (
            <HeaderContainer>
                <HeaderTitle>
                    <HeaderTitleH1>Pathfinding Visualizer</HeaderTitleH1>                     
                </HeaderTitle>
                <HeaderRight>
                    <HeaderOptions>
                        <HeaderSelect onChange={(e) => chooseAlg(e.target.value)} disabled={!enableVisualizeButton}>                                                                    
                            {algorithms.map((alg) => (
                                <HeaderOption value={alg.id} key={alg.id}>                            
                                    {alg.name}
                                </HeaderOption>
                            ))}
                        </HeaderSelect>  
                        <Button style={{margin: '.5rem', width: '10rem'}} disabled={!enableVisualizeButton} variant="contained" color="primary"
                            onClick={() => {  
                                localStorage.removeItem('visited');                         
                                resetVisitedAndSPCells();
                                findPath();                                                                                  
                            }}
                        >
                            Play 
                        </Button>                
                        <Button style={{margin: '.5rem', width: '10rem'}} disabled={!enableVisualizeButton} variant="contained" color="primary"
                            onClick={() => {  
                                localStorage.removeItem('visited');                          
                                addWall();
                                resetVisitedAndSPCells();
                                findPath();  
                                this.toggleLevels();  
                                console.log(this.state.idx);                          
                                this.props.settingLevels(this.state.idx);                                                 
                            }}
                        >
                            Next Level 
                        </Button>
                        <Button style={{margin: '.5rem', width: '10rem'}} variant="contained" color="primary" disabled={!enableVisualizeButton}
                            onClick={() => {
                                setInterval(() => {
                                    localStorage.removeItem('visited');                         
                                    addWall();
                                    resetVisitedAndSPCells();
                                    findPath();  
                                    this.toggleLevelsAutoPlay();                            
                                    this.props.settingLevels(this.state.idy);
                                }, 5000)

                                
                            }}
                        >
                            AUTO PLAY
                        </Button>
                        <Button style={{margin: '.5rem', width: '10rem'}} variant="contained" color="primary" disabled={!enableVisualizeButton}
                            onClick={() => {                                                           
                                resetVisitedAndSPCells();                            
                                findPath(); 
                            }}
                        >Repeat</Button>
                        <Button style={{margin: '.5rem', width: '10rem'}} variant="contained" color="primary" disabled={!enableVisualizeButton}
                            onClick={() => {
                                removeLocalStorage();
                                window.location.reload();                            
                            }}
                        >Delete scores</Button>
                    
                        <HeaderMapSize>
                            <SettingsIcon style={{fontSize: 'xx-large' }} onClick={this.toogle}/>
                                                                           
                        </HeaderMapSize>
                    </HeaderOptions>
                    {this.state.isActive ? <div><MapSizeSetting/></div> : 
                            <div hidden><MapSizeSetting /></div>
                        } 
                </HeaderRight> 
                                             
            </HeaderContainer>
            
        )
    }    
}

const mapStateToProps = (state) => ({
    algorithms: state.filter.algorithms,
    currentAlg: state.filter.currentAlg,
    enableVisualizeButton: state.grid.enableVisualizeButton,
    time: state.filter.time,
    levels: state.filter.level,
    numCV: state.filter.numberCV,
});

const mapDispatchToProps = (dispatch) => ({
    chooseAlg: (id) => dispatch(chooseAlg(parseInt(id))), 
    findPath: () => dispatch(findPath(false)),
    resetVisitedAndSPCells: () => dispatch(resetVisitedAndSP()),
    addWall: () => dispatch(addWalls()),
    settingLevels: (lv) => dispatch(setLevel(lv)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);






