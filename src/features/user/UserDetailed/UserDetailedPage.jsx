import React, {Component} from 'react';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import differenceInYears from 'date-fns/difference_in_years';
import format from 'date-fns/format';

const query = ({auth}) => {
    return [
        {
            collection: 'users',
            doc: auth.uid,
            subcollections: [{collection: 'photos'}],
            storeAs: 'photos'
        }
    ]
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth,
        photos: state.firestore.ordered.photos
    }
}

class UserDetailedPage extends Component {
    render() {
        const {photos} = this.props;
        const {dateOfBirth, createdAt, photoURL, displayName, occupation, city, interests} = this.props.profile;
        let age = dateOfBirth ? differenceInYears(Date.now(), dateOfBirth.toDate()) : 'unknown age';
        let date = createdAt ? format(createdAt.toDate(), 'D MMM YYYY') : null;

        return (
            <Grid>
                <Grid.Column width={16}>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image avatar size='small' src={photoURL}/>
                                <Item.Content verticalAlign='bottom'>
                                    <Header as='h1'>{displayName}</Header>
                                    <br/>
                                    <Header as='h3'>{occupation}</Header>
                                    <br/>
                                    <Header as='h3'>{age}, Lives in {city}</Header>
                                </Item.Content>
                            </Item>
                        </Item.Group>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Column width={10}>
                                <Header icon='smile' content={`About ${displayName}`}/>
                                <p>I am : <strong>{occupation}</strong></p>
                                <p>Originally from <strong>{city}</strong></p>
                                <p>Member Since: <strong>{date}</strong></p>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Header icon='heart outline' content='Interests'/>
                                <List>
                                    {interests &&
                                        interests.map((interest, idx) => (
                                            <Item key={idx}>
                                                <Icon name={'heart'}/>
                                                <Item.Content>{interest}</Item.Content>
                                            </Item>
                                        ))
                                    }
                                </List>
                            </Grid.Column>
                        </Grid>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment>
                        <Button 
                          as={Link}
                          to="/settings/basic"
                          color='teal' 
                          fluid 
                          basic 
                          content='Edit Profile'/>
                    </Segment>
                </Grid.Column>

                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon='image' content='Photos'/>
                        
                        <Image.Group size='small'>
                            {photos &&
                                photos.map((photo, idx) => (
                                    <Image key={idx} src={photo.url}/>
                                ))}
                        </Image.Group>
                    </Segment>
                </Grid.Column>

                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon='calendar' content='Events'/>
                        <Menu secondary pointing>
                            <Menu.Item name='All Events' active/>
                            <Menu.Item name='Past Events'/>
                            <Menu.Item name='Future Events'/>
                            <Menu.Item name='Events Hosted'/>
                        </Menu>

                        <Card.Group itemsPerRow={5}>

                            <Card>
                                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                                <Card.Content>
                                    <Card.Header textAlign='center'>
                                        Event Title
                                    </Card.Header>
                                    <Card.Meta textAlign='center'>
                                        28th March 2018 at 10:00 PM
                                    </Card.Meta>
                                </Card.Content>
                            </Card>

                            <Card>
                                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                                <Card.Content>
                                    <Card.Header textAlign='center'>
                                        Event Title
                                    </Card.Header>
                                    <Card.Meta textAlign='center'>
                                        28th March 2018 at 10:00 PM
                                    </Card.Meta>
                                </Card.Content>
                            </Card>

                        </Card.Group>
                    </Segment>
                </Grid.Column>
            </Grid>

        );
    }
}

export default compose(
    connect(mapStateToProps), 
    firestoreConnect(auth => query(auth)),
)(UserDetailedPage);