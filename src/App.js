import logo from './logo.svg';
import './App.css';
import {Component} from "react";

class App extends Component {
  state = {
    tasks: []
  };

  async componentDidMount() {
    try {
      const response = await fetch('/api/getTasks');
      const body = await response.json();
      this.setState({ tasks: body }); // Fix: Use 'tasks' instead of 'clients'
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  render() {
    const { tasks } = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="App-intro">
              <h2>Tasks</h2>
              {tasks.map(task => (
                  <div key={task.id}>
                    ({task.name}) {task.description} ({task.created})
                  </div>
              ))}
            </div>
          </header>
        </div>
    );
  }
}

export default App;
