import React from 'react';
import DocumentTitle from 'react-document-title';
import { Row } from 'react-bootstrap';

export const EcsService = ({ service }) => (
  <Row className="ecs-service">
    <h4>
      {service.Name}
    </h4>
  </Row>
);

export const EcsServices = ({ aws }) => (
  <DocumentTitle title={'kinops - AWS ECS Services'}>
    {!aws.ecsServicesLoaded
      ? <span>Loading...</span>
      :
      <div>
        {aws.ecsServices.length > 0
          ? aws.ecsServices.map(service => <EcsService key={service['Service Arn']} service={service} />)
          : 'There are no services'
        }
      </div>
    }
  </DocumentTitle>
);
