import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import cuid from 'cuid';

const events = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Julie',
    hostPhotoURL: 'https://randomuser.me/api/portraits/women/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/women/15.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/women/23.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
];


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

  render() {
    const {selectedEvent} = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
            <EventList onEventOpen={this.handleOpenEvent} events={this.state.events}/>
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