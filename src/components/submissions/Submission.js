import React from 'react';
import DocumentTitle from 'react-document-title';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { Card, CardBlock, CardTitle } from 'react-bootstrap-card';
import { SubmissionActivity } from './SubmissionActivity';
import { Icon } from '../catalog/Icon';

function submissionStatus(submission) {
  let value = submission.values.Status || submission.coreState;
  if (value === 'Draft' && submission.coreState === 'Submitted') {
    value = 'Submitted';
  }
  return value;
}

export const Submission = ({ submission }) => (
  <DocumentTitle title={'kinops - Submission'}>
    {submission === null ? (
      <span className="component">Loading...</span>
    ) : (
      <Row className="submission">
        <Col md={12}>
          <Row className="submission-details">
            <Col md={5}>
              <Row>
                <Col md={12}>
                  <Card>
                    <CardBlock>
                      <CardTitle>
                        <Icon attributes={submission.form.attributes} />
                        {submission.form.name} ({submission.handle})
                      </CardTitle>
                      <p className="card-text">{submission.form.description}</p>
                    </CardBlock>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <h6>Summary:
                          <small className="text-muted">{submission.label}</small>
                        </h6>
                      </li>
                      {submission.submittedAt
                        && (
                          <li className="list-group-item">
                            <h6>Submitted At:
                              <small className="text-muted" data-toggle="tooltip" title={submission.submittedAt}>
                                <Moment fromNow>{submission.submittedAt}</Moment>
                              </small>
                            </h6>
                          </li>
                        )}
                      {!submission.submittedAt
                        && (
                          <li className="list-group-item">
                            <h6>Created At:
                              <small className="text-muted" data-toggle="tooltip" title={submission.submittedAt}>
                                <Moment fromNow>{submission.createdAt}</Moment>
                              </small>
                            </h6>
                          </li>
                        )}
                      {submission.coreState === 'Closed'
                        && (
                          <li className="list-group-item">
                            <h6>Completed In:
                              <small
                                className="text-muted"
                                data-toggle="tooltip"
                                title=""
                              >
                                <Moment from={submission.closedAt} ago>
                                  {submission.submittedAt}
                                </Moment>
                              </small>
                            </h6>
                          </li>
                        )}
                      <li className="list-group-item">
                        <h6>Status
                          <small className="text-muted">{submissionStatus(submission)}</small>
                        </h6>
                      </li>
                    </ul>
                  </Card>
                </Col>
              </Row>
              <Row className="actions">
                <Col xs={12}>
                  <ul className="action-buttons list-inline">
                    <Link to={`/submissions/${submission.id}?review`}>Review Submission</Link>
                  </ul>
                </Col>
              </Row>
            </Col>
            <Col md={7}>
              <SubmissionActivity submission={submission} />
            </Col>
          </Row>
        </Col>
      </Row>
    )}
  </DocumentTitle>
);
