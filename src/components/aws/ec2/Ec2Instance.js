import React from 'react';
import DocumentTitle from 'react-document-title';
import { Label, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Ec2InstanceTable } from './Ec2InstanceTable';

export const statusStyle = instance => instance['Instance State'] === 'RUNNING' ? 'success' : 'warning';

export const name = tags => {
  const tag = tags.find(thisTag => thisTag.key === 'Name');
  return tag ? tag.value : null;
};

export const Ec2InstanceDetails = ({ ec2Instance }) => (
  <div className="expanded-row">
    <ul>
      <li>Instance Id:&nbsp;
        <a
          href={`https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:instanceId=${ec2Instance['Instance Id']}`}
          target={'_blank'}
        >
          {ec2Instance['Instance Id']}
        </a>
      </li>
      <li>{`Name: ${name(JSON.parse(ec2Instance['Tag List']))}`}</li>
      <li>{`Instance Type: ${ec2Instance['Instance Type']}`}</li>
      <li>{`DNS Name: ${ec2Instance['DNS Name']}`}</li>
      <li>{`PEM Key Name: ${ec2Instance['Key Name']}`}</li>
      <li>{`Public IP: ${ec2Instance['Public IP Address']}`}</li>
      <li>{`Private IP: ${ec2Instance['Private IP Address']}`}</li>
      <li>{`Subnet Id: ${ec2Instance['Subnet Id']}`}</li>
      <li>{`VPC Id: ${ec2Instance['VPC Id']}`}</li>
    </ul>
  </div>
);

export const Ec2Instance = ({ ec2Instance }) => (
  <Row className="ec2-instance">
    <LinkContainer
      to={`/ec2/instances/${ec2Instance['Instance Id']}`}
      style={{ cursor: 'pointer' }}
      activeStyle={{ fontWeight: 'bold' }}
    >
      <h4>
        {ec2Instance['Instance Id']}
        <Label className={'pull-right'} bsStyle={statusStyle(ec2Instance)}>
          {ec2Instance['Instance State']}
        </Label>
      </h4>
    </LinkContainer>
    <Ec2InstanceDetails ec2Instance={ec2Instance} />
  </Row>
);

export const Ec2Instances = ({ aws }) => (
  <DocumentTitle title={'kinops - AWS EC2'}>
    {!aws.ec2InstancesLoaded
      ? <span>Loading...</span>
      : <Ec2InstanceTable data={aws.ec2Instances} />
    }
  </DocumentTitle>
);
