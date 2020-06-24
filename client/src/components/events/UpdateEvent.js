import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateEvent, getEvent } from '../../actions/event';

const UpdateEvent = ({
  updateEvent,
  history,
  event: { event, loading },
  getEvent,
  auth,
  match,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ' ',
  });

  const { title, location, startDate, endDate, description } = formData;

  useEffect(() => {
    getEvent(match.params.id);
  }, [getEvent, match.params.id]);

  useEffect(() => {
    setFormData({
      title: loading || !event.title ? ' ' : event.title,
      location: loading || !event.location ? ' ' : event.location,
      startDate: loading || !event.startDate ? ' ' : event.startDate,
      endDate: loading || !event.endDate ? ' ' : event.endDate,
      description: loading || !event.description ? ' ' : event.description,
    });
  }, [loading]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEvent(event._id, formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Update Event</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            id='title'
            name='title'
            placeholder='title'
            value={title}
            onChange={(e) => onChange(e)}
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
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to={`/events/${match.params.id}`}>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

UpdateEvent.propTypes = {
  updateEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  event: state.event,
  auth: state.auth,
});

export default connect(mapStatetoProps, { updateEvent, getEvent })(
  withRouter(UpdateEvent)
);
