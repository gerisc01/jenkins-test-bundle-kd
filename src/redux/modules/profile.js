import { fetchProfile, putProfile } from '../../helpers/profileRequest';

export const types = {
  FETCH_PROFILE: 'FETCH_PROFILE',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
};

export const actions = {
  fetchProfile: () => ({
    type: types.FETCH_PROFILE,
    payload: fetchProfile(),
  }),
  updateProfile: profile => ({
    type: types.UPDATE_PROFILE,
    payload: putProfile(profile),
  }),
};

export const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_PROFILE:
      return action.payload.data;
    case types.UPDATE_PROFILE:
      return action.payload.data.user;
    default: return state;
  }
};

export default reducer;
