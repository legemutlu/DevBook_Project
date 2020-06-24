import React, { Fragment, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EventItem from './EventItem';
import { getEvents } from '../../actions/event';
import moment from 'moment';

const Events = ({ getEvents, event: { events } }) => {
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const localizer = momentLocalizer(moment);

  return (
    <Fragment>
      <h1 className='large text-primary'>Events</h1>
      <p className='lead'> You can create or join event !</p>

      <Link to='/create-event'>
        <button className='btn btn-primary'>Create Event</button>
      </Link>
      <div className='events'>
        {events.map((event) => (
          <EventItem key={event._id} event={event} />
        ))}
      </div>
    </Fragment>
  );
};

Events.propTypes = {
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});

export default connect(mapStateToProps, { getEvents })(Events);
