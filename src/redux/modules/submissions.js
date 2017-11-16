import { fetchSubmissionById, fetchSubmissionsByKapp } from '../../helpers/submissionRequest';

export const types = {
  FETCH_SUBMISSION_BY_ID: '@kd/kinops-support/FETCH_SUBMISSION_BY_ID',
  FETCH_SUBMISSIONS_BY_KAPP: '@kd/kinops-support/FETCH_SUBMISSIONS_BY_KAPP',
};

export const actions = {
  fetchSubmissionById: submissionId => ({
    type: types.FETCH_SUBMISSION_BY_ID,
    payload: fetchSubmissionById(submissionId),
  }),
  fetchSubmissionsByKapp: kappSlug => ({
    type: types.FETCH_SUBMISSIONS_BY_KAPP,
    payload: fetchSubmissionsByKapp(kappSlug),
  }),
};

export const defaultState = {
  submission: null,
  all: [],
  size: 0,
  nextPageToken: null,
  loaded: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case types.FETCH_SUBMISSION_BY_ID:
      return {
        ...state,
        submission: action.payload.data.submission,
        loaded: true,
      };
    case types.FETCH_SUBMISSIONS_BY_KAPP:
      return {
        ...state,
        submission: null,
        all: action.payload.data.submissions,
        size: action.payload.data.submissions.length,
        nextPageToken: action.payload.data.nextPageToken,
        loaded: true,
      };
    default: return state;
  }
};

export default reducer;
