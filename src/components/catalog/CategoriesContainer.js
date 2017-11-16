import { connect } from 'react-redux';
import { CategoryList } from './CategoryList';

const stateMapper = state => ({
  loaded: state.catalog.loaded,
  categories: state.catalog.categories || [],
});

export const CategoriesContainer = connect(stateMapper)(CategoryList);
