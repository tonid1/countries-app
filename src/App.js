import React from 'react';
import Countries from './country-list';
import Header from './header';
import Eight from './eight';
import Quarters from './quarters';
import SemiFinals from './semifinals';
import Finals from './finals';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Countries} />
          <Route path='/roundof16' exact component={Eight} />
          <Route path='/quarters' exact component={Quarters} />
          <Route path='/semifinals' exact component={SemiFinals} />
          <Route path='/finals' exact component={Finals} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;