import React from 'react';
import { ApprovalHeader, ApprovalBody } from './activityTypes/Approval';
import { DefaultHeader, DefaultBody } from './activityTypes/Default';
import { SubmissionCompletedHeader, SubmissionCompletedBody } from './activityTypes/SubmissionCompleted';
import { SubmissionSubmittedHeader, SubmissionSubmittedBody } from './activityTypes/SubmissionSubmitted';
import { TaskHeader, TaskBody } from './activityTypes/Task';

export const SubmissionActivityHeader = ({ activity, submission }) => {
  let config;
  switch (activity.type) {
    case 'Approval':
      config = <ApprovalHeader activity={activity} submission={submission} />;
      break;
    case 'Submission Completed':
      config = <SubmissionCompletedHeader activity={activity} submission={submission} />;
      break;
    case 'Submission Submitted':
      config = <SubmissionSubmittedHeader activity={activity} submission={submission} />;
      break;
    case 'Task':
      config = <TaskHeader activity={activity} submission={submission} />;
      break;
    default:
      config = <DefaultHeader activity={activity} submission={submission} />;
  }
  return config;
};

export const SubmissionActivityBody = ({ activity, submission }) => {
  let config;
  switch (activity.type) {
    case 'Approval':
      config = <ApprovalBody activity={activity} submission={submission} />;
      break;
    case 'Submission Completed':
      config = <SubmissionCompletedBody activity={activity} submission={submission} />;
      break;
    case 'Submission Submitted':
      config = <SubmissionSubmittedBody activity={activity} submission={submission} />;
      break;
    case 'Task':
      config = <TaskBody activity={activity} submission={submission} />;
      break;
    default:
      config = <DefaultBody activity={activity} submission={submission} />;
  }
  return config;
};
