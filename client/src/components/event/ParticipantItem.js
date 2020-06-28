import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteParticipant } from '../../actions/event';

const ParticipantItem = ({
  eventId,
  event: { event },
  participant: { _id, name, user, date, avatar },
  auth,
  deleteParticipant,
}) => {
  return (
    <Fragment>
      {!auth.loading && user === auth.user._id && (
        <Fragment>
          <h1>Your Attend</h1>
          <div className='event bg-white p-1 my-1'>
            <div>
              {!auth.isCompany ? (
                <Link to={`/profile/${user}`}>
                  <img className='round-img my-1' src={avatar} alt='' />
                  <h4>{name}</h4>
                </Link>
              ) : (
                <Link to={`/profile/company/${user}`}>
                  <img className='round-img my-1' src={avatar} alt='' />
                  <h4>{name}</h4>
                </Link>
              )}
            </div>
            <div>
              <p className='event-date'>
                Attend on <Moment format='DD/MM/YYYY'>{date}</Moment>
              </p>
              <button
                onClick={() => deleteParticipant(eventId, _id)}
                type='button'
                className='btn btn-danger'
              >
                <i className='fas fa-times' />
              </button>
            </div>
          </div>
        </Fragment>
      )}
      {!auth.loading && event.user === auth.user._id && (
        <Fragment>
          <div className='event bg-white p-1 my-1'>
            <div>
              <Link to={`/profile/${user}`}>
                <img className='round-img my-1' src={avatar} alt='' />
                <h4>{name}</h4>
              </Link>
            </div>
            <div>
              <p className='event-date'>
                Attend on <Moment format='DD/MM/YYYY'>{date}</Moment>
              </p>
              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={() => deleteParticipant(eventId, _id)}
                  type='button'
                  className='btn btn-danger'
                >
                  <i className='fas fa-times' />
                </button>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ParticipantItem.propTypes = {
  eventId: PropTypes.object.isRequired,
  participant: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  deleteParticipant: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  event: state.event,
});

export default connect(mapStateToProps, { deleteParticipant })(ParticipantItem);
