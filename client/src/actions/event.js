import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_EVENTS,
  GET_EVENT,
  EVENT_ERROR,
  UPDATE_EVENT_VIEWS,
  DELETE_EVENT,
  CREATE_EVENT,
  UPDATE_EVENT,
  ADD_PARTICIPANT,
  GET_PARTICIPANTS,
  REMOVE_PARTICIPANT,
} from './types';

// GET EVENTS
export const getEvents = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/events');

    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// DELETE EVENT
export const deleteEvent = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/events/${id}`);

    dispatch({
      type: DELETE_EVENT,
      payload: id,
    });

    dispatch(setAlert('Event Removed', 'danger'));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// CREATE EVENT
export const createEvent = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/events', formData, config);

    dispatch({
      type: CREATE_EVENT,
      payload: res.data,
    });

    dispatch(setAlert('Event Created', 'success'));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// UPDATE EVENT
export const updateEvent = (id, formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('test');
  console.log(formData);
  const baseURL = 'http://localhost:3000/';
  try {
    const res = await axios.post(
      baseURL + `api/events/${id}/update`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_EVENT,
      payload: res.data,
    });

    dispatch(setAlert('Event Updated', 'success'));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// GET EVENT
export const getEvent = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/events/${id}`);

    dispatch({
      type: GET_EVENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// ADD VIEWS
export const addEventView = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/events/${id}/view`);

    dispatch({
      type: UPDATE_EVENT_VIEWS,
      payload: { id, views: res.data },
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// ADD PARTICIPANT
export const addParticipant = (eventId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/events/${eventId}/participant`);

    dispatch({
      type: ADD_PARTICIPANT,
      payload: res.data,
    });

    dispatch(setAlert('Will Participate', 'success'));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET PARTICIPANTS
export const getParticipants = (eventId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/events/${eventId}/participants`);

    dispatch({
      type: GET_PARTICIPANTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// DELETE PARTICIPANT

export const deleteParticipant = (eventId, participantId) => async (
  dispatch
) => {
  try {
    await axios.delete(`/api/events/${eventId}/participant/${participantId}`);

    dispatch({
      type: REMOVE_PARTICIPANT,
      payload: participantId,
    });

    dispatch(setAlert('Participation Removed', 'danger'));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
