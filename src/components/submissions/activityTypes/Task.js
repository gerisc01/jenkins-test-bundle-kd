import React from 'react';
import Moment from 'react-moment';
import { activityData } from '../SubmissionActivity';

export const TaskHeader = ({ activity }) => {
  const data = activityData(activity);
  return (
    <div>
      <h4 className={'col-sm-6'}>{activity.label}</h4>
      <h4 className={'col-sm-6 text-right'}>{data.Status}</h4>
    </div>
  );
};

export const TaskBody = ({ activity }) => {
  let icon;
  const data = activityData(activity);
  switch (data.Status) {
    case 'Completed':
      icon = 'fa-check-circle-o';
      break;
    case 'In Progress':
      icon = 'fa-pencil-square-o';
      break;
    default:
      icon = '';
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
            <span className={'title'}>Assignee</span>
            <div className={'col-xs-12'}>
              <span>
                {data['Assigned Team'] || data['Assigned Individual']}
                {(data['Assigned Team'] && data['Assigned Individual'])
                  ? ` > ${data['Assigned Individual']}` : ''}
              </span>
            </div>
          </div>}
        {data.Status !== 'In Progress'
          && Object.keys(data).find(key => key === 'Comments')
          && (
            <div className={'col-xs-12'}>
              <span className={'title'}>Comments</span>
              <span>{data.Comments}</span>
            </div>)}
      </div>
    </div>
  );
};
