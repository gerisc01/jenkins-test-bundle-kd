import React from 'react';
import DocumentTitle from 'react-document-title';

export const SesSendQuota = ({ aws }) => (
  <DocumentTitle title={'kinops - AWS SES Quota'}>
    {!aws.sesSendQuotaLoaded
      ? (
        <span>Loading...</span>
      ) : (
        <div className={'box'}>
          <div>
            <strong>Sent Last 24 Hours: </strong>
            {aws.sesSendQuota.SentLast24Hours}
          </div>
          <div>
            <strong>Max Send Rate: </strong>
            {aws.sesSendQuota.MaxSendRate}
          </div>
          <div>
            <strong>Max 24 Hour Send Limit: </strong>
            {aws.sesSendQuota.Max24HourSend}
          </div>
        </div>
      )
    }
  </DocumentTitle>
);
