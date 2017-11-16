import { fetchSpaces } from '../../helpers/spaceRequest';
import { convertMultipleBridgeRecords } from '../../lib/BridgedResource';

export const types = {
  FETCH_SPACES: '@kd/kinops-support/FETCH_SPACES',
};

export const actions = {
  fetchSpaces: () => ({
    type: types.FETCH_SPACES,
    payload: fetchSpaces(),
  }),
};

export const defaultState = {
  all: [],
  size: 0,
  nextPageToken: null,
  loaded: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_SPACES:
      return {
        ...state,
        all: convertMultipleBridgeRecords(action.payload.records),
        size: action.payload.records.metadata.size,
        nextPageToken: action.payload.records.metadata.nextPageToken,
        loaded: true,
      };
    default: return state;
  }
};

export default reducer;
