import React, { useState } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createEvent } from '../../actions/event';

const CreateEvent = ({ createEvent }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ' ',
  });

  const { title, location, startDate, endDate, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {

    console.log("submit?")
    e.preventDefault();

    const currentDate = Date.now()

    var startDate = new Date(formData.startDate);
    var endDate = new Date(formData.endDate);
    const startDateEpoch = startDate.getTime();
    const endDateEpoch = endDate.getTime();

    console.log(startDateEpoch)
    console.log(endDateEpoch)
    console.log(currentDate)

    if (currentDate > startDateEpoch) {
      alert("You can't select a date in past.")
    }

    if (endDateEpoch <= startDateEpoch) 
    {
      alert("End date must be after than start date.")
    }

    createEvent(formData);
  };

  return (
    <Fragment>
      <div>
        <h1 className='large text-primary'>Create Event</h1>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              id='title'
              name='title'
              placeholder='title'
              value={title}
              onChange={(e) => onChange(e)}
              required
            ></input>
          </div>
          <div className='form-control'>
            <input
              type='text'
              id='location'
              name='location'
              placeholder='location'
              value={location}
              onChange={(e) => onChange(e)}
              required
            ></input>
          </div>
          <div className='form-group'>
            <input
              type='datetime-local'
              name='startDate'
              id='startDate'
              placeholder='startDate'
              value={startDate}
              onChange={(e) => onChange(e)}
            ></input>
          </div>
          <div className='form-group'>
            <input
              type='datetime-local'
              name='endDate'
              id='endDate'
              placeholder='endDate'
              value={endDate}
              onChange={(e) => onChange(e)}
            ></input>
          </div>
          <div className='form-group'>
            <textarea
              name='description'
              cols='30'
              rows='5'
              placeholder='Description'
              value={description}
              onChange={(e) => onChange(e)}
              required
            ></textarea>
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/events'>
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

CreateEvent.propTypes = {
  createEvent: PropTypes.func.isRequired,
};

export default connect(null, { createEvent })(CreateEvent);
