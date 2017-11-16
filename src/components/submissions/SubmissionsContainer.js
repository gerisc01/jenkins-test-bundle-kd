import { connect } from 'react-redux';
import { bundle } from 'react-kinetic-core';
import { actions } from '../../redux/modules/submissions';
import { loadable } from '../../helpers/loadable';
import { SubmissionList } from './SubmissionList';

export const stateMapper = state => ({
  loaded: state.submissions.loaded,
  submissions: state.submissions.all || [],
});

const loadableSubmissions = loadable(props =>
  props.fetchSubmissionsByKapp(bundle.kappSlug()))(SubmissionList);

export const SubmissionsContainer = connect(stateMapper, actions)(loadableSubmissions);
