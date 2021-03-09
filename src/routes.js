import React, {Component} from 'react'

import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import BankGameLevel2 from './components/BankGame/BankGameLevel2';
import BankGameLevel3 from './components/BankGame/BankGameLevel3';
import BankGameStart from './components/BankGame/BankGameStart';
import BankGameVictory from './components/BankGame/BankGameVictory';
import Homepage from './components/Homepage';

class Routes extends Component {

  render() {

    return (
      <div id="routesDiv">
          <Switch>
            <Route path="/home" component={Homepage} />
            <Route exact path="/Bankgame" component={BankGameStart} />
            <Route exact path="/Bankgame2" component={BankGameLevel2} />
            <Route exact path="/Bankgame3" component={BankGameLevel3} />
            <Route exact path="/BankgameVictory" component={BankGameVictory} />
            <Redirect to="/home" />
          </Switch>
      </div>
    )
  }
}


export default withRouter(Routes);
