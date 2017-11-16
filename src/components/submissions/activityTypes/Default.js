import React from 'react';
import Moment from 'react-moment';
import { activityData } from '../SubmissionActivity';

export const DefaultHeader = ({ activity }) =>
  <h4 className={'col-sm-12'}>{activity.label}</h4>;

export const DefaultBody = ({ activity }) => {
  const data = activityData(activity);
  return (
    <div>
      <div className={'row'}>
        <div className={'col-xs-12'}>
          <span className={'fa fa-calendar'} />
          <span>Created</span>
          <span data-toggle={'tooltip'} title={activity.createdAt}>
            <Moment fromNow>{activity.createdAt}</Moment>
          </span>
        </div>
        <div className={'col-xs-12'}>
          <span className={'fa fa-calendar'} />
          <span>Updated</span>
          <span data-toggle={'tooltip'} title={activity.updatedAt}>
            <Moment fromNow>{activity.updatedAt}</Moment>
          </span>
        </div>
      </div>
      <div className={'row'}>
        <div className={'col-xs-12'}>
          {Object.keys(data).map(key =>
            data[key] &&
              <div key={key}>
                {key !== 'STRING' &&
                  <span className={'title'}>{key}</span>}
                <span>{data[key]}</span>
              </div>,
          )}
        </div>
      </div>
    </div>
  );
};
