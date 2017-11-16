import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Icon } from '../catalog/Icon';

export const SubmissionCard = ({ submission }) => (
  <div
    className={'card mb-1'}
    id={submission.id}
    style={{ border: '1px solid rgba(0, 0, 0, 0.125)', borderRadius: '0.25rem' }}
  >
    <div
      className="card-block"
      style={{ padding: '1.25rem' }}
    >
      <h4 className="card-title">
        <Icon attributes={submission.form.attributes} />
        {submission.form.name}
        <badge className="pull-right">{submission.coreState}</badge>
      </h4>
      <h6
        className="card-subtitle mb-2 text-muted"
        style={{ color: '#636c72 !important' }}
      >{submission.label}</h6>
      {submission.submittedAt ? (
        <div>
          <div className="clearfix">
            <span className="pull-left">Submitted By:</span>
            <span className="font-weight-bold">{submission.submittedBy}</span>
          </div>
          <div className="clearfix">
            <span>Submitted At:</span>
            <span><Moment fromNow>{submission.submittedAt}</Moment></span>
          </div>
        </div>
      ) : (
        <div>
          <div className="clearfix">
            <span className="pull-left">Created By:</span>
            <span className="font-weight-bold">{submission.createdBy}</span>
          </div>
          <div className="clearfix">
            <span>Created At:</span>
            <span><Moment fromNow>{submission.createdAt}</Moment></span>
          </div>
        </div>
      )}
      {submission.closedAt ? (
        <div className="clearfix">
          <span className="pull-left">Closed At:</span>
          <span><Moment fromNow>{submission.closedAt}</Moment></span>
        </div>
      ) : (
        ''
      )}
    </div>
    {submission.submittedAt ? (
      <div className="card-block" style={{ padding: '1.25rem' }}>
        <Link to={`/submission-details/${submission.id}`}>{'Details'}</Link>
        <span>&nbsp;|&nbsp;</span>
        <Link to={`/submissions/${submission.id}?review`}>Review</Link>
        <span>&nbsp;|&nbsp;</span>
        <Link to={`/forms/${submission.form.slug}`}>{'Submit Again'}</Link>
      </div>
    ) : (
      <div className="card-block" style={{ padding: '1.25rem' }}>
        <Link to={`/submissions/${submission.id}`}>{'Resume'}</Link>
      </div>
    )}
  </div>
);

