import React, { Component } from 'react';
import { EcsTask } from './EcsTask';
import { ecsTaskBR } from '../../../helpers/bridgedResourcesRequest';

const renderTask = (task = {}) =>
  Object.prototype.hasOwnProperty.call(task, 'EC2 Instance Id')
    ? <EcsTask task={task} />
    : 'Task not found';

export class EcsTaskById extends Component {
  constructor(props) {
    super(props);
    const taskId = props.match.params.taskId;
    this.state = {
      taskId,
      task: {},
      loading: true,
    };
  }

  componentWillMount() {
    fetch(ecsTaskBR({ arn: this.state.taskId }))
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          task: responseJson.record.attributes || {},
          loading: false,
        });
      });
  }

  render() {
    return (
      <div className="component">
        {this.state.loading
          ? <span>Loading...</span>
          : renderTask(this.state.task)
        }
      </div>
    );
  }
}
