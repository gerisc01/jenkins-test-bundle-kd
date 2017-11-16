import React from 'react';
import DocumentTitle from 'react-document-title';
import { Route, Link } from 'react-router-dom';
import { Col, Grid, MenuItem, Nav, NavItem, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
// import 'bootstrap-3-card/sass/_card.scss';
import 'react-kinetic-core/styles/modal.scss';
import {
  Ec2Container,
  EcsContainer,
  RdsContainer,
  SesSendQuotaContainer,
  SesSendStatsContainer,
} from './aws/AwsContainer';
import { Ses } from './aws/ses/Ses';
import { CatalogContainer } from './catalog/CatalogContainer';
import { ProfileContainer } from './profile/ProfileContainer';

import '../vendor/font-awesome-4.7.0/css/font-awesome.min.css';
import '../App.css';

export const AppContainer = () =>
  <DocumentTitle title={'kinops Manage'}>
    <Grid className="layout">
      <Row>
        <Col>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Home</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to={'/spaces'}>
                  <NavItem>Spaces</NavItem>
                </LinkContainer>
                <LinkContainer to={'/submissions'}>
                  <NavItem>Submissions</NavItem>
                </LinkContainer>
                <LinkContainer to={'/ec2'}>
                  <NavItem>EC2</NavItem>
                </LinkContainer>
                <LinkContainer to={'/ecs'}>
                  <NavItem>ECS</NavItem>
                </LinkContainer>
                <LinkContainer to={'/rds'}>
                  <NavItem>RDS</NavItem>
                </LinkContainer>
                <LinkContainer to={'/ses'}>
                  <NavItem>SES</NavItem>
                </LinkContainer>
              </Nav>
              <Nav pullRight>
                <LinkContainer to={'/profile'}>
                  <NavItem>Profile</NavItem>
                </LinkContainer>
                <NavDropdown title="External Links" id="external-links">
                  <MenuItem href={'https://kinops.signin.aws.amazon.com/console'} target={'_blank'}>AWS Console</MenuItem>
                  <MenuItem href={'https://kibana.kinops.io'} target={'_blank'}>Kibana</MenuItem>
                  <MenuItem href={'https://papertrailapp.com/'} target={'_blank'}>Papertrail</MenuItem>
                  <MenuItem divider />
                  <MenuItem href={'https://community.kinops.io/'} target={'_blank'}>kinops Community</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col>
          <Route path="/" component={CatalogContainer} />
          <Route path="/ec2" component={Ec2Container} />
          <Route path="/ecs" component={EcsContainer} />
          <Route path="/rds" component={RdsContainer} />
          <Route path="/ses" component={Ses} />
          <Route path="/ses/quota" component={SesSendQuotaContainer} />
          <Route path="/ses/stats" component={SesSendStatsContainer} />
          <Route path="/profile" component={ProfileContainer} />
        </Col>
      </Row>
    </Grid>
  </DocumentTitle>;
