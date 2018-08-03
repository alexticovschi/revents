import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { incrementAsync, decrementAsync } from './testActions';
import { openModal } from '../modals/modalActions';

class TestComponent extends Component {
  state = {
    address: '',
    scriptLoaded: false
  }

  handleScriptLoad = () => {
    this.setState({scriptLoaded: true});
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  onChange = (address) => this.setState({address});


  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
    const {incrementAsync, decrementAsync, data, openModal, loading} = this.props;

    return (
      <div>
        <Script 
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyDfyiymG6qCLhbUeYTHJLdt527JFvGc5dU&libraries=places'
          onLoad={this.handleScriptLoad}
        />
        <h1>Test Component</h1>
        <h3>The answer is: {data}</h3>
        <Button loading={loading} onClick={incrementAsync} color='green' content='INCREMENT'/>
        <Button loading={loading} onClick={decrementAsync} color='red' content='DECREMENT'/>
        <Button onClick={() => openModal('TestModal', {data: 'Kobe Bryant'})} color='red' content='Open Modal'/>

        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded && 
          <PlacesAutocomplete inputProps={inputProps} />}
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        data: state.test.data,
        loading: state.test.loading
    }
}

const actions = {
    incrementAsync,
    decrementAsync,
    openModal
}

export default connect(mapStateToProps, actions)(TestComponent);