import React from 'react';
import Moment from 'react-moment';
import { activityData } from '../SubmissionActivity';

export const SubmissionSubmittedHeader = ({ activity }) =>
  <h4 className={'col-sm-12'}>{activity.label}</h4>;

export const SubmissionSubmittedBody = ({ activity, submission }) => {
  const data = activityData(activity);
  return (
    <div>
      <div className={'row'}>
        <span className={'fa fa-fw fa-2x fa-handshake-o'} />
        <div className={'col-xs-10'}>
          <span className={'fa fa-calendar'} />
          <span>Submitted</span>
          <span data-toggle={'tooltip'} title={submission.submittedAt}>
            <Moment fromNow>{submission.submittedAt}</Moment>
          </span>
        </div>
      </div>
      {Object.keys(data).find(key => key === 'Comments')
        && (
          <div className={'row'}>
            <div className={'col-xs-12'}>
              <span>{data.Comments}</span>
            </div>
          </div>)}
    </div>
  );
};
