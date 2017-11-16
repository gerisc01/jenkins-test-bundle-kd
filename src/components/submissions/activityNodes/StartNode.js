import React from 'react';
import Moment from 'react-moment';

export const StartNode = ({ label, ts }) =>
  <li className={'text-center'}>
    <div
      className={'start'}
      data-toggle={'tooltip'}
      data-placement={'right'}
      title={ts}
    >
      {label}
      <div>
        <Moment fromNow>{ts}</Moment>
      </div>
    </div>
  </li>;
