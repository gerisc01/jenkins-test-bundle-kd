import { connect } from 'react-redux';
import { Space } from './Space';

const stateMapper = (state, props) => ({
  loaded: state.spaces.loaded,
  space: state.spaces.loaded
    ? state.spaces.all
      .find(space => space['Space Slug'] === props.match.params.spaceSlug)
    : {},
});

export const SpaceContainer = connect(stateMapper)(Space);
