import React from 'react';
import { Label } from 'react-bootstrap';
import Moment from 'react-moment';
import { EcsTasksBySpace } from '../aws/ecs/EcsTasksBySpace';

export const statusLabelStyle = space => space['Environment Status'] === 'Active' ? 'success' : 'warning';

export const Space = ({ space, loaded }) =>
  loaded ? (
    <div>
      <h4>
        <a href={`https://kinops.io/${space['Space Slug']}`} rel="noopener noreferrer" target="_blank">
          {space['Company Name']} ({space['Space Slug']})
        </a>
        <Label className={'pull-right'} bsStyle={statusLabelStyle(space)}>
          {space['Environment Status']}
        </Label>
      </h4>
      <div>
        <div>
          <strong>Admin User:</strong> {space['Admin Name']} &lt;{space['Admin Email']}&gt;
        </div>
        <div>
          <strong>Created:</strong> <Moment fromNow>{space['Created At']}</Moment>
        </div>
        {space.Description && (
          <div>
            <strong>Description:</strong> {space.Description}
          </div>
        )}
      </div>
      <hr />
      <div>
        <strong>Shared Workflow Engine:</strong> {space['Shared Workflow Engine']}
      </div>
      <hr />
      <EcsTasksBySpace spaceSlug={space['Space Slug']} />
    </div>
  ) : (
    <div className="component">Loading...</div>
  );
