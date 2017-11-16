import { connect } from 'react-redux';
import { actions } from '../../redux/modules/spaces';
import { SpaceList } from './SpaceList';
import { loadable } from '../../helpers/loadable';

export const stateMapper = state => ({
  loaded: state.spaces.loaded,
  spaces: state.spaces.all,
  currentTemplate: state.catalog.currentTemplate,
});

const loadableSpaces = loadable(props => props.fetchSpaces())(SpaceList);

export const SpacesContainer = connect(stateMapper, actions)(loadableSpaces);
