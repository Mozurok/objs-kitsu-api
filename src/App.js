import React, {Component} from 'react';
import './App.css'
import {
  Router,
  Route,
  Switch,
} from "react-router-dom";
import NoMatch from './components/NoMatch'
import history from './helpers/history'
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";

class App extends Component {
  render() {
    return (
      <div className={'container'}>
        <nav>
          <div>
            <span className={'spanFirstTitle'}>BUSCA KITSU</span>
            <span className={'spanFirstTitleSub'}>TESTE FRONT-END</span></div>
          <div><span className={'spanMyName'}>BRUNO MAZUROK DE CASTRO</span></div>
        </nav>
        <Router history={history}>
          <Switch>
            <Route path={'/'} exact component={CharacterList}/>
            <Route path={'/search/:text/page/:number'} component={CharacterList}/>
            <Route path={'/page/:number'} component={CharacterList}/>
            <Route path={'/search/:text'} component={CharacterList}/>
            <Route path={'/details/:id/:name'} exact component={CharacterDetails}/>
            <Route component={NoMatch}/>
          </Switch>
        </Router>
        <footer />
      </div>
    );
  }
}

export default App;

