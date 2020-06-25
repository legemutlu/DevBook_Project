import {
  GET_JOBS,
  GET_JOB,
  JOB_ERROR,
  UPDATE_VIEWS,
  DELETE_JOB,
  CREATE_JOB,
  UPDATE_JOB,
  ADD_APPLY,
  GET_APPLY,
  REMOVE_APPLY,
} from '../actions/types';

const initialState = {
  jobs: [],
  job: null,
  apply: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: payload.jobs,
        pageLength : payload.pageLength,
        currentPage : (payload.currentPage + 1),
        loading: false,
      };
    case GET_JOB:
      return {
        ...state,
        job: payload,
        loading: false,
      };
    case CREATE_JOB:
      return {
        ...state,
        jobs: [payload, ...state.jobs],
        loading: false,
      };
    case UPDATE_JOB:
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job._id === payload.id ? { ...job, id: payload.id } : job
        ),
        loading: false,
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== payload),
        loading: false,
      };

    case JOB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_VIEWS:
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job._id === payload.id ? { ...job, views: payload.views } : job
        ),
        loading: false,
      };
    case ADD_APPLY:
      return {
        ...state,
        job: { ...state.job, applies: payload },
        loading: false,
      };
    case GET_APPLY:
      return {
        ...state,
        apply: payload,
        loading: false,
      };
    case REMOVE_APPLY:
      return {
        ...state,
        job: {
          ...state.job,
          applies: state.job.applies.filter((apply) => apply._id !== payload),
        },
        loading: false,
      };
    default:
      return state;
  }
}
