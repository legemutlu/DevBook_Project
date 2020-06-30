import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addParticipant } from '../../actions/event';

const Attend = ({ auth, addParticipant, eventId, event: { event } }) => {
  return event.user !== auth.user._id ? (
    <Fragment>
      <button
        type='button'
        className='btn btn-primary'
        onClick={(e) => {
          e.preventDefault();
          addParticipant(eventId);
        }}
      >
        Attend To Event
      </button>
    </Fragment>
  ) : (
    <Fragment></Fragment>
  );
};

Attend.propTypes = {
  addParticipant: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  event: state.event,
});

export default connect(mapStateToProps, { addParticipant })(Attend);
