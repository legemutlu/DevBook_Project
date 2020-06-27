import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import NotFound from './components/layout/NotFound';
import Dashboard from './components/dashboard/Dashboard';
import DashboardCompany from './components/dashboard/DashboardCompany';
import CreateProfile from './components/profile-forms/CreateProfile';
import CreateCompanyProfile from './components/profile-forms/CreateCompanyProfile';
import EditProfile from './components/profile-forms/EditProfile';
import EditCompanyProfile from './components/profile-forms/EditCompanyProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import CompanyProfiles from './components/profiles/CompanyProfiles';
import CompanyProfile from './components/profile/CompanyProfile';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import Jobs from './components/jobs/Jobs';
import Job from './components/job/Job';
import JobOffer from './components/jobs/JobOffer';
import UpdateJobOffer from './components/jobs/UpdateJobOffer';
import Events from './components/events/Events';
import Event from './components/event/Event';
import CreateEvent from './components/events/CreateEvent';
import UpdateEvent from './components/events/UpdateEvent';
import ReactCalendar from './components/events/ReactCalendar';
import Hashtags from './components/hashtags/Hashtags';
import PrivateRoute from './components/routing/PrivateRoute';

export const Container = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/dev-profiles' component={Profiles} />
        <Route exact path='/company-profiles' component={CompanyProfiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <Route exact path='/profile/company/:id' component={CompanyProfile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute
          exact
          path='/dashboard-company'
          component={DashboardCompany}
        />
        <PrivateRoute
          exact
          path='/create-company-profile'
          component={CreateCompanyProfile}
        />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute
          exact
          path='/edit-company-profile'
          component={EditCompanyProfile}
        />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <PrivateRoute exact path='/posts/hashtag/:hashtag' component={Posts} />
        <PrivateRoute exact path='/hashtags' component={Hashtags} />
        <PrivateRoute exact path='/jobs' component={Jobs} />
        <PrivateRoute exact path='/jobs/:id' component={Job} />
        <PrivateRoute exact path='/create-job' component={JobOffer} />
        <PrivateRoute
          exact
          path='/jobs/:id/update'
          component={UpdateJobOffer}
        />
        <PrivateRoute exact path='/calendar' component={ReactCalendar} />
        <PrivateRoute exact path='/events' component={Events} />
        <PrivateRoute exact path='/events/:id' component={Event} />
        <PrivateRoute exact path='/create-event' component={CreateEvent} />
        <PrivateRoute exact path='/events/:id/update' component={UpdateEvent} />
        <PrivateRoute exact path='/hashtags' component={Hashtags} />
        <Route component={NotFound}></Route>
      </Switch>
    </section>
  );
};
