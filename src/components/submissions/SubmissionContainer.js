import { connect } from 'react-redux';
import { actions } from '../../redux/modules/submissions';
import { loadable } from '../../helpers/loadable';
import { Submission } from './Submission';

export const stateMapper = state => ({
  submission: state.submissions.submission,
});

const loadableSubmission = loadable(props =>
  props.fetchSubmissionById(props.match.params.submissionId))(Submission);

export const SubmissionContainer = connect(stateMapper, actions)(loadableSubmission);
