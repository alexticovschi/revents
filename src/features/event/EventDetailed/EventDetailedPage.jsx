import React from "react";
import { connect } from 'react-redux';
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { Grid } from "semantic-ui-react";



const EventDetailedPage = ({event}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};

  // IF there's an eventId and there are events in the store,
  //   than get the event that matches the eventId and store it in the event object
  if(eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
    console.log(event);
  }

  return {
    event
  }
}

export default connect(mapStateToProps)(EventDetailedPage);
