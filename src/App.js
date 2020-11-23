import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Route, Switch, useHistory } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

function App() {
  const history = useHistory()
  
  return (
    <HashRouter>
      <div className="App">
          <Switch>
            <Route exact path='/' component={localStorage.getItem('username') ? Home : Login} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
          </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
