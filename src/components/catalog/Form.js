import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';

export const Form = ({ form }) =>
  <div className={'form box'}>
    <h4>
      <Icon attributes={form.attributes} />
      <Link to={`/forms/${form.slug}`}>{form.name}</Link>
    </h4>
    <p>{form.description}</p>
  </div>;

