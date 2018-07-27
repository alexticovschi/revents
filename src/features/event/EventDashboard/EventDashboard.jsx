import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from "cuid";
import { createEvent, updateEvent, deleteEvent } from "../eventActions";

class EventDashboard extends Component {
  state = {
    isOpen: false,
    selectedEvent: null
  };

  handleFormOpen = () => {
    this.setState({
      selectedEvent: null,
      isOpen: true
    });
  };

  handleCancel = () => {
    this.setState({ isOpen: false });
  };

  handleOpenEvent = eventToOpen => () => {
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    });
  };

  // handleCreateEvent = (newEvent) => {
  //   newEvent.id = cuid();
  //   newEvent.hostPhotoURL = 'assets/user.png';
  //   const updatedEvents = [...this.state.events, newEvent];
  //   this.setState({
  //     events: updatedEvents,
  //     isOpen: false
  //   });
  // }

  // handleUpdateEvent = (updatedEvent) => {
  //   this.setState({
  //     events: this.state.events.map(event => {
  //       // if the selected event id is equal to the updated event id ...
  //       // create a copy of the updated event and assigning it to the state
  //       // (not mutating the existing event in state),
  //       // else return the event
  //       return event.id === updatedEvent.id ? Object.assign({}, updatedEvent) : event
  //     }),
  //     isOpen: false,
  //     selectedEvent: null
  //   })
  // }

  // handleDeleteEvent = (eventId) => () => {
  //   // returns all the events that do not match the event id that is passed in(the selected event)
  //   const updatedEvents = this.state.events.filter(event => event.id !== eventId);
  //   this.setState({
  //     events: updatedEvents
  //   })
  // }

  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = 'assets/user.png';
    this.props.createEvent(newEvent);
    this.setState({
      isOpen: false
    });
  };

  handleUpdateEvent = updatedEvent => {
    this.props.updateEvent(updatedEvent);
    this.setState({
      isOpen: false,
      selectedEvent: null
    });
  };

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { selectedEvent } = this.state;
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            deleteEvent={this.handleDeleteEvent}
            onEventOpen={this.handleOpenEvent}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleFormOpen}
            positive
            content="Create Event"
          />
          {this.state.isOpen && (
            <EventForm
              updateEvent={this.handleUpdateEvent}
              selectedEvent={selectedEvent}
              createEvent={this.handleCreateEvent}
              handleCancel={this.handleCancel}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events
  };
};

const actions = {
  createEvent,
  updateEvent,
  deleteEvent
};

export default connect(
  mapStateToProps,
  actions
)(EventDashboard);
