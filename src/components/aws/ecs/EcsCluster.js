import React from 'react';
import DocumentTitle from 'react-document-title';
import { Route } from 'react-router-dom';
import { Badge, Col, Label, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { EcsTasksContainer, EcsServicesContainer } from '../AwsContainer';
import { AwsEcsContInstanceContainer } from './AwsEcsContInstanceContainer';
import { AwsEcsContInstancesContainer } from './AwsEcsContInstancesContainer';
import { EcsTasksByDefinition } from './EcsTasksByDefinition';
import { EcsTasksBySpace } from './EcsTasksBySpace';
import { EcsTaskById } from './EcsTaskById';
import { capitalize } from '../../../helpers/string';

const labelStyle = cluster => cluster.Status === 'ACTIVE' ? 'success' : 'warning';

export const EcsCluster = ({ aws }) =>
  <DocumentTitle title={'kinops - AWS ECS Cluster'}>
    {!aws.ecsClusterLoaded
      ? <span>Loading...</span>
      :
      <Row className="box">
        <Col>
          <Row>
            <Col>
              <h3>Cluster Name:&nbsp;
                <a
                  href={`https://console.aws.amazon.com/ecs/home?region=us-east-1#/clusters/${aws.ecsCluster['Cluster Name']}`}
                  target={'_blank'}
                >
                  {aws.ecsCluster['Cluster Name']}
                </a>
              </h3>
              <ul>
                <li>
                  Status: {
                    <Label bsStyle={labelStyle(aws.ecsCluster)}>
                      {capitalize(aws.ecsCluster.Status)}
                    </Label>
                  }
                </li>
                <li>
                  Pending Tasks: {
                    <Badge>{aws.ecsCluster['Number of Pending Tasks']}</Badge>
                  }
                </li>
              </ul>
            </Col>
          </Row>
          <hr />
          <Tab.Container id="ecs-cluster-tabs" defaultActiveKey="">
            <Row className="clearfix">
              <Col sm={3}>
                <Nav bsStyle="pills" stacked>
                  <LinkContainer to="/ecs/containers">
                    <NavItem eventKey="ecs-containers">
                      Container Instances <Badge>{aws.ecsCluster['Number of Containers']}</Badge>
                    </NavItem>
                  </LinkContainer>
                  <LinkContainer to="/ecs/services">
                    <NavItem eventKey="ecs-services">
                      Services <Badge>{aws.ecsCluster['Number of Services']}</Badge>
                    </NavItem>
                  </LinkContainer>
                  <LinkContainer to="/ecs/tasks">
                    <NavItem eventKey="ecs-tasks">
                      Tasks <Badge>{aws.ecsCluster['Number of Tasks']}</Badge>
                    </NavItem>
                  </LinkContainer>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content animation>
                  <Tab.Pane eventKey="ecs-containers">
                    <Route path={'/ecs/containers'} component={AwsEcsContInstancesContainer} />
                    <Route path={'/ecs/containers/:containerId'} component={AwsEcsContInstanceContainer} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="ecs-services">
                    <Route path={'/ecs/services'} component={EcsServicesContainer} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="ecs-tasks">
                    <Route path={'/ecs/tasks/:taskId'} component={EcsTaskById} />
                    <Route path={'/ecs/tasks/definitions/:taskDefinition'} component={EcsTasksByDefinition} />
                    <Route path={'/ecs/tasks/spaces/:spaceSlug'} component={EcsTasksBySpace} />
                    <Route path={'/ecs/tasks'} component={EcsTasksContainer} />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>}
  </DocumentTitle>;
