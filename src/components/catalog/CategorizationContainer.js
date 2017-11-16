import { connect } from 'react-redux';
import { Categorization } from './Categorization';

const stateMapper = (state, props) => ({
  loaded: state.catalog.loaded,
  catalog: state.catalog,
  category: state.catalog.loaded
    ? state.catalog.categories
      .find(category => category.slug === props.match.params.categorySlug)
    : {},
});

export const CategorizationContainer = connect(stateMapper)(Categorization);
