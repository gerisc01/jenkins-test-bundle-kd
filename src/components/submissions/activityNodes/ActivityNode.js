import React from 'react';
import { SubmissionActivityHeader, SubmissionActivityBody } from '../SubmissionActivityType';

export const ActivityNode = ({ activity, submission }) =>
  <li className={'activity-node'} data-activity-id={activity.id}>
    <div className={'timeline-panel'}>
      <div className={'timeline-heading clearfix'}>
        <SubmissionActivityHeader activity={activity} submission={submission} />
      </div>
      <div className={'timeline-body clearfix'}>
        <SubmissionActivityBody activity={activity} submission={submission} />
      </div>
      {/*
        <div className="timeline-body">
          <p className="text-center">
            <span className="fa fa-spinner fa-spin" />
            <span>Loading</span>
          </p>
        </div>
        */}
    </div>
  </li>;

