import React from 'react';
import { Form } from './Form';

export const activeForms = forms => forms.filter(form =>
  (form.status === 'Active' || form.status === 'New'));

export const FormList = ({ forms, loaded, match }) =>
  loaded ? (
    match.isExact &&
    <div>
      <h3>Forms</h3>
      <div className="formList">
        {activeForms(forms).map(form => <Form key={form.slug} form={form} />)}
      </div>
    </div>
  ) : (
    <div className="component">Loading...</div>
  );
