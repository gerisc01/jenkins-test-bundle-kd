import React, { Component } from 'react';

export const loadable = (onEnter, onExit) => WrappedComponent =>
  class extends Component {
    componentDidMount() {
      if (typeof onEnter === 'function') {
        onEnter(this.props);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentWillUnmount() {
      if (typeof onExit === 'function') {
        onExit(this.props);
      }
    }
};
