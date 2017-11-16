import React from 'react';
import { EcsContainerInstanceTable } from './EcsContainerInstanceTable';

export const EcsContainerInstanceList = ({ instances, loaded, match }) =>
  loaded ? (
    match.isExact &&
    <div>
      {loaded && match.isExact &&
        <div>
          <h3>Container Instances</h3>
          <div className="ecs-containers">
            <EcsContainerInstanceTable data={instances} />
          </div>
        </div>}
    </div>
  ) : (
    <div>Loading...</div>
  );
