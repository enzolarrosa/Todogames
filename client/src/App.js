import './App.css';
import {Route, Switch} from 'react-router-dom'
import Landing from './components/Landing.jsx';
import Nav from './components/Nav';
import Home from './components/Home';
import Detail from './components/Detail';
import Create from './components/Create';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
           <Landing/>
        </Route>
        <Route  path='/home'>
           <Nav/>
           <Home/>
        </Route>
        <Route path='/detail/:id'>
          <Detail/>
        </Route>
        <Route path='/create'>
          <Create/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
