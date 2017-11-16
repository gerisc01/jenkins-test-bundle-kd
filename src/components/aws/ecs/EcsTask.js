import React from 'react';
import DocumentTitle from 'react-document-title';
import { Label, Row } from 'react-bootstrap';
import { EcsTaskTable } from './EcsTaskTable';
import { idFromArn, toDateFromEpoch } from '../../../helpers/awsRequest';
import { capitalize } from '../../../helpers/string';

export const statusStyle = task => task['Last Status'] === 'RUNNING' ? 'success' : 'danger';

export const EcsTask = ({ task }) => (
  <Row className="ecs-task box">
    <h4>
      {task['Space Slug']} - {idFromArn(task['Task Definition Arn'])}
      <Label className={'pull-right'} bsStyle={statusStyle(task)}>
        {capitalize(task['Last Status'])}
      </Label>
    </h4>
    <EcsTaskDetails task={task} />
  </Row>
);

export const EcsTaskDetails = ({ task }) => (
  <div className="expanded-row">
    <ul>
      <li>Task:&nbsp;
        <a
          href={`https://console.aws.amazon.com/ecs/home?region=us-east-1#/clusters/kinops/tasks/${idFromArn(task['Task Arn'])}`}
          target={'_blank'}
        >
          {idFromArn(task['Task Arn'])}
        </a>
      </li>
      <li>Container Instance:&nbsp;
        <a
          href={`https://console.aws.amazon.com/ecs/home?region=us-east-1#/clusters/kinops/containerInstances/${idFromArn(task['Container Instance Arn'])}`}
          target={'_blank'}
        >
          {idFromArn(task['Container Instance Arn'])}
        </a>
      </li>
      <li>EC2 Instance:&nbsp;
        <a
          href={`https://uconsole.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:instanceId=${task['EC2 Instance Id']}`}
          target={'_blank'}
        >
          {task['EC2 Instance Id']}
        </a>
      </li>
      <li>Host: {task['IP Address']}:{task['Host Port']}</li>
      <li>Created At: {toDateFromEpoch(task['Created At'])}</li>
      <li>Started At: {toDateFromEpoch(task['Started At'])}</li>
    </ul>
  </div>
);

export const EcsTasks = ({ aws }) => (
  <DocumentTitle title={'kinops - AWS ECS Tasks'}>
    {!aws.ecsTasksLoaded
      ? <span>Loading...</span>
      : <EcsTaskTable data={aws.ecsTasks} />
    }
  </DocumentTitle>
);
