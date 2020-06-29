import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { updateEvent, deleteEvent, addEventView } from '../../actions/event';

const EventItem = ({
  auth,
  event: {
    _id,
    name,
    title,
    location,
    category,
    description,
    startDate,
    endDate,
    user,
    views,
    participants,
  },
  deleteEvent,
  addEventView,
  showActions,
}) => {
  var eventDate = new Date(endDate);

  return (
    <div>
      <div className='event bg-white p-1 my-1'>
        <div>
          {auth.isCompany ? (
            <Link to={`/profile/company/${user}`}>
              <h4>{name}</h4>
            </Link>
          ) : (
            <Link to={`/profile/${user}`}>
              <h4>{name}</h4>
            </Link>
          )}
        </div>
        <div>
          <p className='my-1'>{title}</p>
          {!showActions && (
            <Fragment>
              <p className='my-1'>{description}</p>
              <p className='my-1'>{location}</p>
              <p className='my-1'>
                Start Date:
                {<Moment format='DD/MM/YYYY h:mm:ss'>{startDate}</Moment>}
              </p>
              <p className='my-1'>
                End Date:
                {<Moment format='DD/MM/YYYY h:mm:ss'>{endDate}</Moment>}
              </p>
            </Fragment>
          )}
          <p className='event-date'> Category : {category}</p>
          <p className='event-date'>
            Event Views: {views.length >= 0 && <span>{views.length}</span>}
          </p>
          <p className='event-date'>
            Event Participants:{' '}
            {participants.length >= 0 && <span>{participants.length}</span>}
          </p>
          {showActions && (
            <Fragment>
              <Link
                to={`/events/${_id}`}
                className='btn btn-primary'
                onClick={(e) => addEventView(_id)}
              >
                View Event
              </Link>
            </Fragment>
          )}
          {!auth.loading && user === auth.user._id && (
            <Fragment>
              <button
                type='button'
                onClick={(e) => deleteEvent(_id)}
                className='btn btn-danger'
              >
                Delete Event
                <i className='fas fa-times'></i>
              </button>
              {!showActions && (
                <Link
                  className='btn btn-light my-1'
                  to={`/events/${_id}/update`}
                >
                  Update Event
                </Link>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

EventItem.defaultProps = {
  showActions: true,
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  addEventView: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  deleteEvent,
  addEventView,
})(EventItem);
