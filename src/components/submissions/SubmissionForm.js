import React from 'react';
import { bundle, CoreForm } from 'react-kinetic-core';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { push } from 'connected-react-router';

// const addQueryString = response =>
//   response.submission.coreState === 'Submitted' ? '?review' : '';

const isReview = props =>
  Object.keys(parse(props.location.search)).includes('review');

@connect(null, { push })
export class SubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
    };
  }

  render() {
    return (
      !this.props.match.params.submissionId ? (
        <CoreForm
          kapp={bundle.kappSlug()}
          form={this.props.match.params.formSlug}
          completed={(response, action) => {
            action.stop();
            this.props.push(`/submission-details/${response.submission.id}`);
          }}
        />
      ) : (
        <CoreForm
          submission={this.props.match.params.submissionId}
          review={isReview(this.props)}
          completed={(response, action) => {
            action.stop();
            this.props.push(`/submission-details/${response.submission.id}`);
          }}
        />
      )
    );
  }
}
