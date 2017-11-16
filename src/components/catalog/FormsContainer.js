import { connect } from 'react-redux';
import { FormList } from './FormList';

const stateMapper = state => ({
  loaded: state.catalog.loaded,
  forms: state.catalog.forms || [],
});

export const FormsContainer = connect(stateMapper)(FormList);
