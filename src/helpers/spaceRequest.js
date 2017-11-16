import { datastoreSpacesBR } from '../helpers/bridgedResourcesRequest';

export const fetchSpaces = () =>
  fetch(datastoreSpacesBR())
    .then(response => response.json());
