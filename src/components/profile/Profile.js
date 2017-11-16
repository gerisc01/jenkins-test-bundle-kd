import React from 'react';
import { Seq, Set } from 'immutable';

const INPUT_PROPS =
  Set(['name', 'onBlur', 'onChange', 'onDragStart', 'onDrop', 'onFocus', 'value']);

// Redux form passes in several props that are not valid for react 'input'
// elements. React has since started to print warnings about these props so the
// helper below is used to filter out props that react will complain about.
const filterProps = props =>
  Seq(props).filter((value, key) => INPUT_PROPS.contains(key)).toJS();

const Field = props =>
  <div>
    <input
      {...filterProps(props.controls)}
      type={props.type}
      value={props.controls.value || ''}
    />
  </div>;

export const Profile = props =>
  <form onSubmit={props.handleSubmit} noValidate>
    <div>
      <label htmlFor="username">Username</label>
      <Field type="text" id="username" controls={props.fields.username} />
    </div>
    <div>
      <label htmlFor="displayName">Display Name</label>
      <Field type="text" id="displayName" controls={props.fields.displayName} />
    </div>
    <div>
      <label htmlFor="email">Email</label>
      <Field type="email" id="email" controls={props.fields.email} />
    </div>
    <button type="submit">Submit</button>
  </form>;
