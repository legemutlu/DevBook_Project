import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EventItem from './EventItem';
import { getEvents, getEventByCategory } from '../../actions/event';

const Events = ({
  getEvents,
  getEventByCategory,
  event: { events, getEventsByCategory },
}) => {
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  console.log('getEventsByCategory :' + getEventsByCategory);
  console.log('events :' + events);
  var getEventsByCategoryIDs = getEventsByCategory.map((item) => item._id);

  console.log('getEventsByCategoryIDs :' + getEventsByCategoryIDs);

  var [category] = useState('');

  const onChange = (e) => {
    category = e.target.value;
  };

  var eventCategories = [];

  for (const event of events) {
    if (eventCategories.indexOf(event.category) === -1) {
      eventCategories.push(event.category);
    }
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Events</h1>
      <p className='lead'> You can create or join event !</p>
      <Link to='/create-event'>
        <button className='btn btn-primary'>Create Event</button>
      </Link>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          console.log('submit category value ' + category);
          if (category === 'all' || category === '') {
            getEvents();
          } else {
            getEventByCategory(category);
          }
        }}
      >
        <div className='event-select-div'>
          <select
            className='event-select'
            name='sort'
            onChange={(e) => onChange(e)}
          >
            <option value='default'>All</option>
            {eventCategories.map((eventCategory) => (
              <option value={eventCategory} name={eventCategory}>
                {' '}
                {eventCategory.charAt(0).toUpperCase() + eventCategory.slice(1)}
              </option>
            ))}
          </select>{' '}
          <input type='submit' className='btn btn-primary' value='Submit' />
        </div>
      </form>
      <br />
      <Link to='/calendar'>
        <button className='btn btn-secondary'>View in Calendar</button>
      </Link>

      <div className='events'>
        {getEventsByCategory === undefined ||
        getEventsByCategory == 'default' ||
        getEventsByCategory == ''
          ? events.map((event) => (
              <EventItem key={event._id} event={event}></EventItem>
            ))
          : getEventsByCategory.map((event) => (
              <EventItem key={event._id} event={event}></EventItem>
            ))}
      </div>
    </Fragment>
  );
};

Events.propTypes = {
  getEvents: PropTypes.func.isRequired,
  getEventByCategory: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});

export default connect(mapStateToProps, { getEvents, getEventByCategory })(
  Events
);
