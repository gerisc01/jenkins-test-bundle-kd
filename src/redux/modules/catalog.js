import { fetchCatalog } from '../../helpers/catalogRequest';

export const types = {
  FETCH_CATALOG: '@kd/kinops-support/FETCH_CATALOG',
};

export const actions = {
  fetchCatalog: () => ({
    type: types.FETCH_CATALOG,
    payload: fetchCatalog(),
  }),
};

export const defaultState = {
  attributes: [],
  categories: [],
  forms: [],
  formTypes: [],
  name: null,
  slug: null,
  currentTemplate: null,
  loaded: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_CATALOG: {
      const currentTemplateAttribute = action.payload.data.kapp.attributes
        .find(attribute => attribute.name === 'Current Space Template Slug');

      const currentTemplateSlug = currentTemplateAttribute
        ? currentTemplateAttribute.values[0]
        : null;

      return {
        ...state,
        attributes: action.payload.data.kapp.attributes,
        categories: action.payload.data.kapp.categories,
        forms: action.payload.data.kapp.forms,
        formTypes: action.payload.data.kapp.formTypes,
        name: action.payload.data.kapp.name,
        slug: action.payload.data.kapp.slug,
        loaded: true,
        currentTemplate: currentTemplateSlug,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
