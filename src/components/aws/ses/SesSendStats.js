import React from 'react';
import DocumentTitle from 'react-document-title';
import { Row } from 'react-bootstrap';
import { SesSendStatsTable } from './SesSendStatsTable';

export const SesSendStat = ({ stat }) => (
  <Row className="ses-send-stat">
    <h4>
      {stat.Timestamp}
    </h4>
    <ul>
      <li>Bounces: {stat.Bounces}</li>
      <li>Complaints: {stat.Complaints}</li>
      <li>Delivery Attempts: {stat.DeliveryAttempts}</li>
      <li>Rejects: {stat.Rejects}</li>
    </ul>
  </Row>
);

export const SesSendStats = ({ aws }) => (
  <DocumentTitle title={'kinops - AWS SES Statistics'}>
    {!aws.sesSendStatsLoaded
      ? <span>Loading...</span>
      : <SesSendStatsTable data={aws.sesSendStats} />
    }
  </DocumentTitle>
);
