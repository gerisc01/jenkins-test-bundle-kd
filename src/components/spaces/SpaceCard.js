import React from 'react';
import { Label } from 'react-bootstrap';
import Moment from 'react-moment';
import { LinkContainer } from 'react-router-bootstrap';
import { statusLabelStyle } from './Space';

export const SpaceCard = ({ space }) =>
  <div className="box">
    <LinkContainer
      to={`/spaces/${space['Space Slug']}`}
      style={{ cursor: 'pointer' }}
    >
      <h4>
        {space['Company Name']} ({space['Space Slug']})
        <Label className={'pull-right'} bsStyle={statusLabelStyle(space)}>
          {space['Environment Status']}
        </Label>
        <span className={'pull-right'}>
          Created <Moment fromNow>{space['Created At']}</Moment>
        </span>
      </h4>
    </LinkContainer>
  </div>;

