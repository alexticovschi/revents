import React, { Component, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import HomePage from '../../features/home/HomePage';
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import EventDetailedPage from "../../features/event/EventDetailed/EventDetailedPage";
import PeopleDashboard from "../../features/user/PeopleDashboard/PeopleDashboard";
import UserDetailed from "../../features/user/UserDetailed/UserDetailedPage";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import EventForm from "../../features/event/EventForm/EventForm";
import NavBar from "../../features/nav/NavBar/NavBar";
import ModalManager from '../../features/modals/ModalManager';
import TestComponent from '../../features/testarea/TestComponent';

class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager/>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>

        <Route path="/(.+)" render={() => (
          <Fragment>
            <NavBar />
            <Container className="main">
              <Switch>
                <Route path="/events" component={EventDashboard} />
                <Route path="/event/:id" component={EventDetailedPage} />
                <Route path="/people" component={PeopleDashboard} />
                <Route path="/profile/:id" component={UserDetailed} />
                <Route path="/manage/:id" component={EventForm} />
                <Route path="/settings" component={SettingsDashboard} />
                <Route path="/createEvent" component={EventForm} />
                <Route path="/test" component={TestComponent} />
              </Switch>
            </Container>
          </Fragment>
        )} />
      </Fragment>
    );
  }
}

export default App;
