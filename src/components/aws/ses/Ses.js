import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';

export const Ses = ({ match }) =>
  <DocumentTitle title={'kinops - AWS SES'}>
    {match.isExact &&
      <div className="ses box">
        <h3><Link to={'/ses/quota'}>SES Send Quota</Link></h3>
        <h3><Link to={'/ses/stats'}>SES Statistics</Link></h3>
      </div>}
  </DocumentTitle>;
