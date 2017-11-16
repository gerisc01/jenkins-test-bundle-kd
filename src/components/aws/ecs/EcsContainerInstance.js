import React from 'react';
import { Badge, Label, Row } from 'react-bootstrap';
import { EcsTasksByContainer } from './EcsTasksByContainer';
import { idFromArn, toDateFromEpoch } from '../../../helpers/awsRequest';
import { capitalize } from '../../../helpers/string';

export const statusStyle = instance => instance.Status === 'ACTIVE' ? 'success' : 'danger';

export const agentUpdateStatus = instance => instance['Agent Update Status'] === 'UPDATED'
  ? <Label bsStyle="success">Latest Installed</Label>
  : <Label bsStyle="danger">Update Available</Label>;

export const agentConnected = instance => instance['Agent Connected'] === 'true'
  ? <Label bsStyle="success">Connected</Label>
  : <Label bsStyle="danger">Not Connected</Label>;

export const agentVersion = instance => JSON.parse(instance['Version Info']).agentVersion;

export const agentValue = instance =>
  <span>
    {agentVersion(instance)}&nbsp;
    {agentConnected(instance)}&nbsp;
    {agentUpdateStatus(instance)}
  </span>;

export const drawValue = (instance, prop) => {
  let val = '';
  switch (prop) {
    case 'Availability Zone':
      val = JSON.parse(instance.Attributes)
        .filter(element => element.name === 'ecs.availability-zone')
        .map(element => element.value)[0];
      break;
    case 'Docker Version':
      val = JSON.parse(instance['Version Info'])
        .dockerVersion.slice('DockerVersion: '.length);
      break;
    case 'Registered At':
      val = toDateFromEpoch(instance['Registered At']);
      break;
    case 'Instance Type':
      val = JSON.parse(instance.Attributes)
        .filter(element => element.name === 'ecs.instance-type')
        .map(element => element.value)[0];
      break;
    case 'Registered CPU':
      val = JSON.parse(instance['Registered Resources'])
        .filter(element => element.name === 'CPU')
        .map(element => element.integerValue)[0];
      break;
    case 'Remaining CPU':
      val = JSON.parse(instance['Remaining Resources'])
        .filter(element => element.name === 'CPU')
        .map(element => element.integerValue)[0];
      break;
    case 'Registered Memory':
      val = JSON.parse(instance['Registered Resources'])
        .filter(element => element.name === 'MEMORY')
        .map(element => element.integerValue)[0];
      break;
    case 'Remaining Memory':
      val = JSON.parse(instance['Remaining Resources'])
        .filter(element => element.name === 'MEMORY')
        .map(element => element.integerValue)[0];
      break;
    case 'Running Tasks Count':
      val = <Badge>{instance['Running Tasks Count']}</Badge>;
      break;
    case 'Pending Tasks Count':
      val = <Badge>{instance['Pending Tasks Count']}</Badge>;
      break;
    default:
      break;
  }
  return val;
};

export const EcsContainerInstance = ({ instance, loaded }) =>
  loaded ? (
    <Row className="ecs-container-instance">
      <h4>
        <a
          href={`https://console.aws.amazon.com/ecs/home?region=us-east-1#/clusters/kinops/containerInstances/${idFromArn(instance['Container Instance Arn'])}`}
          target={'_blank'}
        >
          {idFromArn(instance['Container Instance Arn'])}
        </a>
        <Label className={'pull-right'} bsStyle={statusStyle(instance)}>
          {capitalize(instance.Status)}
        </Label>
      </h4>
      <EcsContainerInstanceDetails instance={instance} />
      <EcsTasksByContainer containerInstance={instance} />
    </Row>
  ) : (
    <div className="component">Loading...</div>
  );

export const EcsContainerInstanceDetails = ({ instance }) => (
  <div className="expanded-row">
    <ul>
      <li>EC2 Instance:&nbsp;
        <a
          href={`https://us-east-1.console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:instanceId=${instance['EC2 Instance Id']}`}
          target={'_blank'}
        >
          {instance['EC2 Instance Id']}
        </a>
      </li>
      <li>Instance Type: {drawValue(instance, 'Instance Type')}</li>
      <li>Availability Zone: {drawValue(instance, 'Availability Zone')}</li>
      <li>Public IP: {instance['Public IP']}</li>
      <li>Running Tasks Count: {drawValue(instance, 'Running Tasks Count')}</li>
      <li>Pending Tasks Count: {drawValue(instance, 'Pending Tasks Count')}</li>
      <li>Registered CPU: {drawValue(instance, 'Registered CPU')}</li>
      <li>Remaining CPU: {drawValue(instance, 'Remaining CPU')}</li>
      <li>Registered Memory: {drawValue(instance, 'Registered Memory')}</li>
      <li>Remaining Memory: {drawValue(instance, 'Remaining Memory')}</li>
      <li>Docker Agent: {agentValue(instance)}</li>
      <li>Docker Version: {drawValue(instance, 'Docker Version')}</li>
      <li>Registered At: {drawValue(instance, 'Registered At')}</li>
    </ul>
  </div>
);
