import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { SpaceCard } from './SpaceCard';

export const SpaceList = ({ spaces, loaded, currentTemplate, match }) =>
  <div>
    {loaded && match.isExact &&
      <div>
        <div className="text-center">
          <Button
            bsStyle="primary"
            bsSize="large"
            href={`https://kinops.io/${currentTemplate}`}
          >
            {`Current Space Template (${currentTemplate})`}
          </Button>
        </div>
        <div>
          <h3>
            Spaces
            &nbsp;
            <Badge>{spaces.length}</Badge>
          </h3>
          <div className="spacesList">
            {spaces.map(space => <SpaceCard key={space['Space Slug']} space={space} />)}
          </div>
        </div>
      </div>}
  </div>;
