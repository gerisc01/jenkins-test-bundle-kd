import React from 'react';
import { ActivityNode } from './activityNodes/ActivityNode';
import { EmptyNode } from './activityNodes/EmptyNode';
import { EndNode } from './activityNodes/EndNode';
import { InProgressNode } from './activityNodes/InProgressNode';
import { StartNode } from './activityNodes/StartNode';
// import { TimelineNode } from './activityNodes/TimelineNode';
import './submissionActivities.css';

export function activityData(activity) {
  let data;
  try {
    data = JSON.parse(activity.data);
  } catch (e) {
    data = { STRING: activity.data };
  }
  return data;
}

export function activityStatus(activity) {
  return activityData(activity).Status;
}

export const buildActivities = submission => {
  const activityById = {};
  submission.activities.map(activity => {
    const tempActivity = activity;
    tempActivity.submission = tempActivity.submission || {};
    Object.assign(tempActivity.submission, {}, submission);
    delete tempActivity.submission.activities;
    tempActivity.data = activityData(tempActivity);
    activityById[tempActivity.id] =
      <ActivityNode activity={tempActivity} submission={submission} />;
    return null;
  });
  return activityById;
};

export const refreshActivities = activityById => {
  window.console.log(activityById);
  return null;
  // container.find("[data-activity-id]").each(function(){
  //     if (activityById[$(this).data("activity-id")]){
  //         var header = $(activityById[$(this).data("activity-id")]).find(".timeline-header");
  //         var body =
  //  $(activityById[$(this).data("activity-id")]).find(".timeline-body").addClass("collapse");
  //         $(this).find(".timeline-body")
  //                 .before(body)
  //                 .slideUp(500);
  //         bundle.common.tooltip(body);
  //         bundle.common.momentify(body);
  //         body.slideDown(500);
  //         $(this).find(".timeline-header").replaceWith(header);
  //     }
  // });
};

export class SubmissionActivity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submission: props.submission,
      submissionActivity: {
        previousState: JSON.stringify(props.submission.activities),
      },
      startNode: {},
      endNode: {},
      activities: {},
    };
  }

  componentWillMount() { }

  render() {
    return (
      <ul className="timeline clearfix" id="submission-activities" data-submission-id={this.state.submission.id}>
        {this.state.submission.submittedAt
          && <StartNode ts={this.state.submission.submittedAt} label="Started" />}
        {!this.state.submission.submittedAt
          && <StartNode ts={this.state.submission.createdAt} label="Created" />}
        {this.state.submission.activities.map(activity =>
          <ActivityNode
            key={activity.id}
            activity={activity}
            submission={this.state.submission}
          />)}
        {this.state.submission.activities.length === 0
          && <EmptyNode />}
        {this.state.submission.coreState === 'Closed'
          && <EndNode ts={this.state.submission.closedAt} />}
        {this.state.submission.coreState !== 'Closed'
          && <InProgressNode />}
      </ul>
    );
  }
}

