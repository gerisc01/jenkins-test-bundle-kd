import React from 'react';

export const Icon = ({ attributes }) => {
  let icon = null;
  if (attributes) {
    const attribute = attributes.find(attr => attr.name === 'Icon');
    if (attribute) {
      icon = attribute.values.join(',');
    }
  }
  return icon
    ? <i className={`fa fa-fw ${icon}`} />
    : null;
};
