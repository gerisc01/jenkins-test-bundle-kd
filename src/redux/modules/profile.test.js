jest.mock('../../helpers/profileRequest');

// eslint-disable-next-line import/first
import reducer, { actions, defaultState, types } from './profile';

// Used to mimic what happens when redux-promise processes the action.
const resolvePromiseToPayload = action =>
  // eslint-disable-next-line no-param-reassign
  action.payload.then(profile => { action.payload = { data: profile }; });

describe('profile redux module', () => {
  describe('action creators', () => {
    test('fetchProfile action', () => {
      const action = actions.fetchProfile();
      expect(action.payload).toBeInstanceOf(Promise);
      expect(action.type).toBe(types.FETCH_PROFILE);
    });

    test('putProfile action', () => {
      const action = actions.updateProfile({ test: 'test' });
      expect(action.payload).toBeInstanceOf(Promise);
      expect(action.type).toBe(types.UPDATE_PROFILE);
    });
  });

  describe('reducers', () => {
    test('initializes with default state', () => {
      expect(reducer(undefined, {})).toBe(defaultState);
    });

    test('FETCH_PROFILE populates the profile', () => {
      const action = actions.fetchProfile();
      expect.assertions(2);
      resolvePromiseToPayload(action);
      return action.payload.then(() => {
        expect(action.payload.data.displayName).toBeDefined();
        expect(reducer(defaultState, action)).toBe(action.payload.data);
      });
    });

    test('UPDATE_PROFILE populates the profile', () => {
      const result = { displayName: 'test' };
      const action = actions.updateProfile(result);
      expect.assertions(2);
      resolvePromiseToPayload(action);
      return action.payload.then(() => {
        expect(action.payload.data.user.displayName).toBeDefined();
        expect(reducer(defaultState, action)).toBe(action.payload.data.user);
      });
    });
  });
});
