import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EventItem from './EventItem';
import { getEvents } from '../../actions/event';

const Events = ({ getEvents, event: { events } }) => {
  useEffect(() => {
    getEvents();
  }, [getEvents]);
  var eventCategories = [];

  for (const event of events) {
    eventCategories.push(event.category);
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Events</h1>
      <p className='lead'> You can create or join event !</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('ege');
        }}
      >
        <span className='category'>Choose a category:</span>{' '}
        <select id='cars' name='cars'>
          {eventCategories.map((category) => (
            <option value={category}> {category}</option>
          ))}
        </select>{' '}
        <input type='submit' className='btn btn-success' value='Filter' />
      </form>
      <br />
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
