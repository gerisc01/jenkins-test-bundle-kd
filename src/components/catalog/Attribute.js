import React from 'react';

export const Attribute = ({ attribute }) =>
  <div className={'attribute box'}>
    {attribute.name}: {attribute.values.join(', ')}
  </div>;
