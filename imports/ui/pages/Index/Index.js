import React from 'react';
import { Button, Table, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { Random } from 'meteor/random';

class Index extends React.Component {
  state = {
    environmentVariables: [],
  };

  handleUpdateEnvironmentVariable = (_id, field, value) => {
    const environmentVariables = [...this.state.environmentVariables];
    const variableToUpdate = environmentVariables.find((variable) => variable._id === _id);
    variableToUpdate[field] = value;
    this.setState({ environmentVariables });
  };

  handleDeleteEnvironmentVariable = (_id) => {
    const environmentVariables = [...this.state.environmentVariables].filter((variable) => variable._id !== _id);
    this.setState({ environmentVariables });
  };

  addEnvironmentVariable = () => {
    const environmentVariables = [...this.state.environmentVariables];
    environmentVariables.push({
      _id: Random.id(),
      key: '',
      value: '',
    });
    this.setState({ environmentVariables });
  };

  render() {
    return (
      <div>
        {this.state.environmentVariables.length > 0 ? <Table bordered>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.environmentVariables.map(({ _id, key, value }) => (
              <tr key={_id}>
                <td>
                  <input type="text" name="envKey" value={key} onChange={(event) => this.handleUpdateEnvironmentVariable(_id, 'key', event.target.value)} className="form-control" placeholder="ENV_VAR" />
                </td>
                <td>
                  <input type="text" name="envValue" value={value} onChange={(event) => this.handleUpdateEnvironmentVariable(_id, 'value', event.target.value)} className="form-control" placeholder="Variable value goes here..." />
                </td>
                <td>
                  <Button bsStyle="danger" onClick={() => this.handleDeleteEnvironmentVariable(_id)} block>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table> : <Alert bsStyle="warning">No environment variables yet!</Alert>}
        <Button bsStyle="success" onClick={this.addEnvironmentVariable}>Add Environment Variables</Button>
      </div>
    );
  } 
}

export default Index;
