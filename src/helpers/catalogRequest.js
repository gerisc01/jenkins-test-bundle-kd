import axios from 'axios';
import { bundle } from 'react-kinetic-core';

const includes = [
  'attributes',
  'categories',
  'categories.attributes',
  'categories.categorizations',
  'forms',
  'forms.attributes',
  'formTypes',
];

const CATALOG_ENDPOINT = `${bundle.apiLocation()}/kapps/${bundle.kappSlug()}`;

export const fetchCatalog = () =>
  axios.get(`${CATALOG_ENDPOINT}?include=${includes.join(',')}`);
