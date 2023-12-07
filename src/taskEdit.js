import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

// component will be responsible for creating and editing our task.
class taskEdit extends Component {

    emptyItem = {
        name: '',
        description: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //  check whether we’re dealing with the create or edit feature; in the case of editing,
    //  it’ll fetch our client from the API:
    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const task = await (await fetch(`/api/getTask/${this.props.match.params.id}`)).json();
            this.setState({item: task});
        }
    }

    //  handleChange function, we’ll update our component state item property
    //  that will be used when submitting our form:
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

   // In handeSubmit, we’ll call our API, sending the request to a PUT or POST
    // method depending on the feature we’re
    // invoking. For that, we can check if the id property is filled:
    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

       // const url = `/api/getTasks${item.id ? `/${item.id}` : ''}`;
        const url = `/api/updateTask${item.id ? `/${item.id}` : ''}`;

        try {
            const response = await fetch(url, {
                method: item.id ? 'PUT' : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            this.props.history.push('/api/getTasks');
        } catch (error) {
            console.error('Error during fetch:', error);
            // Handle the error (e.g., show a message to the user)
        }

    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Task' : 'Add Task'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description" value={item.description || ''}
                               onChange={this.handleChange} autoComplete="description"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/clients">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }



}
export default withRouter(taskEdit);