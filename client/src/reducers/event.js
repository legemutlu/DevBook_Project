import {
  GET_EVENTS,
  GET_EVENT,
  EVENT_ERROR,
  UPDATE_EVENT_VIEWS,
  DELETE_EVENT,
  CREATE_EVENT,
  UPDATE_EVENT,
  ADD_PARTICIPANT,
  REMOVE_PARTICIPANT,
  GET_EVENTS_BY_CATEGORY,
} from '../actions/types';

const initialState = {
  events: [],
  getEventsByCategory: [],
  event: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false,
      };
    case GET_EVENTS_BY_CATEGORY:
      return {
        ...state,
        getEventsByCategory: payload,
        loading: false,
      };
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        loading: false,
      };
    case CREATE_EVENT:
      return {
        ...state,
        events: [payload, ...state.events],
        loading: false,
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === payload.id ? { ...event, id: payload.id } : event
        ),
        loading: false,
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event._id !== payload),
        loading: false,
      };

    case EVENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_EVENT_VIEWS:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === payload.id ? { ...event, views: payload.views } : event
        ),
        loading: false,
      };
    case ADD_PARTICIPANT:
      return {
        ...state,
        event: { ...state.event, participants: payload },
        loading: false,
      };
    case REMOVE_PARTICIPANT:
      return {
        ...state,
        event: {
          ...state.event,
          participants: state.event.participants.filter(
            (participant) => participant._id !== payload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
}
