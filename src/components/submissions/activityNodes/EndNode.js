import React from 'react';
import Moment from 'react-moment';

export const EndNode = ({ ts }) =>
  <li className={'text-center end'}>
    <div
      className={'finish'}
      data-toggle={'tooltip'}
      data-placement={'right'}
      title={ts}
    >
      Finished
      <div>
        <Moment fromNow>{ts}</Moment>
      </div>
    </div>
  </li>;
