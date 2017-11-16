import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';

export const Category = ({ category }) =>
  <div className={'category box'}>
    <Icon attributes={category.attributes} />
    <Link to={`/categories/${category.slug}`}>{category.name}</Link>
  </div>;

