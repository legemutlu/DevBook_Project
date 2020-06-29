import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/event';
import { useHistory } from 'react-router-dom';

const localizer = momentLocalizer(moment);
const myEventsList = [];

const ReactCalendar = ({ event: { events }, getEvents }) => {
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const history = useHistory();

  var allEvents = [];

  for (const event of events) {
    const startDate = new Date(event.startDate);
    var endDate = new Date(event.endDate);

    const object = {
      id: event._id,
      title: event.title,
      allDay: true,
      start: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      ),
      end: new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate()
      ),
    };
    allEvents.push(object);
  }

  const handleSlotSelection = (event) => {
    history.push('/events/' + event.id);
  };

  return (
    <div>
      <Calendar
        onSelectEvent={handleSlotSelection}
        localizer={localizer}
        events={allEvents}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
      />
    </div>
  );
};
ReactCalendar.propTypes = {
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});

export default connect(mapStateToProps, { getEvents })(ReactCalendar);
