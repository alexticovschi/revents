import React, { Component } from "react";
import { Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';


class EventForm extends Component {
  state = {
    event: Object.assign({}, this.props.event)
  }

  // // invoked immediately after a component is mounted (inserted into the tree)
  // componentDidMount() {
  //   const {selectedEvent} = this.props;
  //   if(selectedEvent !== null) {
  //     this.setState({
  //       event: selectedEvent
  //     })
  //   }
  // }

  // // invoked immediately after updating occurs.
  // componentDidUpdate = (prevProps) => {
  //   const {selectedEvent} = this.props;
  //   if (selectedEvent !== prevProps.selectedEvent) {
  //     this.setState({
  //       event: selectedEvent || this.props.event
  //     })
  //   }
  // };

  onFormSubmit = (event) => {
    event.preventDefault();
    if(this.state.event.id) {
      this.props.updateEvent(this.state.event);
    } else {
      this.props.createEvent(this.state.event);
    }
  }

  onInputChange = (event) => {
    const newEvent = this.state.event;
    newEvent[event.target.name] = event.target.value;
    this.setState({ 
      event: newEvent
    })
  }

  render() {
    const {handleCancel} = this.props;
    const {event} = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input name="title" onChange={this.onInputChange} value={event.title} placeholder="First Name" />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input name="date" onChange={this.onInputChange} value={event.date} type="date" placeholder="Event Date" />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input name="city" onChange={this.onInputChange} value={event.city} placeholder="City event is taking place" />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input name="venue" onChange={this.onInputChange} value={event.venue} placeholder="Enter the Venue of the event" />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input name="hostedBy" onChange={this.onInputChange} value={event.hostedBy} placeholder="Enter the name of person hosting" />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={handleCancel} type="button">Cancel</Button>
        </Form>
      </Segment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  }

  if(eventId && state.events.length > 0) {
    event = state.events.filter(event => eventId === event.id)[0];
  }

  return { event }
}

export default connect(mapStateToProps)(EventForm);
