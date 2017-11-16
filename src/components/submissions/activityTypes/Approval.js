import React from 'react';
import Moment from 'react-moment';
import { activityData } from '../SubmissionActivity';

export const ApprovalHeader = ({ activity }) => {
  const data = activityData(activity);
  return (
    <div>
      <h4 className={'col-sm-6'}>{activity.label}</h4>
      <h4 className={'col-sm-6 text-right'}>{data.Status}</h4>
    </div>
  );
};

export const ApprovalBody = ({ activity }) => {
  const data = activityData(activity);
  let icon;
  switch (data.Status) {
    case 'Approved':
      icon = 'fa-thumbs-o-up';
      break;
    case 'Denied':
      icon = 'fa-thumbs-o-down';
      break;
    default:
      icon = 'fa-pencil-square-o';
  }
  return (
    <div>
      <div className={'row'}>
        <span className={`fa fa-fw fa-2x ${icon}`} />
        <div className={'col-xs-10'}>
          <span className={'fa fa-calendar'} />
          <span>Created</span>
          <span data-toggle={'tooltip'} title={activity.createdAt}>
            <Moment fromNow>{activity.createdAt}</Moment>
          </span>
        </div>
        <div className={'col-xs-10'}>
          <span className={'fa fa-calendar'} />
          <span>Updated</span>
          <span data-toggle={'tooltip'} title={activity.updatedAt}>
            <Moment fromNow>{activity.updatedAt}</Moment>
          </span>
        </div>
      </div>
      <div className={'row'}>
        {(data['Assigned Team'] || data['Assigned Individual']) &&
          <div className={'col-xs-12'}>
            <span className={'title'}>Approver</span>
            <div className={'col-xs-12'}>
              <span>
                {data['Assigned Team'] || data['Assigned Individual']}
                {(data['Assigned Team'] && data['Assigned Individual'])
                  ? ` > ${data['Assigned Individual']}` : ''}
              </span>
            </div>
          </div>}
        {data.Status !== 'In Progress'
          && Object.keys(data).find(key => key === 'Decision')
          && (
            <div className={'col-xs-12'}>
              <span className={'title'}>Decision</span>
              <span>{data.Decision}</span>
            </div>)}
        {data.Status !== 'In Progress'
          && Object.keys(data).find(key => key === 'Comments')
          && (
            <div className={'col-xs-12'}>
              <span className={'title'}>Comments</span>
              <span>{data.Comments}</span>
            </div>)}
        {data.Status === 'Denied'
          && Object.keys(data).find(key => key === 'Denial Reason')
          && (
            <div className={'col-xs-12'}>
              <span className={'title'}>Denial Reason</span>
              <span>{data['Denial Reason']}</span>
            </div>)}
      </div>
    </div>
  );
};
