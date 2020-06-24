import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import EventItem from '../events/EventItem';
import ParticipantItem from './ParticipantItem';
import Attend from './Attend';
import { getEvent } from '../../actions/event';

const Event = ({ auth, getEvent, event: { event, loading }, match }) => {
  useEffect(() => {
    getEvent(match.params.id);
  }, [getEvent, match.params.id]);

  return loading || event === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/events' className='btn'>
        Back To Events
      </Link>
      <EventItem event={event} showActions={false} />
      {!auth.loading &&
        !event.participants.find(
          (participant) => participant.user === auth.user._id
        ) && <Attend eventId={event._id} />}

      <div className='participant'>
        {!auth.loading && event.user === auth.user._id && <h1>Participants</h1>}
        {event.participants.map((participant) => (
          <ParticipantItem
            key={participant._id}
            participant={participant}
            eventId={event._id}
          />
        ))}
      </div>
    </Fragment>
  );
};

Event.propTypes = {
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
  auth: state.auth,
});

export default connect(mapStateToProps, { getEvent })(Event);
