import React from 'react';

export const TimelineNode = ({ submissionId, startNode, endNode, activities }) =>
  <ul
    className={'timeline clearfix'}
    id={'submission-activities'}
    data-submission-id={submissionId}
  >
    {startNode}
    {activities}
    {endNode}
  </ul>;
