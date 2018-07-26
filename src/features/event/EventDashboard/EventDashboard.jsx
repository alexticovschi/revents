import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import cuid from 'cuid';


class EventDashboard extends Component {
  state = {
    events: events,
    isOpen: false,
    selectedEvent: null
  }

  handleFormOpen = () => {
    this.setState({ 
      selectedEvent: null,
      isOpen: true 
    });
  }

  handleCancel = () => {
    this.setState({ isOpen: false });
  }

  handleUpdateEvent = (updatedEvent) => {
    this.setState({
      events: this.state.events.map(event => {
        // if the selected event id is equal to the updated event id ...
        // create a copy of the updated event and assigning it to the state 
        // (not mutating the existing event in state),
        // else return the event
        return event.id === updatedEvent.id ? Object.assign({}, updatedEvent) : event
      }),
      isOpen: false,
      selectedEvent: null
    })
  }

  handleOpenEvent = (eventToOpen) => () => {
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    });
  }

  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = 'assets/user.png';
    const updatedEvents = [...this.state.events, newEvent];
    this.setState({ 
      events: updatedEvents,
      isOpen: false
    });
  }

  handleDeleteEvent = (eventId) => () => {
    // returns all the events that do not match the event id that is passed in(the selected event)
    const updatedEvents = this.state.events.filter(event => event.id !== eventId);
    this.setState({
      events: updatedEvents
    })
  }

  render() {
    const {selectedEvent} = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
            <EventList 
              deleteEvent={this.handleDeleteEvent} 
              onEventOpen={this.handleOpenEvent} 
              events={this.state.events}/>
        </Grid.Column>
        <Grid.Column width={6}>
            <Button onClick={this.handleFormOpen} positive content='Create Event'/>
            {this.state.isOpen && (
              <EventForm 
                updateEvent={this.handleUpdateEvent}
                selectedEvent={selectedEvent}
                createEvent={this.handleCreateEvent}
                handleCancel={this.handleCancel}/>
            )}
        </Grid.Column>
      </Grid>
    )
  }
}

export default EventDashboard;