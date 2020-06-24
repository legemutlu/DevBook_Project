import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import React from 'react';

const localizer = momentLocalizer(moment);
const myEventsList = [];

const ReactCalendar = () => (
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor='start'
      endAccessor='end'
      style={{ height: 500 }}
    />
  </div>
);

export default ReactCalendar;
