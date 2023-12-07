
import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class taskList extends Component {

    constructor(props) {
        super(props);
        this.state = {tasks: []};
        this.remove = this.remove.bind(this);
    }

   /* componentDidMount() {
        fetch('api/getTasks')
            .then(response => response.json())
            .then(data => this.setState({tasks: data}));
    }*/
    componentDidMount() {
        fetch('api/getTasks')
            .then(response => response.json())
            .then(data => {
                const tasksArray = Array.isArray(data) ? data : [data];
                this.setState({ tasks: tasksArray });
            })
            .catch(error => console.error('API error:', error));
    }


    async remove(id) {
        await fetch(`/deleteTask/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedTasks = [...this.state.tasks].filter(i => i.id !== id);
            this.setState({tasks: updatedTasks});
        });
    }

    render() {
        const {tasks, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const taskList = tasks.map(task => {
            return <tr key={task.id}>
                <td style={{whiteSpace: 'nowrap'}}>{task.name}</td>
                <td>{task.description}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={`/api/getTask/${task.id}`}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(task.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/api/addTask/new">Add Task</Button>
                    </div>
                    <h3>Tasks</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Description</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {taskList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );

    }

}
export default taskList;