import React, { Component } from 'react';
import { EcsTask } from './EcsTask';
import { convertMultipleBridgeRecords } from '../../../lib/BridgedResource';
import { idFromArn } from '../../../helpers/awsRequest';
import { ecsTasksByContainerInstanceBR } from '../../../helpers/bridgedResourcesRequest';

const renderTasks = (tasks = []) =>
  tasks.length > 0
    ? tasks.map(task => <EcsTask key={task['Task Arn']} task={task} />)
    : 'There are no running tasks';

export class EcsTasksByContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerInstance: props.containerInstance,
      containerInstanceId: idFromArn(props.containerInstance['Container Instance Arn']),
      tasks: [],
      size: 0,
      nextPageToken: null,
      loading: true,
    };
  }

  componentWillMount() {
    fetch(ecsTasksByContainerInstanceBR({ containerInstance: this.state.containerInstanceId }))
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.records) {
          this.setState({
            tasks: convertMultipleBridgeRecords(responseJson.records),
            size: responseJson.records.metadata.size,
            nextPageToken: responseJson.records.metadata.nextPageToken,
            loading: false,
          });
        } else if (responseJson.record) {
          this.setState({
            tasks: [].push(responseJson.record.attributes),
            size: 1,
            nextPageToken: null,
            loading: false,
          });
        } else {
          this.setState({
            tasks: [],
            size: 0,
            nextPageToken: null,
            loading: false,
          });
        }
      });
  }

  render() {
    return (
      <div>
        {this.state.loading
          ? <span>Loading Tasks...</span>
          : renderTasks(this.state.tasks)
        }
      </div>
    );
  }
}
