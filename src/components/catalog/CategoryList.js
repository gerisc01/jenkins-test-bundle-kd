import React from 'react';
import { Category } from './Category';

const hidden = category => {
  const hiddenCategory = category.attributes.find(attribute =>
    attribute.name === 'Hidden' && attribute.values.join(',').length > 0);
  return hiddenCategory;
};

const visibleCategories = categories =>
  categories.filter(category => !hidden(category));

export const CategoryList = ({ categories, loaded, match }) =>
  loaded ? (
    match.isExact &&
    <div>
      <h3>Categories</h3>
      <div className="categoryList">
        {visibleCategories(categories).map(category =>
          <Category key={category.slug} category={category} />)}
      </div>
    </div>
  ) : (
    <div className="component">Loading...</div>
  );
