import React from 'react';

export const Counter = ({ counter, inc, dec, double }) =>
  <h2>
    <button type="button" className="decButton" onClick={dec}>-</button>
    Counter: {counter}
    <button type="button" className="incButton" onClick={inc}>+</button>
    <button type="button" className="dblButton" onClick={double}>* 2</button>
  </h2>;
