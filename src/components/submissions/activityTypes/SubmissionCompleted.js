import React from 'react';
import Moment from 'react-moment';
import { activityData } from '../SubmissionActivity';

export const SubmissionCompletedHeader = ({ activity }) => {
  const data = activityData(activity);
  return (
    <div>
      <h4 className={'col-sm-6'}>{activity.label}</h4>
      <h4 className={'col-sm-6 text-right'}>{data.Status}</h4>
    </div>
  );
};

export const SubmissionCompletedBody = ({ activity, submission }) => {
  const data = activityData(activity);
  return (
    <div>
      <div className={'row'}>
        <span className={'fa fa-fw fa-2x fa-flag-checkered'} />
        <div className={'col-xs-10'}>
          <span className={'fa fa-calendar'} />
          <span>Closed</span>
          <span data-toggle={'tooltip'} title={submission.closedAt}>
            <Moment fromNow>{submission.closedAt}</Moment>
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
