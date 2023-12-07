import logo from './logo.svg';
import './App.css';
import {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import taskList from "./taskList";
import taskEdit from "./taskEdit";
import Home from "./Home";

class App extends Component {

  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/api/getTasks' exact={true} component={taskList}/>
            <Route path='/api/updateTask/:id' component={taskEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
