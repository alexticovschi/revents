import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { incrementCounter, decrementCounter } from './testActions';

class TestComponent extends Component {
  render() {
      const {incrementCounter, decrementCounter, data} = this.props;
    return (
      <div>
        <h1>Test Component</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} color='green' content='INCREMENT'/>
        <Button onClick={decrementCounter} color='red' content='DECREMENT'/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        data: state.test.data
    }
}

const actions = {
    incrementCounter,
    decrementCounter
}

export default connect(mapStateToProps, actions)(TestComponent);