import React from 'react';
import { SubmissionCard } from './SubmissionCard';

export const SubmissionList = ({ submissions, loaded, match }) =>
  loaded ? (
    match.isExact &&
    <div>
      <h3>Submissions</h3>
      <div className="submissionList">
        {submissions.map(submission =>
          <SubmissionCard key={submission.id} submission={submission} />)}
      </div>
    </div>
  ) : (
    <div className="component">Loading...</div>
  );
