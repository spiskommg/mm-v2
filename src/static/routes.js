import React from 'react';
import { Route, Switch } from 'react-router';
import { CSSTransitionGroup } from 'react-transition-group'

import { HomeView, LoginView, ProtectedView, NotFoundView, PostsView, MemberProgram, AdminView } from './containers';
import requireAuthentication from './utils/requireAuthentication';
import './styles/main.scss';

export default(
  <Route render={({ location }) => (
    <CSSTransitionGroup
     transitionName="example"
     transitionEnterTimeout={500}
     transitionLeaveTimeout={300}>
     <Switch key={location.key} location={location}>
         <Route exact path="/" component={HomeView} />
         <Route path="/login" component={LoginView} />
         <Route path="/protected" component={requireAuthentication(ProtectedView)} />
         <Route path="/admin" component={requireAuthentication(AdminView)} />
         <Route path="/member-program" component={MemberProgram} />
         <Route path="*" component={PostsView} />
     </Switch>
    </CSSTransitionGroup>
  )}
  />


);
