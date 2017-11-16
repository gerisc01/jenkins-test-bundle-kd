import { connect } from 'react-redux';
import { actions } from '../../redux/modules/catalog';
import { Catalog } from './Catalog';
import { loadable } from '../../helpers/loadable';

export const stateMapper = state => ({
  catalog: state.catalog,
});

const loadableCatalog = loadable(props => props.fetchCatalog())(Catalog);

export const CatalogContainer = connect(stateMapper, actions)(loadableCatalog);
