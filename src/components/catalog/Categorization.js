import React from 'react';
import { Form } from './Form';
import { activeForms } from './FormList';
import { Icon } from './Icon';

export const Categorization = ({ catalog, category, loaded }) =>
  loaded ? (
    <div className={'category box'}>
      <Icon attributes={category.attributes} />
      <span>{category.name}</span>
      {activeForms(catalog.forms).map(form =>
        category.categorizations.map(categorization =>
          categorization.form.slug === form.slug
            ? <Form form={form} /> : ''))}
    </div>
  ) : (
    <div className="component">Loading...</div>
  );
